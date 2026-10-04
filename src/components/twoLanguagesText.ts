export type Lang = "en" | "de";

// `word|group`: words sharing a group are equivalents, the links the desktop app makes between them
export const TEXT: Record<Lang, string[]> = {
  en: [
    "It was on a dreary|dreary night|night of|night November|night that I|i1 beheld|beheld the accomplishment|acc of my|my toils.|toils",
    "With an anxiety|anx that almost|almost amounted to agony,|agony I|i2 collected|coll the instruments|instr of life|life around|around me,|around that I might infuse|infuse a spark|spark of being|being into the lifeless|lifeless thing|thing that lay|lay at my feet.|feet",
    "It was already one|one in the morning;|morning the rain|rain pattered|patter dismally|dismal against the panes,|panes and my|my2 candle|candle was nearly|nearly burnt|burnt out.|burnt",
  ],
  de: [
    "Es war in einer trüben|dreary Novembernacht,|night als ich|i1 die Vollendung|acc meiner|my Mühen|toils erblickte.|beheld",
    "Mit einer Angst,|anx die fast|almost an Qual|agony grenzte, sammelte|coll ich|i2 die Werkzeuge|instr des Lebens|life um|around mich,|around um dem leblosen|lifeless Ding,|thing das zu meinen Füßen|feet lag,|lay einen Funken|spark des Daseins|being einzuflößen.|infuse",
    "Es war schon ein Uhr|one morgens;|morning der Regen|rain prasselte|patter trostlos|dismal gegen die Scheiben,|panes und meine|my2 Kerze|candle war fast|nearly heruntergebrannt.|burnt",
  ],
};
