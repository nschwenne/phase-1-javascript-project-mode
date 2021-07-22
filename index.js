// these 2 functions just make the inputed data a style that the api can easliy read. 
  function lowerCase(inputData) {
  return inputData.toLowerCase();
}
function addDash(inputData) {
  return inputData.split(" ").join('-')
}
//For when the submit button is clicked, 
document.querySelector("form").addEventListener("submit", createSearchedMonsterLi)

// bring up data, puts specified data into results. 
function createSearchedMonsterLi() {
event.preventDefault();
let name = creatureName.value
const firstEdit = lowerCase(name);
const secondEdit = addDash(firstEdit)
  fetch(`https://api.open5e.com/monsters/${secondEdit}/`)
.then(resp => resp.json())
  .then((creature) => {
    if (secondEdit === creature.slug) {
    let li = document.createElement('li');
    let creatureOutput = [
    "Name: " + creature.name + " |" + 
    "Type: " + creature.type + " |" +  
    "Size: " + creature.size + " |" + 
    "Alignment: " + creature.alignment + " |" +
    "Challenge Rating: " + creature.challenge_rating
  ]
    li.innerText = creatureOutput;
  document.getElementById('creatureList').appendChild(li);
  li.setAttribute("id", creature.name)
  let removeButton = document.createElement("button");
  removeButton.setAttribute("id", `${creature.name}removeButton`)
removeButton.innerText = "X";
li.append(removeButton);
document.getElementById(`${creature.name}removeButton`).addEventListener('click', function() {
 document.getElementById(`${creature.name}`).remove()

})
//If creature doesnt exits, this runs. 
} else {
  window.alert("Creature does not exist, please try again")

} 
}) 
document.getElementById("creatureForm").reset();
}

// this just creates a list when the click for creature list button is clicked
document.getElementById("allMonstersButton").addEventListener('click', function() {
  return showAllMonsters();
});
/*Deletes the list of all creatures, then creates a new unordered list so the list of all 
creatures can be recreated */
document.getElementById("deleteMonsterListButton").addEventListener('click', function() {
  document.getElementById("allAvailableMonsters").remove();
  let ul = document.createElement('ul');
  document.getElementById('allMonsterList').appendChild(ul)
  ul.setAttribute("id", "allAvailableMonsters")
  count = 0
});
//shows alert when "click for creature List is clicked"

// The below function shows a list of all available creatures. 
 function showAllMonsters(){
   if(count === 0) {
    window.alert("Please wait while content loads!");
  fetch("https://api.open5e.com/monsters?limit=1086")
  .then(resp => resp.json())
      .then((monsterData) => {
        monsterData.results.forEach(p => {
            let li = document.createElement('li');
            li.innerText = p.slug
            document.getElementById('allAvailableMonsters').appendChild(li);
        })
       })
       // if list is already available, this runs. 
      } else {
        window.alert("List already available")
      }
    } 
    // this is ti keep track of the creature list, when its clicked  you cannont load the content untul the delete button is clicked. 
  let count = 0;
   let buttonCount = document.getElementById("allMonstersButton");
   buttonCount.onclick = function () {
     count++
     console.log(count)
   }
   
  
   
    
/*fetch("https://api.open5e.com/monsters?limit=1086")
  .then(resp => resp.json())
  .then(json => console.log(json)); */

