let score=JSON.parse(localStorage.getItem('score'))//getting score
if (score===null) {
  score={
    wins:0,
    loss:0,
    ties:0
  }
}



// adding event listener options
document.querySelector('.rock-button')
.addEventListener('click',()=>
  playGame('Rock')
)
document.querySelector('.paper-button')
.addEventListener('click',()=>
  playGame('Paper')
)
document.querySelector('.scissor-button')
.addEventListener('click',()=>
  playGame('Scissor')
)

// playing with keyboard
document.body.addEventListener('keydown',(event)=>{
  if (event.key==='r') {
    playGame('Rock')
  }
  else  if (event.key==='p') {
    playGame('Paper')
  }
  else  if (event.key==='s') {
    playGame('Scissor')
  }
})
// making reset button
function resetScore(){
  score.wins=0
  score.loss=0
  score.ties=0
  localStorage.removeItem('score')
  updateScore()
}

document.querySelector('.reset-score')
.addEventListener('click',()=>
  resetScore()
)


// making autoplay button
let isAutoPlaying=false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying) {
    intervalId=setInterval(()=>{
      const playerMove=getcomputerMoves()
      playGame(playerMove)
    },1000)
    isAutoPlaying=true;
  }
  else{
    clearInterval(intervalId)
    isAutoPlaying=false
  }
}

document.querySelector('.game-autoplay')
.addEventListener('click',()=>
 autoPlay()
)
let result=''


// console.log(document.querySelector('.game-result')
// .innerHTML=`${result}`);

function getcomputerMoves(){
  let computerMoves='';
  const randomNumber=Math.random();
  // console.log(randomNumber);
  if (randomNumber>0 && randomNumber<1/3) {
    computerMoves='Rock' 
  } 
  else if (randomNumber>1/3 && randomNumber<2/3) {
    computerMoves='Paper' 
  } 
  else if (randomNumber>2/3 && randomNumber<1) {
    computerMoves='Scissor'
  }
  return computerMoves;
}
// computerMoves()

function playGame(playerMove){
     const computerMoves=getcomputerMoves();
     if (playerMove==='Rock') {
      if (computerMoves==='Rock') {
        result='Tie'
      }
      else if (computerMoves==='Paper') {
        result='Loss'
      }
      else if (computerMoves==='Scissor') {
        result='Win'
      }
     }

     else if (playerMove==='Paper') {
      if (computerMoves==='Rock') {
        result='Win'
      }
      else if (computerMoves==='Paper') {
        result='Tie'
      }
      else if (computerMoves==='Scissor') {
        result='Loss'
      }
     }

     else if (playerMove==='Scissor') {
      if (computerMoves==='Rock') {
        result='Loss'
      }
      else if (computerMoves==='Paper') {
        result='Win'
      }
      else if (computerMoves==='Scissor') {
        result='Tie'
      }
     }

     if (result==='Win') {
      score.wins+=1
      result='Huraay!You Won'
     }
     else  if (result==='Loss') {
      score.loss+=1
      result='Better luck next Time'
     }
     else  if (result==='Tie') {
      score.ties+=1
      result="It's a Draw"
     }


    // alert(`You picked ${playerMove},computer picked ${computerMoves},result ${result}`)
    //  console.log(`You picked ${playerMove},computer picked ${computerMoves},result ${result}`);
     localStorage.setItem('score',JSON.stringify(score))//setting score


     document.querySelector('.game-result')
     .innerHTML=result;

     document.querySelector('.game-moves')
     .innerHTML=`You choose:${playerMove}&emsp;&emsp;&emsp;    ${computerMoves}:Computer choose`

     updateScore()
    
}


// for updating score after every moves
function updateScore(){
  document.querySelector('.game-score')
  .innerHTML=`Wins=${score.wins},Loss:${score.loss},Ties:${score.ties}`
}
