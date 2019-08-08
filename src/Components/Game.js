import React, { Component } from 'react';
import GameOver from './GameOver'
import { getMaze, movePony, printMaze } from '../Controllers/PonyController';
/**
 * Renders game
 */
export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            maze: null,
            print: null,
            ended: null,
            error: ''
        }
        this.move = this.move.bind(this)
    }

    async move(event) {
        this.setState({ error: '' })
        let direction = event.target.value
        let res = await movePony(this.state.id, direction)
        if (res["state-result"] === 'Move accepted') {
            let print = await printMaze(this.state.id)
            this.setState({ print: print })
        } else if (res.state === 'won' || res.state === 'over') {
            let ended = {
                result: res["state-result"],
                hidden: res["hidden-url"]
            }
            this.setState({ ended: ended })
        } else {
            this.setState({ error: res["state-result"] })
        }
    }

    async componentWillMount() {
        let maze = await getMaze(this.state.id)
        this.setState({ maze: maze })
        let print = await printMaze(this.state.id)
        this.setState({ print: print })
    }

    render() {
        let content = ''
        if (this.state.print === null) {
            content = 'Loading'
        } else if (this.state.ended !== null) {
            content = (
                <GameOver
                    ended={this.state.ended}
                />
            )
        } else {
            let info = this.state.maze
            let print = JSON.stringify(this.state.print)
            let mazeArr = print.split('\\n')
            let maze = mazeArr.map(line => {
                return (
                    <pre>{line}</pre>
                )
            })
            content = (
                <div className="game">
                    <div>
                        <p className="errorMessage">{this.state.error}</p>
                        <p>Size: {info.size[0]} * {info.size[1]}, Difficulty: {info.difficulty}</p>
                    </div> 
                    <div className="maze">
                        {maze}
                    </div>
                    <div>
                        <button value="north" onClick={this.move}>up</button>
                        <button value="south" onClick={this.move}>down</button>
                        <button value="west" onClick={this.move}>left</button>
                        <button value="east" onClick={this.move}>right</button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="game-content">
                    <div className="wrapper">
                        {content}
                    </div>
                </div>
                <button onClick={this.props.handleEnd}>Back to start</button>
            </div>
        )
    }
}