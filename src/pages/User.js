import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {API_BASE} from '../actions/constants'
import UserCreate from './UserCreate'

const Users = () => {

    const [users, setUsers] = useState([]);
    const [create, setCreate] = useState(false);

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

    function deleteuser(id) {
        axios.delete(API_BASE+"/users/"+id)
    }

    function edituser(id) {

    }

    function returnrow(username, id, money) {
        var pointer = {cursor: "pointer"}
        return (
            <tr>
                <th scope="row">{id}</th>
                <td>{username}</td>
                <td>$ {formatmoney(money)}</td>
                <td>
                    <i className="fas fa-user-edit mr-2" style={pointer} onClick={() => edituser(id)}></i>
                    <i className="fas fa-user-minus" style={pointer} onClick={() => deleteuser(id)}></i>
                </td>
            </tr>
        )
    }

    return (
        <div className="">
            <button type="button" className="btn btn-secondary mr-1" onClick={() => setCreate(true)}>Crear Usuario</button>
            <button type="button" className="btn btn-primary ml-1" onClick={() => setCreate(false)}>Ver Usuarios</button>
            <div className="mb-4"></div>
            {
                users.length>0 && !create ? 
                <table className="table bg-info">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre de usuario</th>
                        <th scope="col">Dinero disponible</th>
                        <th scope="col">Opciones</th>
                        </tr>
                        {
                            users.map(user => returnrow(user.username, user._id, user.money))
                        }
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                : !create ? 'No hay usuarios para mostrar':<UserCreate></UserCreate>
            }
        </div>
    )
}

export default Users;