import React, {useState} from 'react'
import axios from 'axios'
import {API_BASE,MIN_BET} from '../actions/constants'

const Game = (props) => {

    let {users,reload} = props
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [bets, setBets] = useState([]);

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) { //When time it's over
                timer = duration;
                setLoad(!load)
            }
        }, 1000);
    }

    function payBets(bets) {
        var random = Math.round(Math.random() * 3)
        random = random===1 ? 'red' : random===2 ? 'green' : 'black'
        bets = bets.filter(bet => bet.mode===random).forEach(bet => {
            var amount = random==='green' ? bet.amount*10:bet.amount*2
            bet.amount = amount
        });
        setTimeout(() => {
            axios.get(API_BASE+"/users/").then(res => {
                bets.forEach(x => {
                    var u = res.data.find(y => y._id===x.id)
                    u.money+=x.amount
                    axios.put(API_BASE+"/users/"+u._id,u)
                })
            })
        },500)

    }

    function reLoad() {
        payBets(bets)
        window.location.reload()
    }
    
    window.onload = function () {
        var minutes = 60 * 3,
            display = document.getElementById('time');
        startTimer(minutes, display);
    };

    function checkFileds(bet) {
        var color = bet.mode==='red' || bet.mode==='green' || bet.mode==='black'
        if ( isNaN(bet.id) || isNaN(bet.amount) || !color)
            return false
        return true
    }

    function showMessage(message, time) {
        setMessage(message)
        setTimeout(() => setMessage(''),time)
    }

    function betFunction() {
        var doc = document.getElementById('user')
        var doc2 = document.getElementById('mode')
        var bet = {
            id: doc.childNodes[doc.selectedIndex].value,
            amount: document.getElementById('bet').value,
            mode: doc2.childNodes[doc2.selectedIndex].value
        }
        if (checkFileds(bet)) {
            axios.get(API_BASE+"/users/"+bet.id).then(response => {
                var user = response.data
                if (response.status===200 && user) {
                    if (user.money>MIN_BET) {
                        bet.amount = (user.money*bet.amount)/100
                    }else {
                        if (user.money>0) {
                            bet.amount = user.money
                            showMessage('Advertencia: Se apostara ALL IN [MIN: '+MIN_BET+']',3000)
                        } else
                            showMessage('Error: no tiene fondos suficientes [dinero: '+user.money+']',3000)
                    }
                } else {
                    showMessage('Error: no se encontro usuario. Verifique id ['+bet.id+']',3000)
                }
            }).then(() => {
                if (bet.amount>100) {
                    setBets(prev => [...prev, bet])
                }
            })
        }else {
            showMessage('Error: hay campos incorrectos ',3000)
        }
    }

    return (
        <div className="container mt-3 pt-2 pb-2" style={{background:"gainsboro"}}>
            {
                message ? 
                <div id="messagePropmt" className="alert alert-danger" role="alert">
                    {message}
                </div>
                :''
            }
            <div className="col-12">
                <select className="form-select" id="user" aria-label="Select user">
                <option defaultValue>Seleccione usuario</option>
                {
                    users.map(user => {return (<option value={user._id} key={user._id}>{user.username+" - "+user._id}</option>)})
                }
                </select>
            </div>
            <br></br>
            <div className="control-group">
                <label className="control-label"  htmlFor="bet">Cantidad de apuesta %</label>
                <div className="controls">
                    <input type="number" id="bet" name="bet" placeholder="min:11 - max:19" autoComplete="off" className="col-10" required min="11" max="19" step="0.1" defaultValue="11"/>
                </div>
            </div>
            <div className="control-group">
                <label className="control-label"  htmlFor="betMode">Modo apuesta</label>
                <div className="controls">
                    <select className="form-select" id="mode" aria-label="Color">
                    <option value="green">Verde - 1%</option>
                    <option value="red">Rojo - 49.5%</option>
                    <option value="black">Negro - 49.5%</option>
                    </select>
                </div>
            </div>
            <br></br>
            <div>
                <button type="button" className="btn btn-info" onClick={() => betFunction()}>Apostar</button>
            </div>
            <br></br>
            <div className="col-12">
                <h5>Siguiente juego automático en: </h5>
                <h5 id="time">###</h5>
                {
                    load ? reLoad():''
                }
            </div>
        </div>
    )
}

export default Game;