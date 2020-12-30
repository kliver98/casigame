import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {API_BASE} from '../actions/constants'

const Game = () => {

    const [load, setLoad] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(API_BASE+"/users").then(response => {
        if (response.status === 200) {
            setUsers(response.data);
        }
      }
        );
      }, [load]);

    return (
        <div className="container mt-3 pt-2 pb-2" style={{background:"gainsboro"}}>
            <div className="col-12">
                <select className="form-select" aria-label="Select user">
                <option defaultValue>Seleccione usuario</option>
                {
                    users.map(user => {return (<option value={user._id} key={user._id}>{user.username+" - "+user._id}</option>)})
                }
                </select>
            </div>
            <br></br>
            <div className="control-group">
                <label className="control-label"  htmlFor="bet">Cantidad de apuesta</label>
                <div className="controls">
                    <input type="number" id="bet" name="bet" placeholder="min:11 - max:19" autoComplete="off" className="col-10" required min="11" max="19" step="0.1" defaultValue="11"/>
                </div>
            </div>
            <div className="control-group">
                <label className="control-label"  htmlFor="betMode">Modo apuesta</label>
                <div className="controls">
                    <select className="form-select" aria-label="Color">
                    <option value="green">Verde - 1%</option>
                    <option value="red">Rojo - 49.5%</option>
                    <option value="black">Negro - 49.5%</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Game;