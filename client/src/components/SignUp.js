import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TextInputForm from './TextInputForm.js';

const Container = styled.div`
    background-color: #D3D3D3;
    position: absolute;
    width: 900px;
    height: 700px;
    z-index: 15;
    top: 50%;
    left: 50%;
    margin: -350px 0 0 -450px;
    opacity: 0.9;
    border-radius: 15px;
`;

const Title = styled.div`
    text-align: center;
    margin-top: 100px;
`;

const Form = styled.div`
    width: 450px;
    margin: 50px auto 20px auto;
`;

const Button = styled.button`
    width: 455px;
    height: 45px;
    background-color: #8B4513;
    margin: 50px auto 20px auto;
    border-radius: 5px;
    color: white;
    font-size: 20px;
`


class SignIn extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            
          }
    }


    render() {
        return (
            <div>
                <Container>
                    <Title>
                        <h1>Sign Up</h1>
                    </Title>
                   <Form>
                    <TextInputForm label="Email Address"></TextInputForm>
                    <TextInputForm label="Password"></TextInputForm>
                    <TextInputForm label="Confirm Password"></TextInputForm>
                    <Button>Sign Up <FontAwesomeIcon icon="check" /></Button>
                   </Form>
                </Container>
            </div>
        );
    }
}

export default SignIn;