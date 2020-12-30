import React, { Component } from 'react';
import axios from 'axios'
import {API_BASE} from '../actions/constants'

class UserEdit extends Component {

    constructor(props) {
        super();
        this.userId = props.id
        this.user = {}
    }

    componentDidMount() {
        axios.get(API_BASE+"/users/").then(resp => {
            this.user = resp.data.filter(user => user._id===this.userId)[0]
        })
    }

    Form1() {
        return (
            <div className="col-12">
                <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <div id="legend">
                        <legend className="">Editar</legend>
                        <span id="message"></span>
                        </div>
                        <div className="progress mb-2">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    
                        <div className="control-group">
                        <label className="control-label" htmlFor="fullname">Nombre completo</label>
                        <div className="controls">
                            <input type="text" id="fullname" name="fullname" defaultValue={this.user.fullname} placeholder="" autoComplete="off" className="col-10" />
                        </div>
                        </div>
        
                        <div className="control-group">
                        <label className="control-label"  htmlFor="username">Usuario</label>
                        <div className="controls">
                            <input type="text" id="username" name="username" defaultValue={this.user.username} placeholder="Min:3 y Max:10 caracteres" autoComplete="off" className="col-10" required/>
                        </div>
                        </div>

                        <div className="control-group">
                        <label className="control-label" htmlFor="password">Contraseña</label>
                        <div className="controls">
                            <input type="password" id="password" name="password" defaultValue={this.user.password} placeholder="Min:5 y Max:10 caracteres" autoComplete="off" className="col-10" required/>
                        </div>
                        </div>
        
                        <div className="control-group">
                        <label className="control-label"  htmlFor="_id">Número de identificación</label>
                        <div className="controls">
                            <input type="number" id="_id" name="_id" placeholder="" defaultValue={this.user._id} autoComplete="off" className="col-10" required/>
                        </div>
                        </div>

                        <div className="control-group">
                        <label className="control-label"  htmlFor="money">Dinero</label>
                        <div className="controls">
                            <input type="number" id="money" name="money" placeholder="" defaultValue={this.user.money} autoComplete="off" className="col-10" required/>
                        </div>
                        </div>
        
                        <div className="control-group mt-4">
                        <div className="controls">
                            <button type="submit" className="btn btn-success">Modificar</button>
                        </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }

    handleSubmit(event) {
        event.preventDefault();
        let user = {
            fullname: document.getElementById("fullname").value,
            _id: parseInt(document.getElementById("_id").value),
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            money: document.getElementById("money").value
        };
        if ( !this.checkFields(user) ) {
            document.getElementById("message").innerHTML = "<span style='color:red;'>Error, verifique los campos</span>";
        } else {
            this.submit(user);
        }
    }

    checkFields = (user) => {
        if ( user._id==='' || user.username==='' || user.username.length<3 || user.username.length>10 || user.password==='' || user.password.length<5 || user.password.length>10 ) {
            return false;
        }
        return true;
    }

    submit = (user) => {
        axios.put(API_BASE+"/users/"+this.userId,user).then(resp => {
            if (resp.status===200 || resp.status===201) {
                document.getElementById("message").innerHTML = "<span style='color:green;'>Editado correctamente</span>";
                return
            }
                
        })
        document.getElementById("message").innerHTML = "<span style='color:red;'>Ocurrio un error, cambia los datos o intenta más tarde</span>";
    }

    render() {
        return(
            <div className="container">
                {this.Form1()}
            </div>
        );
    
    }
}

export default UserEdit;