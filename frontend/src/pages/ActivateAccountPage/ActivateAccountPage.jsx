import React, {useContext} from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import './ActivateAccountPage.css';

const ActivateAccountPage = () => {
    const {uid, token} = useParams()
    let history = useNavigate()

    let uidToken = uid
    let activationToken = token
    const [show, setShow] = React.useState(false);

    let activateAccount = async () => {
        let response = await fetch('/auth/users/activation/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "uid": uidToken,
                "token": activationToken
            })
        })
        if (response.status === 204) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }


    return (
        <Container className="containerActivate">
            <h1>Verifica tu cuenta</h1>
            <Button>Verificar</Button>
        </Container> 
    );
}

export default ActivateAccountPage