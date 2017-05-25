import React from 'react';
import './App.css'

class Square extends React.Component {


    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}
class Board extends React.Component {
renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
   render(){
     
             return (
                <div>
                    <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    </div>
                </div>
    
        );
   }
}


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            status: 1,
            stepNumber: 0
        }

    }
    handleClick(e) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const square = current.squares.slice();
        const player = (this.state.status) ? 'X' : 'o';


        if (calculateWinner(square) || square[e]) {
            return;
        }
        square[e] = player;
        this.setState(
            {
                history: history.concat({
                    squares: square
                }),
                stepNumber: history.length,
                status: !this.state.status,
            }
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            status: step % 2 ? 0 : 1
        });
    }
    render() {

        const history = this.state.history;
        console.log(history);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {

            console.log(move);
            console.log(step);
            const desc = move ?
                'Move #' + move :
                'Game start';
            if (move == this.state.stepNumber) {
                return (
                    <b><li key={move}><a href="#" onClick={() => this.jumpTo(move)}>{desc}</a></li></b>
                )
            }
            else {
                return (
                    <li key={move}><a href="#" onClick={() => this.jumpTo(move)}>{desc}</a></li>
                )
            }

        });
        console.log(moves);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.status ? 'X' : 'O');
        }
        return (
            <div className="game">

                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>

            </div>
        )
    }
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
export default Game;