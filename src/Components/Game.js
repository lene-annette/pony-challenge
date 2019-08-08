import React, { Component } from 'react';
import { createMaze, getMaze, movePony, printMaze } from '../Controllers/PonyController';
/**
 * Renders game if this is active
 */

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            maze: null,
            print: null
        }

        this.move = this.move.bind(this)
    }

    async move(event){
        let direction = event.target.value
        let res = await movePony(this.state.id,direction)
        console.log(res)
        if(res["state-result"] === 'Move accepted'){
            let print = await printMaze(this.state.id)
            console.log(print)
            this.setState({print:print})
        }
        
    }

    async componentWillMount() {
        let data = await createMaze(this.props.name, this.props.difficulty, this.props.width, this.props.height)
        this.setState({ id: data.maze_id })
        let maze = await getMaze(data.maze_id)
        this.setState({ maze: maze })
        let print = await printMaze(data.maze_id)
        console.log(print)
        this.setState({ print: print })

    }

    render() {
        let content = ''
        if (this.state.print === null) {
            content = 'Loading'
        } else {
            let info = this.state.maze
            console.log(this.state.maze)
            let print = JSON.stringify(this.state.print)
            let mazeArr = print.split('\\n')
            let maze = mazeArr.map(line => {
                return (
                <pre>{line}</pre>
                )
            })
            content = (
                <div>
                    <div>
                        <p>Size: {info.size[0]} * {info.size[1]}, Difficulty: {info.difficulty}</p>
                    </div>
                    <div className="display-linebreak">
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
                {content}
                <button onClick={this.props.handleEnd}>end</button>
            </div>
        )
    }
}