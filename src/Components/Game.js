import React, { Component } from 'react';
import {createMaze, getMaze, movePony, printMaze} from '../Controllers/PonyController';
/**
 * Renders game if this is active
 */

export default class Game extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: null
        }
    }

    async componentWillMount(){
        let data = await createMaze(this.props.name,this.props.difficulty, this.props.width, this.props.height)
        this.setState({id: data.maze_id})
    }

    render(){
        let content = ''
        if(this.state.id === null){
            content = 'Loading'
        }else{
            content = this.state.id
        }
        return(
            <div>
                game created
                <p>id: {content}</p>
                <button onClick={this.props.handleEnd}>end</button>
            </div>
        )
    }
}