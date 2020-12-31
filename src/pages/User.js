import React, {useState} from 'react'
import axios from 'axios'
import {API_BASE} from '../actions/constants'
import UserCreate from './UserCreate'
import UserEdit from './UserEdit'

const Users = (props) => {

    let {users,reload} = props
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(-1);

    function formatmoney(money) {
        var m = money.toString()
        var rst = '';
        if (money.toString().length<4)
            return money
        for(var i=m.length-1; i>=0;i--) {
            rst+=m[i]
            if ((m.length-(i))%3===0 && i!==0) {
                rst+='.'
            }
        }
        return rst.split('').reverse().join('')
    }

    function deleteuser(id) {
        axios.delete(API_BASE+"/users/"+id).then(() => reload())
    }

    function returnrow(username, id, money) {
        var pointer = {cursor: "pointer"}
        return (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{username}</td>
                <td>$ {formatmoney(money)}</td>
                <td>
                    <i className="fas fa-user-edit mr-2" style={pointer} onClick={() => {reload(); setEdit(id)}}></i>
                    <i className="fas fa-user-minus" style={pointer} onClick={() => deleteuser(id)}></i>
                </td>
            </tr>
        )
    }

    return (
        <div className="">
            <button type="button" className="btn btn-secondary mr-1 col-md-5" onClick={() => {reload(); setCreate(true); setEdit(-1)}}>Crear Usuario</button>
            <button type="button" className="btn btn-primary ml-1 col-md-5" onClick={() => {reload(); setCreate(false); setEdit(-1)}}>Ver Usuarios</button>
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
                : !create ? 'No hay usuarios para mostrar':<UserCreate reload={reload}></UserCreate>
            }
        </div>
    )
}

export default Users;