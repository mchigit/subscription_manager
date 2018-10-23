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
    left: ${(props) => props.timePassed ? "50%" : "-50%"};
    margin: -350px 0 0 -450px;
    -webkit-transition: left 1s; /* Safari */
    transition: left 1s;
    opacity: 0.9;
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

const AdditionalContainer = styled.div`
    width: 450px;
    margin: 0 auto;
`;

const AdditionalItem = styled.div`
    margin-top: 15px;
`;

const SignUp = styled.span`
    text-decoration: underline;
    cursor: pointer;

    &:hover{
        color: #8B4513;
    }
`

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.timePassed = this.timePassed.bind(this);

        this.state = {
            timePassed: false,
          }
    }

    componentDidMount(){
        this.props.timePassed();
        this.timePassed();
    }

    timePassed(){
        setTimeout(() => {  
            this.setState({ 
                timePassed: true
            })
        }, 1000);
    };

    render() {
        return (
            <div>
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
                    <AdditionalContainer>
                            <AdditionalItem><FontAwesomeIcon icon="address-book"/> New to Subscription Manager? <SignUp onClick={this.props.goToSignUp}>Sign Up</SignUp>!</AdditionalItem>
                            <AdditionalItem><FontAwesomeIcon icon="key"/><SignUp> Forget Password?</SignUp></AdditionalItem>
                    </AdditionalContainer>
                </Container>
            </div>
        );
    }
}

export default SignIn;