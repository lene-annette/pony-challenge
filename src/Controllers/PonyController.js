import axios from 'axios';
import { config } from '../config';

/**creates maze, sends body with dimensions and name, handles if error is returned from API */
export async function createMaze(name, difficulty, width, height) {
    let body = {
        ["maze-width"]: width,
        ["maze-height"]: height,
        ["maze-player-name"]: name,
        difficulty: difficulty
    };

    let res = await axios.post(`${config.url}/pony-challenge/maze`, JSON.stringify(body),
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            return response.data
        }).catch(err => {
            return err.response.data
        })
    return res
}

/**returns maze data from API*/
export async function getMaze(id) {
    try {
        let res = await axios.get(`${config.url}/pony-challenge/maze/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

/**Sends direction to API and recieves response if move is possible and status of game */
export async function movePony(id, direction) {
    let body = {
        direction: direction
    }

    try {
        let res = await axios.post(`${config.url}/pony-challenge/maze/${id}`, JSON.stringify(body),
            { headers: { 'Content-Type': 'application/json' } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

/**Gets printet maze from API, including Pony, Domokun and Endpoint */
export async function printMaze(id) {
    try {
        let res = await axios.get(`${config.url}/pony-challenge/maze/${id}/print`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
