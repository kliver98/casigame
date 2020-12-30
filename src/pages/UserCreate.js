import React, { Component } from 'react';
import axios from 'axios'
import {API_BASE} from '../actions/constants'

class UserCreate extends Component {

    Form1() {
        return (
            <div className="col-12">
                <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <div id="legend">
                        <legend className="">Registrarse</legend>
                        <span id="message"></span>
                        </div>
                        <div className="progress mb-2">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    
                        <div className="control-group">
                        <label className="control-label" htmlFor="fullname">Nombre completo</label>
                        <div className="controls">
                            <input type="text" id="fullname" name="fullname" placeholder="" autoComplete="off" className="col-10" />
                        </div>
                        </div>
        
                        <div className="control-group">
                        <label className="control-label"  htmlFor="username">Usuario</label>
                        <div className="controls">
                            <input type="text" id="username" name="username" placeholder="Min:3 y Max:10 caracteres" autoComplete="off" className="col-10" required/>
                        </div>
                        </div>

                        <div className="control-group">
                        <label className="control-label" htmlFor="password">Contraseña</label>
                        <div className="controls">
                            <input type="password" id="password" name="password" placeholder="Min:5 y Max:10 caracteres" autoComplete="off" className="col-10" required/>
                        </div>
                        </div>
        
                        <div className="control-group">
                        <label className="control-label"  htmlFor="_id">Número de identificación</label>
                        <div className="controls">
                            <input type="number" id="_id" name="_id" placeholder="" autoComplete="off" className="col-10" required/>
                        </div>
                        </div>
        
                        <div className="control-group mt-4">
                        <div className="controls">
                            <button type="submit" className="btn btn-success">Registrarse</button>
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
        axios.post(API_BASE+"/users",user).then(resp => {
            if (resp.status===200 || resp.status===201) {
                document.getElementById("message").innerHTML = "<span style='color:green;'>Creado correctamente</span>";
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

export default UserCreate;