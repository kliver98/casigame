import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {API_BASE} from '../actions/constants'
import UserCreate from './UserCreate'
import UserEdit from './UserEdit'

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loadUsers, setLoadUsers] = useState(true);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(-1);

    useEffect(() => {
        axios.get(API_BASE+"/users").then(response => {
        if (response.status === 200) {
            setUsers(response.data);
        }
      }
        );
      }, [create,edit]);

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

    function returnrow(username, id, money) {
        var pointer = {cursor: "pointer"}
        return (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{username}</td>
                <td>$ {formatmoney(money)}</td>
                <td>
                    <i className="fas fa-user-edit mr-2" style={pointer} onClick={() => setEdit(id)}></i>
                    <i className="fas fa-user-minus" style={pointer} onClick={() => deleteuser(id)}></i>
                </td>
            </tr>
        )
    }

    return (
        <div className="">
            <button type="button" className="btn btn-secondary mr-1" onClick={() => {setCreate(true); setEdit(-1)}}>Crear Usuario</button>
            <button type="button" className="btn btn-primary ml-1" onClick={() => {setCreate(false); setEdit(-1)}}>Ver Usuarios</button>
            <div className="mb-4"></div>
            {
                edit!==-1 ?
                <UserEdit id={edit}></UserEdit>
                : ''
            }
            {
                users.length>0 && !create && edit===-1 ? 
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