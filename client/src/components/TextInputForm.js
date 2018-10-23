import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 20px;
`

const Label = styled.p`
   font-size: 20px;
   margin-right: 20px;
`;

const Form = styled.input`
    width: 450px;
    height: 35px;
    font-size: 20px;
    border: 1px solid #8B4513;
    border-radius: 20px;
    padding: 0 15px;

    &:focus{
        border: 3px solid #8B4513;
        outline-width: 0;
    }
`;


class TextInputForm extends Component {
    constructor(props) {
        super(props);
       

        this.state = {
           
          }
    }

    render() {
        return (
            <Container>
                <Label>{this.props.label}</Label>
                <Form></Form>
            </Container>
        );
    }
}

export default TextInputForm;