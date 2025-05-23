const Gameboard = (function () {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    const gameboardEmpty = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const placeX = (position) => gameboard.splice(position, 1, "X");
    const placeO = (position) => gameboard.splice(position, 1, "O");
    return {gameboard, gameboardEmpty, placeX, placeO};
})();

const choice = (function () {
    const player = 9;
    const computer = (empty) => empty[Math.floor(Math.random() * empty.length)];
    return {computer, player};
})();


const check = (function (){
    const player = (choice) => Gameboard.gameboardEmpty.find((ele) => ele == choice);
    const index = (choice) => Gameboard.gameboardEmpty.findIndex((ele) => ele == choice);
    return {player, index};
})();



function playerChoose(num) {
    thisSpace = document.getElementById(num);
    choice.player = num;
    choiceIsValid = check.player(choice.player);
    if (isNaN(choiceIsValid) == false) {
        Gameboard.placeX(choice.player);
        thisSpace.innerHTML = 'X';
        Gameboard.gameboardEmpty.splice(check.index(num), 1);
        if (Gameboard.gameboardEmpty.length > 0) {
            let computerChoice = choice.computer(Gameboard.gameboardEmpty);
            console.log(computerChoice);
            Gameboard.gameboardEmpty.splice(check.index(computerChoice), 1);
            Gameboard.placeO(computerChoice);
            document.getElementById(computerChoice).innerHTML = "O";
        } else {
            Alert("Game ended in a draw!");
        };
    };
    console.log(Gameboard.gameboard);
    console.log(Gameboard.gameboardEmpty);
}



function playTicTacToe() {
    while (Gameboard.gameboardEmpty.length > 0){
        let playerChoice = "i";
        while (isNaN(playerChoice) == true) {
            playerChoice = round.player(choice.player(Gameboard.gameboardEmpty))
        };
        Gameboard.placeX(playerChoice);
        spaceIndex = Gameboard.gameboardEmpty.findIndex((ele) => ele == playerChoice);
        Gameboard.gameboardEmpty.splice(spaceIndex, 1);
        console.log(Gameboard.gameboard);
        console.log(Gameboard.gameboardEmpty);
        let computerChoice = "i";
        if (Gameboard.gameboardEmpty.length != 0){
            while (isNaN(computerChoice) == true) {
                computerChoice = round.computer(choice.computer(Gameboard.gameboardEmpty));
            };
            Gameboard.placeO(computerChoice);
            Gameboard.gameboardEmpty.splice(computerChoice, 1);
            console.log(Gameboard.gameboard);
            console.log(Gameboard.gameboardEmpty);
        } else {
            break;
        }

    };
    return "Done";
};



