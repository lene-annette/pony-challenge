import React, { Component } from 'react';

export default class Startpage extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            difficulty:0,
            start: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleEnd = this.handleEnd.bind(this)
    }

    handleEnd(){
        this.setState({start:false})
    }

    handleClick(){
        this.setState({start:true})
    }

    handleChange(event){
        if(event.target.name === "pony"){
            this.setState({name:event.target.value})
        }else{
            let no = parseInt(event.target.value)
            this.setState({difficulty:no})
        }
    }

    render() {
        let content = ""
        if(this.state.start){
            content = (
                <div>
                    <p>Game has started</p>
                    <button onClick={this.handleEnd}>End game</button>
                </div>
            )
        }else{
            content = (
                <div>
                    <p>Enter your ponys name and choose a difficulty:</p>
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
            )
        }
        return (
            <div>
                <h1>Save the pony!</h1>
                <p>Our poor pony friend has been trapped in a maze with the terrifying Domokun! Get the pony out before it is to late!</p>
                {content}
            </div>
        )
    }

}