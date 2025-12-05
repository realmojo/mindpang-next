// export const boardWidth =
//   window.innerWidth - 20 > 500 ? 500 : window.innerWidth - 20;
export const totalSpan = 24;

export let timer = 20;

export const getRandomAnswerNumber = (max) => {
  max = max * max - 1;
  return Math.floor(Math.random() * (max - 0 + 1));
};
export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max - 0 + 1));
};

export const easyColor = [
  {
    normalColor: "#55efc4",
    answerColor: "#00b894",
  },
  {
    normalColor: "#81ecec",
    answerColor: "#00cec9",
  },
  {
    normalColor: "#74b9ff",
    answerColor: "#0984e3",
  },
  {
    normalColor: "#a29bfe",
    answerColor: "#6c5ce7",
  },
  {
    normalColor: "#dfe6e9",
    answerColor: "#b2bec3",
  },
  {
    normalColor: "#ffeaa7",
    answerColor: "#fdcb6e",
  },
  {
    normalColor: "#fab1a0",
    answerColor: "#e17055",
  },
  {
    normalColor: "#ff7675",
    answerColor: "#d63031",
  },
  {
    normalColor: "#fd79a8",
    answerColor: "#e84393",
  },
  {
    normalColor: "#636e72",
    answerColor: "#2d3436",
  },
];
export const mediumColor = [
  {
    normalColor: "#55efc4",
    answerColor: "#31e8b5",
  },
  {
    normalColor: "#81ecec",
    answerColor: "#39dfdb",
  },
  {
    normalColor: "#74b9ff",
    answerColor: "#349cee",
  },
  {
    normalColor: "#a29bfe",
    answerColor: "#877ff3",
  },
  {
    normalColor: "#dfe6e9",
    answerColor: "#bcc5c9",
  },
  {
    normalColor: "#ffeaa7",
    answerColor: "#ffe8be",
  },
  {
    normalColor: "#fab1a0",
    answerColor: "#f1957f",
  },
  {
    normalColor: "#ff7675",
    answerColor: "#f86464",
  },
  {
    normalColor: "#fd79a8",
    answerColor: "#f56196",
  },
  {
    normalColor: "#636e72",
    answerColor: "#515b5e",
  },
];
export const hardColor = [
  {
    normalColor: "#55efc4",
    answerColor: "#46e4b8",
  },
  {
    normalColor: "#81ecec",
    answerColor: "#65e7e7",
  },
  {
    normalColor: "#74b9ff",
    answerColor: "#5fa8f1",
  },
  {
    normalColor: "#a29bfe",
    answerColor: "#938cf3",
  },
  {
    normalColor: "#dfe6e9",
    answerColor: "#ced9de",
  },
  {
    normalColor: "#ffeaa7",
    answerColor: "#fceab0",
  },
  {
    normalColor: "#fab1a0",
    answerColor: "#f1a492",
  },
  {
    normalColor: "#ff7675",
    answerColor: "#f76867",
  },
  {
    normalColor: "#fd79a8",
    answerColor: "#f86498",
  },
  {
    normalColor: "#636e72",
    answerColor: "#586164",
  },
];
export const crazyColor = [
  {
    normalColor: "#55efc4",
    answerColor: "#58ecc3",
  },
  {
    normalColor: "#81ecec",
    answerColor: "#78e5e5",
  },
  {
    normalColor: "#74b9ff",
    answerColor: "#6eb3f8",
  },
  {
    normalColor: "#a29bfe",
    answerColor: "#a99af5",
  },
  {
    normalColor: "#dfe6e9",
    answerColor: "#d7e0e4",
  },
  {
    normalColor: "#ffeaa7",
    answerColor: "#f9e6a9",
  },
  {
    normalColor: "#fab1a0",
    answerColor: "#f7ae9d",
  },
  {
    normalColor: "#ff7675",
    answerColor: "#f77978",
  },
  {
    normalColor: "#fd79a8",
    answerColor: "#f776a3",
  },
  {
    normalColor: "#636e72",
    answerColor: "#647074",
  },
];

let easyStage = [];
for (let i = 0; i < 15; i++) {
  let tileNumber = 2;
  if (i >= 0 && i < 3) {
    tileNumber = 2;
  } else if (i >= 3 && i < 15) {
    tileNumber = 3;
  }
  easyStage.push({
    name: "easy",
    level: i + 1,
    tileNumber,
    answerKey: getRandomAnswerNumber(tileNumber),
  });
}

let mediumStage = [];
for (let i = 15; i < 30; i++) {
  let tileNumber = 3;
  if (i >= 15 && i < 20) {
    tileNumber = 3;
  } else if (i >= 20 && i < 30) {
    tileNumber = 4;
  }
  mediumStage.push({
    name: "medium",
    level: i + 1,
    tileNumber,
    answerKey: getRandomAnswerNumber(tileNumber),
  });
}

let hardStage = [];
for (let i = 30; i < 45; i++) {
  let tileNumber = 6;
  if (i >= 30 && i < 40) {
    tileNumber = 6;
  } else if (i >= 40 && i < 45) {
    tileNumber = 8;
  }
  hardStage.push({
    name: "hard",
    level: i + 1,
    tileNumber,
    answerKey: getRandomAnswerNumber(tileNumber),
  });
}

let crazyStage = [];
for (let i = 45; i < 60; i++) {
  let tileNumber = 8;

  crazyStage.push({
    name: "crazy",
    level: i + 1,
    tileNumber,
    answerKey: getRandomAnswerNumber(tileNumber),
  });
}

// tileNumber: 2, 3, 4, 6, 8, 12
export const stages = easyStage
  .concat(mediumStage)
  .concat(hardStage)
  .concat(crazyStage);
