import React from 'react'
import User from './User'
import Game from './Game'

const Home = () => {
    return (
        <div className="pl-4 pr-4 pt-3">
            <div className="row">
                <div className="col-8 text-center">
                    <div className="row">
                        <div className="col-12 bg-primary">
                        <h2>Juego</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Game></Game>
                        </div>
                        {
                            false ? 
                            <div className="col-12 bg-success">
                            <h3>Ruleta</h3>
                            </div> : <br></br>
                        }
                    </div>
                </div>
                <div className="col-4 text-center bg-secondary">
                    <h2>Gestión usuarios</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <User></User>
                </div>
            </div>
        </div>
    )
}

export default Home;