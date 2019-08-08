import axios from 'axios';
import {config} from '../config';

export async function createMaze(name, difficulty, width, height){
    let body = {
        ["maze-width"]: width,
        ["maze-height"]: height,
        ["maze-player-name"]: name,
        difficulty: difficulty
    };
    let res = await axios.post(`${config.url}/pony-challenge/maze`, JSON.stringify(body), 
                    {headers: {'Content-Type': 'application/json'}})
                    .then(response => {
                        return response.data
                    }).catch(err => {
                        return err.response.data
                    })
    return res
}

export async function getMaze(id){
    try{
        let res = await axios.get(`${config.url}/pony-challenge/maze/${id}`)
        return res.data
    }catch(error){
        console.log(error)
    }
}

export async function movePony(id, direction){
    let body = {
        direction:direction
    }

    try{
        let res = await axios.post(`${config.url}/pony-challenge/maze/${id}`, JSON.stringify(body),
                                        {headers: {'Content-Type': 'application/json'}})
        return res.data
    }catch(error){
        console.log(error)
    }
}

export async function printMaze(id){
    try{
        let res = await axios.get(`${config.url}/pony-challenge/maze/${id}/print`)
        return res.data
    }catch(error){
        console.log(error)
    }
}
