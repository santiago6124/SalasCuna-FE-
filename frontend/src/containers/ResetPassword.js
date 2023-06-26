import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ResetPassword = () => {

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
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;