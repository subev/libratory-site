// Narrates the two-language demo: English with the app's Kokoro script, German with Cartesia as the
// app calls it, then lays the sentences out in each order the demo plays them. Needs a libratory
// checkout with its Python env set up and CARTESIA_API_KEY in its .env (or in the environment):
//
//   LIBRATORY_DIR=~/repos/libratory node scripts/narrate-two-languages.mjs
//
import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { TEXT } from "../src/components/twoLanguagesText.ts";

const run = promisify(execFile);

const REPO = process.env.LIBRATORY_DIR ?? join(homedir(), "repos/libratory");
const EN_VOICE = "af_heart";
// Sebastian, Cartesia's German "Orator"
const DE_VOICE = "b7187e84-fe22-4344-ba4a-bc013fcb533e";
const CARTESIA_RATE = 44_100;
const RATE = 24_000;
const PAUSE_MS = 700;
const CUES = "src/components/twoLanguagesCues.ts";

const ORDER = {
  en: [["en", 0], ["en", 1], ["en", 2]],
  de: [["de", 0], ["de", 1], ["de", 2]],
  alternate: [["en", 0], ["de", 0], ["en", 1], ["de", 1], ["en", 2], ["de", 2]],
};

const env = { ...process.env, HF_HUB_OFFLINE: "1" };
const words = (lang) => TEXT[lang].map((line) => line.split(" ").map((token) => token.split("|")[0]));
const DISPLAY = { en: words("en"), de: words("de") };
const SENTENCES = { en: DISPLAY.en.map((w) => w.join(" ")), de: DISPLAY.de.map((w) => w.join(" ")) };

const work = await mkdtemp(join(tmpdir(), "libratory-two-languages-"));

async function pcm(input, format = []) {
  const { stdout } = await run("ffmpeg", ["-loglevel", "error", ...format, "-i", input, "-f", "s16le", "-ac", "1", "-ar", String(RATE), "-"], {
    encoding: "buffer",
    maxBuffer: 1 << 28,
  });
  return stdout;
}

const ms = (bytes) => (bytes / 2 / RATE) * 1000;
const chunkWav = (dir, i) => join(dir, `chunk-${String(i + 1).padStart(3, "0")}.wav`);

/** Kokoro times every word itself; a sentence may come back in more than one chunk. */
async function english() {
  const input = join(work, "en.txt");
  const chunks = join(work, "en");
  // One sentence per line, so every chunk Kokoro emits belongs to exactly one of them
  await writeFile(input, SENTENCES.en.join("\n"));
  await run(join(REPO, ".venv/bin/python"), [
    join(REPO, "scripts/synthesize.py"),
    "--input", input, "--output", join(work, "en.wav"), "--voice", EN_VOICE, "--chunks-dir", chunks,
  ], { env });

  const manifest = JSON.parse(await readFile(join(chunks, "chunks.json"), "utf8"));
  const out = SENTENCES.en.map(() => ({ audio: [], starts: [], texts: [] }));
  let sentence = 0;
  let consumed = "";
  let offset = 0;

  for (const [i, chunk] of manifest.entries()) {
    consumed = `${consumed} ${chunk.text}`.trim();
    const tokens = JSON.parse(await readFile(join(chunks, `chunk-${String(i + 1).padStart(3, "0")}.words.json`), "utf8"));
    const into = out[sentence];
    let word = null;
    for (const token of tokens) {
      word ??= { text: "", a: token.startMs + offset };
      word.text += token.text;
      // Whitespace after a token is where one display word ends and the next begins
      if (/\s/.test(token.after)) {
        into.texts.push(word.text);
        into.starts.push(word.a);
        word = null;
      } else {
        word.text += token.after;
      }
    }
    if (word) {
      into.texts.push(word.text);
      into.starts.push(word.a);
    }
    const audio = await pcm(chunkWav(chunks, i));
    into.audio.push(audio);
    offset += ms(audio.length);
    if (consumed === SENTENCES.en[sentence]) {
      sentence += 1;
      consumed = "";
      offset = 0;
    }
  }

  return out.map(({ audio, starts, texts }, i) => {
    if (texts.join(" ") !== SENTENCES.en[i]) throw new Error(`English sentence ${i} came back as ${JSON.stringify(texts.join(" "))}`);
    return { audio: Buffer.concat(audio), starts };
  });
}

async function cartesiaKey() {
  if (process.env.CARTESIA_API_KEY) return process.env.CARTESIA_API_KEY;
  const line = (await readFile(join(REPO, ".env"), "utf8")).split("\n").find((l) => l.startsWith("CARTESIA_API_KEY="));
  const key = line?.slice("CARTESIA_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  if (!key) throw new Error(`no CARTESIA_API_KEY in the environment or ${join(REPO, ".env")}`);
  return key;
}

const letters = (word) => word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** The same request the app makes (packages/server/src/lib/cartesia.ts), word timings included. */
async function german() {
  const key = await cartesiaKey();
  return Promise.all(SENTENCES.de.map(async (transcript, i) => {
    const res = await fetch("https://api.cartesia.ai/tts/sse", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Cartesia-Version": "2026-08-14", "Content-Type": "application/json" },
      body: JSON.stringify({
        model_id: "sonic-3.6",
        transcript,
        voice: { id: DE_VOICE },
        language: "de",
        output_format: { container: "raw", encoding: "pcm_s16le", sample_rate: CARTESIA_RATE },
        add_timestamps: true,
      }),
    });
    if (!res.ok) throw new Error(`Cartesia ${res.status}: ${(await res.text()).slice(0, 300)}`);

    const chunks = [];
    const spoken = { words: [], start: [] };
    for (const event of (await res.text()).split("\n\n")) {
      const line = event.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      const data = JSON.parse(line.slice(6));
      if (data.type === "error") throw new Error(`Cartesia: ${String(data.error).slice(0, 300)}`);
      if (data.type === "chunk" && data.data) chunks.push(Buffer.from(data.data, "base64"));
      if (data.type === "timestamps" && data.word_timestamps) {
        spoken.words.push(...data.word_timestamps.words);
        spoken.start.push(...data.word_timestamps.start);
      }
    }

    const shown = DISPLAY.de[i];
    if (spoken.words.map(letters).join(" ") !== shown.map(letters).join(" ")) {
      throw new Error(`German sentence ${i} came back as ${JSON.stringify(spoken.words.join(" "))}`);
    }
    const raw = join(work, `de-${i}.raw`);
    await writeFile(raw, Buffer.concat(chunks));
    const audio = await pcm(raw, ["-f", "s16le", "-ar", String(CARTESIA_RATE), "-ac", "1"]);
    return { audio, starts: spoken.start.map((s) => s * 1000) };
  }));
}

const voiced = { en: await english(), de: await german() };
const silence = Buffer.alloc(Math.round((PAUSE_MS / 1000) * RATE) * 2);
const clips = {};

for (const [name, order] of Object.entries(ORDER)) {
  const parts = [];
  const steps = [];
  let offset = 0;
  for (const [side, sentence] of order) {
    const { audio, starts } = voiced[side][sentence];
    starts.forEach((start, word) => steps.push([side, sentence, word, Math.round(offset + start)]));
    parts.push(audio, silence);
    offset += ms(audio.length) + PAUSE_MS;
  }
  const raw = join(work, `${name}.raw`);
  const audio = `public/audio/two-languages-${name}.m4a`;
  await writeFile(raw, Buffer.concat(parts));
  await run("ffmpeg", [
    "-y", "-loglevel", "error", "-f", "s16le", "-ar", String(RATE), "-ac", "1", "-i", raw,
    "-c:a", "aac", "-b:a", "48k", "-movflags", "+faststart", audio,
  ]);
  clips[name] = { src: `/${audio.replace(/^public\//, "")}`, period: Math.round(offset), steps };
  console.log(`${name}: ${steps.length} words · ${(offset / 1000).toFixed(1)}s → ${audio}`);
}

const quote = (s) => JSON.stringify(s);
await writeFile(CUES, `// Generated by scripts/narrate-two-languages.mjs — do not edit by hand.
import type { Lang } from "./twoLanguagesText.ts";

export type Step = [side: Lang, sentence: number, word: number, atMs: number];
export type Clip = { src: string; period: number; steps: Step[] };

export const CLIPS = {
${Object.entries(clips).map(([name, clip]) => `  ${name}: {
    src: ${quote(clip.src)},
    period: ${clip.period},
    steps: [
${clip.steps.map(([side, s, w, at]) => `      [${quote(side)}, ${s}, ${w}, ${at}]`).join(",\n")},
    ],
  },`).join("\n")}
} satisfies Record<string, Clip>;
`);

console.log(`→ ${CUES}`);
