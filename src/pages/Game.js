import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {API_BASE,MIN_BET} from '../actions/constants'
import {formatmoney} from '../util/functions'

let bets = [];

const Game = (props) => {

    let {users} = props
    const [color,setColor] = useState('')
    const [message, setMessage] = useState([]);
    const [last,setLast] = useState([]);

    useEffect(() => {
        axios.get(API_BASE+"/games/last").then(response => {
            if (response.status === 200) {
                setLast(response.data);
            }
          }
            );
    },[color]);

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
                payBets();
            }  
        }, 1000);
    }

    window.onload = function () {
        var minutes = 60 * 3,
            display = document.getElementById('time');
        startTimer(minutes, display);
    };

    function payBets() {
        axios.get(API_BASE+"/games/generate-random").then(data => {
            var random = data.data.random
            var date = Date.now()
            bets.forEach(bet => {
                setColor(random+Math.random())
                setColor(random)
                var amount = random==='green' ? bet.amount*10:bet.amount*2
                let game = {
                    date: date,
                    id: bet.id,
                    amount:bet.amount+amount,
                    mode: bet.mode,
                    payed:amount
                }
                axios.post(API_BASE+"/games",game)
                axios.get(API_BASE+"/users/"+game.id).then(res => {
                    if (res.status<200 || res.status>=300)
                            showMessage('Error: No se pudo pagar ['+game.amount+'] a ['+game.id+']', 'danger')
                    var g = res.data
                    g.amount = game.amount
                    axios.put(API_BASE+"/users/"+game.id,g).then(r => {
                        if (r.status<200 || r.status>=300)
                            showMessage('Error: No se pudo pagar ['+game.amount+'] a ['+game.id+']', 'danger')
                    })
                })
            })
        })
        setTimeout(() => {bets = []},500)
    }

    function checkFileds(bet) {
        var color = bet.mode==='red' || bet.mode==='green' || bet.mode==='black'
        if ( isNaN(bet.id) || isNaN(bet.amount) || !color)
            return false
        return true
    }

    function showMessage(message, type, time = 3000) {
        setMessage([message,type])
        setTimeout(() => setMessage([]),time)
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
                        bet.amount = Math.floor((user.money*bet.amount)/100)
                        showMessage('Se apostara $ '+formatmoney(bet.amount)+' [Id: '+bet.id+'] para '+bet.mode, 'success')
                    }else {
                        if (user.money>0) {
                            bet.amount = user.money
                            showMessage('Advertencia: Se apostara ALL IN [MIN: '+MIN_BET+']', 'warning')
                        } else
                            showMessage('Error: no tiene fondos suficientes [dinero: '+user.money+']','danger')
                    }
                } else {
                    showMessage('Error: no se encontro usuario. Verifique id ['+bet.id+']','danger')
                }
            }).then(() => {
                if (bet.amount>100) {
                    bets.push(bet)
                }
            })
        }else {
            showMessage('Error: hay campos incorrectos','danger')
        }
    }

    function returnrow(id, amount, mode,payed) {
        return (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{formatmoney(amount)}</td>
                <td>{mode}</td>
                <td>{formatmoney(payed)}</td>
            </tr>
        )
    }

    return (
        <div className="container mt-3 pt-2 pb-2" style={{background:"gainsboro"}}>
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
                    <option value="green">Green - 1%</option>
                    <option value="red">Red - 49.5%</option>
                    <option value="black">Black - 49.5%</option>
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
                <h5 id="time"> 00:00 </h5>
            </div>
            {
                message ? 
                <div id="messagePropmt" className={"alert alert-"+message[1]} role="alert">
                    {message[0]}
                </div>
                :''
            }
            <div className="col-12" style={{display:color ? '':'none',color:'DarkSlateGray'}}>
                <h5>Último juego [Color: {color}]</h5>
                <table id="lastBet" className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Cantidad Apostada</th>
                        <th scope="col">Modo</th>
                        <th scope="col">Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            last.map(game => returnrow(game.id, game.amount, game.mode, game.payed))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Game;