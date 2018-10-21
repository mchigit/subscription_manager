import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loginBackground from '../img/loginBackground.jpg';
import TextInputForm from './TextInputForm.js';

const Background = styled.div`
    background-image: url(${loginBackground});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover; 
    width: 100%;
    height: 100%;
    -webkit-filter: ${(props) => props.timePassed ? "blur(4px)" : "none"};
    -moz-filter: ${(props) => props.timePassed ? "blur(4px)" : "none"};
    -o-filter: ${(props) => props.timePassed ? "blur(4px)" : "none"};
    -ms-filter: ${(props) => props.timePassed ? "blur(4px)" : "none"};
    filter: ${(props) => props.timePassed ? "blur(4px)" : "none"};
    z-index: -1;
    position: fixed;
`;

const Container = styled.div`
    background-color: #D3D3D3;
    position: absolute;
    width: 900px;
    height: 700px;
    z-index: 15;
    top: 50%;
    left: ${(props) => props.timePassed ? "50%" : "-50%"};
    margin: -350px 0 0 -450px;
    -webkit-transition: left 1s; /* Safari */
    transition: left 1s;
    opacity: 0.8;
    border-radius: 15px;
`;

const Logo = styled.div`
    font-size: 80px;
    width: 80px;
    margin: 50px auto auto auto;
    color: #8B4513;
`

const Title = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const Form = styled.div`
    width: 450px;
    margin: 50px auto;
`;

const Button = styled.button`
    width: 455px;
    height: 45px;
    background-color: #8B4513;
    margin: 50px auto;
    border-radius: 5px;
    color: white;
    font-size: 20px;
`

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.timePassed = this.timePassed.bind(this);

        this.state = {
            timePassed: false,
          }
    }

    componentDidMount(){
        this.timePassed();
    }

    timePassed(){
        setTimeout(() => {  
            this.setState({ 
                timePassed: true
            })
        }, 1000);
        console.log("caelled");
    };

    render() {
        return (
            <div>
                <Background timePassed={this.state.timePassed}></Background>
                <Container timePassed={this.state.timePassed}>
                    <Logo><FontAwesomeIcon icon="glasses" /></Logo>
                    <Title>
                        <h1>Subscription Manager</h1>
                    </Title>
                    <Form>
                        <TextInputForm label='Email Address'/>
                        <TextInputForm label='Password'/>
                        <Button>Sign in <FontAwesomeIcon icon="check" /></Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default SignUp;