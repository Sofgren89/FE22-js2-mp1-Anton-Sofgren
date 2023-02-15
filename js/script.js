
let lowestScore = ''
let lowestScoreValue = 0;
let alreadyInTheHighScoreList = false;
//Url firebase
const highscoreUrl = 'https://mini-projekt-js2-default-rtdb.europe-west1.firebasedatabase.app/Highscore'
const highscoreDOM = document.querySelector(".highscoreListContainer")
let highObject = {};
let playerName = "";

//Hämtar listan från databasen
async function getHighscore() {
    const response = await fetch(highscoreUrl + ".json");
    const data = await response.json();
    console.log(data);

    const highscoreArr = Object.entries(data)
    const sortedHighscores = highscoreArr.sort(
        (a, b) => b[1].score - a[1].score
    );
   



    // Få den lägsta scoren 
    lowestScore = sortedHighscores[sortedHighscores.length - 1][0].toString();
    lowestScoreValue = Object.values(sortedHighscores[sortedHighscores.length - 1][1])[1];
    
    const finalObj = sortedHighscores.map((sortedHighscore) => sortedHighscore[1]);
   

    const highscoreList = document.createElement('ol');
    highscoreDOM.append(highscoreList);

//Sorterar listan

    finalObj.slice(0, 5).forEach(({ name, score }) => {
        const nameAndScore = document.createElement('li');
        nameAndScore.innerText = `${name} : ${score}`
        highscoreList.append(nameAndScore);
    })

    const extraScores = highscoreList.querySelectorAll('li')[5];
    if (extraScores) {
        extraScores.remove()
    }

    highscoreList.innerHTML = '';

    finalObj.slice(0, 5).forEach(({ name, score }) => {

        if (name == playerName) {
            alreadyInTheHighScoreList = true;
          
        }
        const nameAndScore = document.createElement('li');
        nameAndScore.innerText = `${name} : ${score}`
        highscoreList.append(nameAndScore);
    })


    return data;
}

getHighscore();





//Patch

async function patch() {
 

    let putObj = {}
    putObj[playerName] = {
        name: playerName,
        score: pscore
    };
    console.log(putObj);
    const init = {
        method: 'PATCH',
        body: JSON.stringify(putObj),
        headers: {
          
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const respons = await fetch(highscoreUrl + '.json', init);
    const data = await respons.json();
    
}

async function deleteLowest() {
    const url = highscoreUrl + `/${lowestScore}.json`;
    const respons = await fetch(url, { method: 'DELETE' });
    const data = await respons.json();
    
}


let randomNumber = Math.round(Math.random() * 3);
//h1 element
const player = document.querySelector("#player");
const computer = document.querySelector("#computer");
const result = document.querySelector("#result");
//spelknappar
const rock = document.querySelector("#rock")
const sicssor = document.querySelector("#sicssor")
const paper = document.querySelector("#paper")
const inputButton = document.querySelector("#inputbutton")

//Knappmeddelande

inputButton.addEventListener('click', pNamn);
function pNamn(event) {
    event.preventDefault();
    const el = document.createElement('h1');
    document.body.appendChild(el);
    const textinput = document.querySelector('#nameinput')
    el.innerText = textinput.value
    el.style.textAlign = "center"
    el.classList.add('user-name-container');
    el.style.color = "red"
    el.style.fontFamily = "Arial, Helvetica, sans-serif";
    playerName = textinput.value
  
}
//Spelpoäng

let pscore = 0;
let cscore = 0;

//Spel alternativ

//STEN

rock.addEventListener('click', sten)
function sten(event) {
    randomNumber = Math.round(Math.random() * 2);
    spelare = event.target.innerText
    const el = document.createElement('h1');
    document.body.appendChild(el);
    player.innerText = "Player:" + spelare

    if (randomNumber == 0) {
        computer.innerText = " Computer: STEN "
        result.innerText = " Result: LIKA"

    }

    else if (randomNumber == 1) {
        computer.innerText = " Computer: PÅSE "
        result.innerText = " Result: DATORN VINNER"
        cscore++
    }

    else if (randomNumber == 2) {
        computer.innerText = " Computer: SAX "
        result.innerText = " Result: SPELARE VINNER"
        pscore++


    }
    document.querySelectorAll("h2")[0].innerText = "Player:" + pscore
    document.querySelectorAll("h2")[1].innerText = "Computer:" + cscore

    setTimeout(function () {

        if (cscore >= 1) {
            checkIfhighscore()
            alert("Game over!")
            location.reload(true)
        }
    }, 30)

}

//SAX

sicssor.addEventListener('click', sax)
function sax(event) {
    randomNumber = Math.round(Math.random() * 2);
    spelare = event.target.innerText
    const el = document.createElement('h1');
    document.body.appendChild(el);
    player.innerText = "Player:" + spelare;

    if (randomNumber == 0) {
        computer.innerText = " Computer: STEN "
        result.innerText = " Result: DATORN VINNER"
        cscore++
    }

    else if (randomNumber == 1) {
        computer.innerText = " Computer: PÅSE "
        result.innerText = " Result: SPELARE VINNER"
        pscore++;
    }

    else if (randomNumber == 2) {
        computer.innerText = " Computer: SAX "
        result.innerText = " Result: LIKA"

    }
    document.querySelectorAll("h2")[0].innerText = "Player:" + pscore
    document.querySelectorAll("h2")[1].innerText = "Computer:" + cscore

    setTimeout(function () {

        if (cscore >= 1) {
            checkIfhighscore()
            alert("Game over!")
            location.reload(true)
        }
    }, 30)

}

//PÅSE

paper.addEventListener('click', papper)
function papper(event) {
    randomNumber = Math.round(Math.random() * 2);
    spelare = event.target.innerText;
    const el = document.createElement('h1');
    document.body.appendChild(el);
    player.innerText = "Player:" + spelare;

    if (randomNumber == 0) {
        computer.innerText = " Computer: STEN "
        result.innerText = " Result: SPELARE VINNER"
        pscore++;
    }

    else if (randomNumber == 1) {
        computer.innerText = " Computer: PÅSE "
        result.innerText = " Result: LIKA"

    }

    else if (randomNumber == 2) {
        computer.innerText = " Computer: SAX "
        result.innerText = " Result: DATORN VINNER"
        cscore++;

    }
    document.querySelectorAll("h2")[0].innerText = "Player:" + pscore
    document.querySelectorAll("h2")[1].innerText = "Computer:" + cscore

    setTimeout(function () {

        if (cscore >= 1) {
            checkIfhighscore()
            alert("Game over!")
            location.reload(true)
        }
    }, 30)


}

function checkIfhighscore() {
 
    if (pscore > lowestScoreValue) {
        
        getHighscore()
       
        patch()
        if(!alreadyInTheHighScoreList)deleteLowest()

    }
}















