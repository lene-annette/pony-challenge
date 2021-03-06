import React, { Component } from 'react';
import Game from './Game';
import {createMaze} from '../Controllers/PonyController';
const image = require('../Images/hero2.jpg')

/**
 * Renders page shown to user before starting the game. 
 * Asks for player name and difficulty, size of maze is preset.
 * Calls the Game component when game is started. 
 */

 export default class Startpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            difficulty: 0,
            width: 20,
            height: 15,
            start: false,
            id: '',
            error: null
        }
        this.handleEnd = this.handleEnd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    /**used to get back to this component, either during game or game has ended */
    handleEnd() {
        this.setState({ start: false })
    }

    /**handles when player use button to start game
     * runs check if controller returns error message or an id. If id is returned game starts. 
     */
    async handleClick() {
        let data = await createMaze(this.state.name,this.state.difficulty,this.state.width,this.state.height)
        if(data.maze_id !== undefined){
            this.setState({
                id: data.maze_id,
                start: true 
            })
        }else{
            this.setState({error:data})
        }
    }

    /**saves the input from player in state */
    handleChange(event) {
        if (event.target.name === "pony") {
            this.setState({ name: event.target.value })
        } else if (event.target.name === "difficulty") {
            let no = parseInt(event.target.value)
            this.setState({ difficulty: no })
        }
    }

    render() {
        let content = ""
        if (this.state.start) {
            //calss Game component
            content = (
                <Game
                    handleEnd={this.handleEnd}
                    id={this.state.id}
                />
            )
        } else {
            //Shows start page
            let error = ''
            if(this.state.error !== null){
                error = this.state.error
            }
            content = (
                <div>
                    <div>
                        <h1>Save the pony!</h1>
                        <p>Our poor pony friend has been trapped in a maze with the terrifying Domokun! Get the pony out before it is to late!</p>
                        <p>Enter your ponys name and choose a difficulty:</p>
                        <p className="errorMessage">{error}</p>
                        <input type="text" placeholder="Name" name="pony" onChange={this.handleChange} />
                        <p>Difficulty:
                        <select value={this.state.difficulty} name="difficulty" onChange={this.handleChange}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </p>
                        <button onClick={this.handleClick}>Start</button>
                    </div>
                    <div>
                        <br />
                        <img src={image} />
                    </div>
                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }

}