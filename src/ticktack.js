import React from 'react';
import './App.css'

class Square extends React.Component {


    render() {
        let winnerArray = this.props.winnerArray;
        let btnId = this.props.elementID;
        let btnStyle = "";

        if (winnerArray.indexOf(btnId) !== -1) {
            btnStyle = this.props.btnStyle;

        }
        return (

            <button className="square" onClick={() => this.props.onClick()}
                style={{ backgroundColor: btnStyle }}>
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
                btnStyle={this.props.btnStyle}
                winnerArray={this.props.winnerArray}
                elementID={i}
            />
        );
    }


    render() {


        var numrows = 3;
        var numcolmns = 3;
        const mapItem = [];
        let k = 0;
        for (let i = 0; i < numrows; i++) {
            var row = [];
            for (let j = 0; j < numcolmns; j++) {
                row.push(this.renderSquare(k));
                k++
            }

            mapItem[i] = row;

        }
        return (
            <div>
                {mapItem.map(
                    function (value, key) {
                        return (
                            <div key={key} className="board-row">
                                {value}
                            </div>)
                    }

                )}

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
            stepNumber: 0,
            backgroundColor: 'red',
            order: 1
        }

    }
    handleClick(e) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const square = current.squares.slice();
        const player = (this.state.status) ? 'X' : 'o';

        var winner = calculateWinner(square);
        if (winner || square[e]) {
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
    toggleList(e) {
        this.setState({
            order: !this.state.order
        })
    }

    render() {

        const history = this.state.history;

        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
       debugger;
        if (this.state.order) {
            var moves = history.slice(0).reverse().map((step, move) => {
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
        }else{
             var orderList = [];
                history.map((step, move) => {
                    return orderList.push(move);
                });
                var moves = orderList.reverse().map(function (el, index, coll) {
                    console.log(el);
                    console.log(index);
                    console.log(coll);
                     const desc = el ?
                    'Move #' + el :
                    'Game start';
                        return(<li key={el}><a href="#" onClick={() => this.jumpTo(el)}>{desc}</a></li>);
                 });
        }

        console.log(moves);
        let status;
        let winnerList = [];
        if (winner) {
            winnerList = winner[0]['winnerArray'];

            status = 'Winner: ' + winner[0]['winnerSquare'];
        } else {
            status = 'Next player: ' + (this.state.status ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}
                        btnStyle={this.state.backgroundColor} winnerArray={winnerList} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div>
                    <button onClick={() => this.toggleList()}>Toggle</button>
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

    var winnerArray = [];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            var obj = { winnerSquare: squares[a], winnerArray: lines[i] }
            winnerArray.push(obj);
            console.log(winnerArray);
            return winnerArray;
            //return squares[a];
        }
    }
    return null;
}
export default Game;