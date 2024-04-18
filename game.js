const playerOption = "✕";
const botOption = "O";
const boxes = Array.from({ length: 9 });

let botPoint = 0;
let playerPoint = 0;

const resetBtn = document.getElementById("resetBtnId")

let winId = [] 
let fullBoxes = []   
let playerCards = []  
let botCards = []

document.querySelector(".game-board").addEventListener("mousedown", (e) => {
  const element = e.target; 

  if (!fullBoxes.includes(+element.id)) { 
    if (fullBoxes.length <= 9) { 

      element.textContent = playerOption;
      boxes[element.id] = playerOption;
      fullBoxes.push(+element.id)
      playerCards.push(+element.id)

      const emptyBoxes = boxes
        .map((box, index) => (box ? null : index))
        .filter((box) => box !== null);
      const botRandomNumber = Math.floor(Math.random() * emptyBoxes.length); 

      const botIndex = emptyBoxes[botRandomNumber]; 
      if (fullBoxes.length <= 8) {
        boxes[botIndex] = botOption; 
        document.getElementById(botIndex).textContent = botOption; 
        fullBoxes.push(botIndex)
        botCards.push(botIndex)

      }

      findWinner()
    }
  } else if (fullBoxes.length >= 9) { 
    reset() 
    document.getElementById("resultText").textContent = "Butun xanalar doludur.Oyun yeniden basladi"
  } else { 
    document.getElementById("resultText").textContent = "Bu xana doludur"
  }

});

function artanSiraYaradan(test) {
  var artanSira = test.sort((a, b) => a - b);
  return artanSira;
}

function ucEdedlikKombin(dizi) {
  var kombin = [];
  for (var i = 0; i < dizi.length - 2; i++) {
    for (var j = i + 1; j < dizi.length - 1; j++) {
      for (var k = j + 1; k < dizi.length; k++) {
        kombin.push([dizi[i], dizi[j], dizi[k]]);
      }
    }
  }
  return kombin;
}




function yoxlama(options) {

  const combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let resultArr = ucEdedlikKombin(artanSiraYaradan(options)) 

  for (i = 0; i < combination.length; i++) {
    for (j = 0; j < resultArr.length; j++) {
      if (resultArr[j].toString() === combination[i].toString()) {

        winId = resultArr[j] 

        return true

      }
    }
  }

  return false
}



function findWinner() {
  const resultPlayer = yoxlama(playerCards)
  const resultBot = yoxlama(botCards)

  if (resultPlayer) { 
    document.getElementById("resultText").textContent = "Siz qalib geldiniz"
    playerPoint++ 
    background() 
    reset() 
    document.getElementById("playerPoints").innerText = "Player Score:   " + playerPoint // player xalini yazir
  } else if (resultBot) {
    document.getElementById("resultText").textContent = "Bot qalib geldi"
    botPoint++
    background()
    reset()
    document.getElementById("botPoints").innerText = "Bot Score:   " + botPoint
  } else {
    document.getElementById("resultText").textContent = "Oyun davam edir"
  }
}



function reset() { 
  setTimeout(function () { 
    fullBoxes = [];
    playerCards = [];
    botCards = [];
    boxes.fill(null);
    for (let i = 0; i <= 8; i++) {
      document.getElementById(i).textContent = ""; 
    }
    winId.forEach(item => {
      document.getElementById(item).classList.remove("winBack") 
    })
    winId = []
  }, 1000);
}

resetBtn.addEventListener('click', () => { 
  document.getElementById("resultText").textContent = "Oyun yeniden basladi"
  reset()
})

function background() { 
  winId.forEach(item => {
    document.getElementById(item).classList.add("winBack")
  })
}