import fs from 'fs';
BestPlayer();// Функция, которая формирует игроков и выводит в htnl
FindAPlayer(); //Функция, которая ищет лучших игроков и выводит в таблицу
EnterPlayerDetails();// Функция, позволяющая вводить данные для игрока
ScorePlayers();// Функция, которая сортирует по очкам, дате и по месту игрока(с условиями)

function BestPlayer(){
    let string = JSON.parse(fs.readFileSync(__dirname + '/players.json', 'utf8'));
    string.sort(ScorePlayers);
    string = string.splice(0,10);
    let login = [],
        score = [],
        date = [],
        place = [];

    for (let i = 0; i < string.length; i++) {
        login.push(string[i].login);
        score.push(string[i].score);
        date.push(string[i].date);
        place.push(i+1);
    }

    document.getElementById("login").innerHTML = login.join('<br />');
    document.getElementById("score").innerHTML = score.join('<br />');
    document.getElementById("date").innerHTML = date.join('<br />');
    document.getElementById("place").innerHTML = place.join('<br />');   
} 

function FindAPlayer() {
    let string = JSON.parse(fs.readFileSync(__dirname + '/players.json', 'utf8'));
    let input = document.getElementById('sub1');
    input.addEventListener("click", function(){
        let inplogin = document.forms['form1'].elements['Вводим логин'].value;
        string.sort(ScorePlayers);
        let result = [];
        for (let i = 0; i < string.length; i++) {
            if (inplogin == string[i].login) {
                let place = i+1;
                result.push('Логин: ' + string[i].login + ' ' + 'Очки: ' + string[i].score + ' ' + 'Дата: ' + string[i].date + ' ' + 'Место: ' + place);
            }   
        }
 alert(result);
    }) 
}

function EnterPlayerDetails(){
    let string = JSON.parse(fs.readFileSync(__dirname + '/players.json', 'utf8'));
    let input = document.getElementById('sub2');
    input.addEventListener("click", function(){
        let inplogin = document.forms['form2'].elements['Вводим логин'].value,
            inpscore = document.forms['form2'].elements['Ввод-очков'].value,
            date = new Date(),
            dd = String(date.getDate()).padStart(2, '0'),
            mm = String(date.getMonth()).padStart(2, '0'),
            yyyy = date.getFullYear();
        date = yyyy + '.' + mm + '.' + dd; 
        let inpData = [{login: '', score: '', date: ''}];
        inpData.login = inplogin;
        inpData.score = inpscore;
        inpData.date = date;
        string.push(inpData);
        string.sort(ScorePlayers);
        string = string.splice(0,10);
        console.log(string);

        let login = [],
            score = [],
            date1 = [],
            place = [];

        for (let i = 0; i < string.length; i++) {
            login.push(string[i].login);
            score.push(string[i].score);
            date1.push(string[i].date);
            place.push(i+1);
        }

        document.getElementById("login").innerHTML = login.join('<br />');
        document.getElementById("score").innerHTML = score.join('<br />');
        document.getElementById("date").innerHTML = date1.join('<br />');
        document.getElementById("place").innerHTML = place.join('<br />');

    })
}

function ScorePlayers(a,b) {
    a.score = Number(a.score);
    b.score = Number(b.score);
    
    if(a.score > b.score){
        return -1;
    }
    if (a.score == b.score) {
        if (a.date < b.date) {
            return 1 
        }
        if (a.date == b.date) {
            return 0;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;   
    }
    if (a.score < b.score) {
        return 1;
    }
}