const Gameboard = (function () {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    const gameboardEmpty = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const placeX = (position) => gameboard.splice(position, 1, "X");
    const placeO = (position) => gameboard.splice(position, 1, "O");
    return {gameboard, gameboardEmpty, placeX, placeO};
})();

const choice = (function () {
    const player = (empty) => parseInt(prompt("please choose one of the following empty spaces", String(empty)));
    const computer = (empty) => empty[Math.floor(Math.random() * empty.length)];
    return {computer, player};
})();


const round = (function (){
    const player = (choice) => Gameboard.gameboardEmpty.find((ele) => ele == choice);
    const computer = (choice) => Gameboard.gameboardEmpty.find((ele) => ele == choice);
    return {player, computer};
})();






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

console.log(playTicTacToe());

