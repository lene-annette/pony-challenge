import React, { Component } from 'react';
import { config } from '../config';
/**
 * Renders image and message when game ends
 */

export default class GameOver extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="img-box">
                    <img className="end-image" src={config.url + this.props.ended.hidden} />
                </div>
                <div>{this.props.ended.result}</div>
            </div>
        )
    }
}