
const prompt = require('readline-sync');

//Hand arrays
let userHand = [];

//battlefield
let battlefieldComp = [];
let battlefieldUser = [];
//graveyard
let graveyard = [];

let userWins = 0;
let compWins = 0;//counter
let compAP;
let userAP;
let iComp = 0;

// display game rules
console.log('     Welcome to the Battle Arena! \n Rules: \n 1. Each player draws 3 cards \n 2. You can play one card per turn \n 3. First to win 3 duels wins the game. \n 4. You can only have one card in play at a time.');


// ask user to start game
const startGame = prompt.question(
    'Press Enter to Start'
  );

//making two decks
let userDeck = new Array(10);
let compDeck = new Array(10);

//filling compDeck
for(let i = 0; i < compDeck.length; i++)
{
  compDeck[i] = generateCard();
}

//filling userDeck
for(let i = 0; i < userDeck.length; i++)
{
  userDeck[i] = generateCard();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * 9)+ 1;
}

//generate randomized cards
function generateCard(){
  let name1 = ["Lunar", "Astral", "Great", "Hallowed", "Glowing", "Boreal", "Shivering", "Iron", "Steel", "Bahamut", "Hawkeye", "Flaming", "Shocking", "Freezing", "Static", "Brutal", "Merciless", "Drunk"];

  let name2 = ["King", "Knight", "Master", "Demon", "Dragon", "Zombie", "Warrior", "Angel", "Hunter", "Mage", "Rogue", "Savage", "Beast", "Soldier", "Gaurdian", "Lizardman", "Maiden", "Archer", "Lancer", "Valkyrie"];


  let name = '[' + name1[getRandomInt(0, name1.length)] + ' ' + name2[getRandomInt(0, name2.length)] + ' AP: ' + getRandomInt(1, 10) + ']';
  return name;

}

console.log('You drew three cards: ' + userDeck[0] +" "+ userDeck[1] +" " +userDeck[2]);
userHand.push(userDeck[0], userDeck[1], userDeck[2]);
let i = 3;
drawPhase();

function drawPhase()
{
    
    console.log('Entering Draw Phase')
    let draw = prompt.question(
       'Would you like to draw a card? y/n'
    ); 
    if(draw === 'y')
    {

      userHand.push(userDeck[i]);
      console.log('The card you drew is: ' + userDeck[i]);
      i++;
    }
mainPhase();
}

function mainPhase()
{ 
  if(battlefieldUser === undefined)//checking if element in index(card in field)
  {

    console.log("You currently have " + battlefieldUser + " on the battlefield.");
    let returnCard = prompt.question('Would you like to return him to your hand? y/n\n');
    if (returnCard === 'y')
    {
      console.log('Which card from your hand do you want to replace it with?');
      let index = prompt.questionInt('Enter 0-4 to play: ' + userHand + '\n');
      let temp = userHand.splice(index, 1);                 
      battlefieldUser.push(temp);
      console.log('You sent '+ battlefieldUser + ' to the battlefield!')
    }
    
  }else{
        console.log("Your battlefield is empty. Play a card from your hand.")
        console.log('Which card from your hand do you want to duel with?');
      let playCard = prompt.question('Enter 0-4 to play: ' + userHand + '\n');       
      let tempHand = userHand.splice(playCard, 1);  
        battlefieldUser.push(tempHand);
        console.log('You sent '+ battlefieldUser + ' to the battlefield!')

       }
  let endmainPhase = prompt.question('Would you like enter the battle phase? y/n\n');
  if(endmainPhase === 'y'){
  let userStr = battlefieldUser[0];
  userStr = userStr[0].split('');//user
  let userAPstr = userStr.find(element => element > 0);
  userAP = parseInt(userAPstr);
     console.log('***Entering Battlephase...***');battlePhase()}else{endofUserTurn()}
}
 
//battle phase function 
function battlePhase(){
  
  if(battlefieldUser === undefined){

  let startDuel = prompt.question('Would you like challenge your opponent to a duel? y/n\n');
  if(startDuel === 'y')
  {
    
    if(userAP > compAP ){
        userWins++;
        let temp = battlefieldComp.splice(0, 1);
        graveyard.push(temp);    
        console.log("You won the duel!!")
    }else if(userAP < compAp){
        compWins++;
        let temp = battlefieldUser.splice(0, 1);  
        graveyard.push(temp);         
        console.log("You lost the duel!!")
    }else{
    let temp1 = battlefieldUser.splice(0, 1); 
    let temp2 = battlefieldUser.splice(0, 1);
    graveyard.push(temp1); 
    graveyard.push(temp2);         
    console.log("The duel was a tie!! No points given.");
    }
  }else{
    endofUserTurn();
  }
  endofUserTurn();
}else{
  console.log('Your opponent has no cards on the battlefield.')
  endofUserTurn();
}
}

//end turn phase function
function endofUserTurn(){
  if(userWins === 3){
    console.log('GAME OVER! You win!!');
    }else if(compWins === 3){
      console.log('GAME OVER! You lose!!');
    }else{
      console.log('Your turn is now over.')
      console.log('The Current Score is: User ' + userWins + ' Opponent '+ compWins);
      battlefieldUser.length = 0;      
      compTurn();
    }
  }

function endofCompTurn(){
  if(userWins === 3){
    console.log('GAME OVER! You win!!');
    }else if(compWins === 3){
      console.log('GAME OVER! You lose!!');
    }else{
      console.log('Opponent ends his turn.')
      console.log('The Current Score is: User ' + userWins + ' Opponent '+ compWins);
      drawPhase();
    }

}

function compTurn(){
  console.log('Opponents Turn.');
  console.log("Oppenent draws a card..");
  console.log("Oppenent entering mainphase...");
  compMainPhase();
 }

function compMainPhase()
{
  if(battlefieldComp === undefined)//checking if element in index(card in field)
  {
    console.log("The opponent currently has " + battlefieldComp + " on the battlefield.");
  }else{
      battlefieldComp[iComp] = compDeck[iComp];
      console.log('**** Entering Battlephase ****');
      console.log('The opponent sent '+ battlefieldComp[iComp] + ' to the battlefield!')
      
      }
  console.log('Your opponent has challanged you to a duel!');
  let compStr;
  compStr = compDeck[iComp].split('');//comp   
  let compAPstr = compStr.find(element => element > 0);//comp
  compAP = parseInt(compAPstr);
  if(userAP > compAP ){
    userWins++;
    let temp = battlefieldComp.splice(0, 1);
    graveyard.push(temp);                       
    console.log("You won the duel !");
    }else if(userAP < compAP){
    compWins++;
    let temp = battlefieldUser.splice(0, 1);       
    graveyard.push(temp); 
    console.log("You lost the duel!");
}else {
    let temp1 = battlefieldUser.splice(0, 1); 
    let temp2 = battlefieldComp.splice(0, 1);
    graveyard.push(temp1);
    graveyard.push(temp2);
    console.log("The duel was a tie! No points given.");
}
battlefieldComp.length = 0;
iComp++;
console.log('Opponents turn is over.')
endofCompTurn();
}
