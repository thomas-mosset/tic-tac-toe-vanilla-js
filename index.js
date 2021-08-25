/* To get the board */
const board_el = document.querySelector("#board");
/* To get all the cells inside our board */
const cell_els = document.querySelectorAll("#board .cell");

const combinations = [
    /* Horizontal winning combinations */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    /* Vertical winning combinations */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    /* Diagonal winning combinations */
    [0, 4, 8],
    [2, 4, 6]
];

let currentTurn;

/* Initialize the set up */
setup();

function setup () {
    /* Start by removing the styles */
    board_el.classList.remove('turn-x', 'turn-o');

    for (let cell of cell_els) {
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', fillCell, { once: true });
    }

    currentTurn = Math.round(Math.random(0, 1)) == 1 ? 'x' : 'o';
    board_el.classList.add('turn-' + currentTurn);
}

function fillCell () {
    this.classList.add(currentTurn);

    /* Checking if there's a winner... */
    if(checkForWinner()) {
        const restart = confirm(currentTurn.toUpperCase() + " is the winner! Restart ?");

        if (restart) {
            setup();
        }
      /* ... Or if there's no winner (every cell is filled without a winning combination)... */  
    } else if (checkForNoWinner()) {
        const restart = confirm("It's a draw ! Restart ?");

        if (restart) {
            setup();
        }
    } else {
        /* ... Otherwise, the game continue */

        /* 
            If currentTurn is = to "x", switch to "o",
            if currentTurn is = to "o", switch to "x",
        */
        currentTurn = currentTurn == "x" ? "o" : "x";

        /* Remove the slyling */
        board_el.classList.remove('turn-o', 'turn-x');

        /* Add the slyling = to the current player */
        board_el.classList.add('turn-' + currentTurn);
    }

}

function checkForWinner () {
    /* We're looping through our global combinations array looking for any inner combinations arrays that return true */
    return combinations.some(combination => {
        /* We're looping through the inner combination array checking if one returns true */
        return combination.every(cell => {
            if (cell_els[cell].classList.contains(currentTurn)) {
                return true;
            }

            return false;
        })
    })
}

/* When all cells are fill, and there are no winner */
function checkForNoWinner () {
    /* If every cells contains either an "x" or an "o" */
    return [...cell_els].every(cell => {
        if (
            cell.classList.contains('x') ||
            cell.classList.contains('o')
        ) {
            return true;
        }

        return false;
    });
}