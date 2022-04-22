const addPlayerBtn = document.getElementById("submit");
const player = document.getElementById("player-name");
const playersList = document.getElementById("players-list");
const teamNumber = document.getElementById("team-number");
const separateBtn = document.getElementById("separate-team");
const showBtn = document.getElementById("show-teams");

const teamContainer = document.getElementById("team-container");
const teamContent = document.getElementById("team");

const template = document.getElementById("new-player");

const teams = new Map();
let players = [];

addPlayerBtn.addEventListener("click", () => {
   if(player.value && player.value.length <= 10) {
      // console.log(player.value);
      // console.log(template);
      // const newPlayer = template.replace("{player}", player.value);
      const clone = template.content.cloneNode(true);
      const div = clone.querySelectorAll("div")[0];
      const playerName = div.children[0];
      const deleteButton = div.children[1];
      playerName.innerText = player.value;
      deleteButton.addEventListener('click', () => {
         playersList.removeChild(div);
      })
      playersList.append(div);
      player.value = "";
   } else if(!player.value) {
      alert('プレイヤー名を入れてくだざい');
   } else {
      alert('10文字以内のプレイヤー名にしてください');
      player.value = '';
   }
});

separateBtn.addEventListener('click', () => {
   teams.clear();
   players = [];
   const playersElement = playersList.children;
   if(playersElement.length >= 2) {
      for(const player of playersElement) {
         // console.log(player);
         const playerName = player.querySelector(".player").innerText;
         // console.log(playerName);
         players.push(playerName);
      }
      shuffle(players);
      separateToTeam(players, Number(teamNumber.value));
      console.table(teams);
      displayButton();
      createElement();
   }
})

function shuffle(array) {
   let currentIndex = array.length, randomIndex;

   // While there remain elements to shuffle.
  while (currentIndex != 0) {

   // Pick a remaining element.
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;

   // And swap it with the current element.
   [array[currentIndex], array[randomIndex]] = [
     array[randomIndex], array[currentIndex]];
   }

   return array;
}

function separateToTeam(players, teamNumber) {
   let teamNum = 1;
   for(const player of players) {
      if(!teams.has(teamNum)) {
         teams.set(teamNum, [player]);
      } else {
         teams.set(teamNum, [...teams.get(teamNum), player]);
      }
      teamNum === teamNumber ? teamNum = 1 : teamNum++;
   }
}

function displayButton() {
   showBtn.classList.remove("hide");
}

function createElement() {
   teamContent.innerHTML = '';
   for(let [key, value] of teams.entries()) {
      const div = document.createElement('div');
      div.className = 'team-box';
      const h2 = document.createElement('h2');
      h2.innerText = `team ${key}`;
      h2.classList.add("team-header");
      const div2 = document.createElement('div');
      div2.className = 'grid-box team-list';
      for(const name of value) {
         const p = document.createElement('p');
         p.innerText = name;
         div2.append(p);
      }
      div.append(h2);
      div.append(div2);
      teamContent.append(div);
   } 
}

showBtn.addEventListener('click', () => {
   teamContainer.classList.remove("hide");
   showBtn.classList.add("hide");
   const closeBtn = document.createElement('button');
   closeBtn.innerText = '閉じる';
   closeBtn.className = 'btn btn-red b3 pop-up-close-btn';
   closeBtn.addEventListener('click', () => {
      closeBtn.remove();
      teamContainer.classList.add("hide");
      showBtn.classList.remove("hide");
   })
   teamContent.append(closeBtn);
})