import React from "react";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import "./ChangePassword.css";

const ChangePassword = () => {

  let history = useNavigate()

  let resetPasswordEmail = async (e) => {
      e.preventDefault()
      let response = await fetch('/auth/users/reset_password/', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
          },
          body: JSON.stringify({
              "email": e.target.email.value
          })
      })
      if (response.status === 204) {
          history('/')
      } else {
          alert('Something went wrong')
      }
  }

  return (
    <div className='container mt-5'>
            <h1>Ingrese su mail para cambiar su contraseña:</h1>
            <form>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Cambiar Contraseña</button>
            </form>
        </div>
  );
}

export default ChangePassword