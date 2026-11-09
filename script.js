const board= document.getElementById("board");
const startingPosition = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

const symbols = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};


let selectedSquare=null;

for(let row=0;row<8;row++)
{
    for(let col=0;col<8;col++)
    {
        const square=document.createElement("div");
        square.classList.add("square");
        const piece=startingPosition[row][col];
        if(piece!==".")
        {
            square.textContent=symbols[piece];
        }
        if((row+col)%2==0)
        {
            square.classList.add("light");
        }
        else{
            square.classList.add("dark");
        }
        square.addEventListener("click",function(){
            if(piece==".")
            {
                return;
            }
            if(selectedSquare!==null)
            {
                selectedSquare.classList.remove("selected");
            }
            selectedSquare=square;
            selectedSquare.classList.add("selected");
        })

        board.appendChild(square);
    }
}

