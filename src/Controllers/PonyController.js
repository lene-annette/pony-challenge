import axios from 'axios';
import {config} from '../config';

export async function createMaze(name, difficulty, width, height){
    let body = {
        [maze-width]: width,
        [maze-height]: height,
        [maze-player-name]: name,
        difficulty: difficulty
    };

    try {
        let data = await axios.post(`${config.url}/pony-challenge/maze`, JSON.stringify(body), 
                                            {headers: {'Content-Type': 'application/json'}})
        return data
    } catch(error){
        console.log(error)
    }
}

export async function getMaze(id){
    try{
        let data = await axios.get(`${config.url}/pony-challenge/maze/${id}`)
        return data
    }catch(error){
        console.log(error)
    }
}

export async function movePony(id, direction){
    let body = {
        direction:direction
    }

    try{
        let data = await axios.post(`${config.url}/pony-challenge/maze/${id}`, JSON.stringify(body),
                                        {headers: {'Content-Type': 'application/json'}})
        return data
    }catch(error){
        console.log(error)
    }
}

export async function printMaze(id){
    try{
        let data = await axios.get(`${config.url}/pony-challenge/maze/${id}/print`)
        return data
    }catch(error){
        console.log(error)
    }
}
