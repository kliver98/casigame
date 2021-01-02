import React, {useEffect, useState} from 'react'
import User from './User'
import Game from './Game'
import {API_BASE} from '../actions/constants'
import axios from 'axios'

const Home = () => {

    const [users,setUsers] = useState([]);
    const [reload,setReload] = useState(Date.now);

    useEffect(() => {
        axios.get(API_BASE+"/users").then(response => {
            if (response.status === 200) {
                setUsers(response.data);
            }
          }
            );
    },[reload]);

    function changeReload() {
        setReload(Date.now)
    }

    return (
        <div className="pl-4 pr-4 pt-3">
            <div className="row">
                <div className="col-7 text-center">
                    <div className="row">
                        <div className="col-12">
                        <h2>Juego</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Game users={users}></Game>
                        </div>
                        {
                            false ? 
                            <div className="col-12 bg-success">
                            <h3>Ruleta</h3>
                            </div> : <br></br>
                        }
                    </div>
                </div>
                <div className="col-5 text-center">
                    <h2>Gestión de usuarios</h2>
                    <br></br>
                    <User users={users} reload={changeReload}></User>
                </div>
            </div>
        </div>
    )
}

export default Home;