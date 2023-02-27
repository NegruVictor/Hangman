const letters = document.getElementById('letters');
const btn = document.getElementById('btn');
const error = document.getElementById('error');
const picture = document.getElementById('picture');
const id = document.getElementById('id');
const onReset = () => {
  location.reload();
}
let word;
let mistakes;
document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() { 
  btn.addEventListener('click', onReset);
  picture.querySelectorAll('[id]').forEach(x => x.style.display = "none");
}
function enter() {
  word = document.getElementById("enter_word").value;
  document.getElementById("enter_word").value = '';
  drawWord(word);
  mistakes = 6;
  document.addEventListener('keyup', onKeyup);
} 
function drawWord(word) {
  let letter;
  letters.innerHTML = '';
  word.split('').forEach((l, i) => {
    letter = document.createElement('span');
    if (i == 0 || i == word.length - 1)
      letter.textContent = l;
    else
      letter.k = l;
      letters.appendChild(letter);
  });
}
function getEmptySlots() {
  return Array.from(letters.querySelectorAll('span')).filter(l => l.textContent == "");
}
function onKeyup(e) {
  if (e.keyCode < 65 || e.keyCode > 90) return;
  let letter = e.key;
  let empty = getEmptySlots();
  let guessed = 0;
  empty.forEach(l => {
    if (l.k == letter) {
      l.textContent = letter;
      delete l.k;
      ++guessed;
    }
  });
  if (guessed == 0) {
    error.textContent = `${error.textContent} ${letter} |`;
    drawCharacter(mistakes);
    --mistakes;
  }
  if (getEmptySlots().length == 0) {
    document.getElementById("display").innerHTML = "Congratulations! You won";
  }else if (mistakes == 0) {
    document.getElementById("display").innerHTML = "Game Over";
    alert('Game Over');
  }
}
function drawCharacter(mistakes) {
  let id = `id`+(mistakes);
  picture.getElementById(id).style.display = "inherit";
}
