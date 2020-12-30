import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {API_BASE} from '../actions/constants'

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(API_BASE+"/users").then(response => {
        if (response.status === 200) {
            setUsers(response.data);
        }
      }
        );
      });

    function formatmoney(money) {
        var m = money.toString()
        var rst = '';
        for(var i=0; i<m.length;i++) {
            if ((i+1)%3===0)
                rst+='.'
            rst+=m[i]
        }
        return rst
    }

    function returnrow(username, id, money) {

        return (
            <tr>
                <th scope="row">{id}</th>
                <td>{username}</td>
                <td>$ {formatmoney(money)}</td>
            </tr>
        )
    }

    return (
        <div className="bg-info">
            {
                users.length>0 ? 
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre de usuario</th>
                        <th scope="col">Dinero disponible</th>
                        </tr>
                        {
                            users.map(user => returnrow(user.username, user._id, user.money))
                        }
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                : ''
            }
        </div>
    )
}

export default Users;