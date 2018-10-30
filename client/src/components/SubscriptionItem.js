import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
    display: inline-block;
    padding: 20px;
    height: 250px;
    width: 250px;
    font-size: 18px;
    position: relative;
    top: 5px;
    opacity: 1;
    margin: 10px;
    -moz-box-shadow: 5px 5px 7px #212121;
    -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    -moz-transition: -moz-transform .15s linear;
    -o-transition: -o-transform .15s linear;
    -webkit-transition: -webkit-transform .15s linear; 
    background-color: ${(props) => props.color};
    color: white;
    border-radius: 20px;
    
    &:hover{
      -moz-box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.6);
      -webkit-box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.6);
      box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.6);
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      position: relative;
      z-index: 5; 
    }
`;

const LogoContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const Logo = styled.img`
    width: 80px;
    height: 80px;
    margin: 20px auto;
`;

const Detail = styled.div`
    text-align: left;
    margin-left: 50px;
    margin-top: 20px;
    line-height: 1.5;
`;

const Name = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

const PaymentCycle = styled.div`

`;

const Price = styled.div`

`;

const AdditionalNotes = styled.div`

`;


class SubscriptionItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
          }
    }

    render() {
        return (
            <Container color={this.props.color}>
                <LogoContainer>
                    <Logo src={this.props.logo} />
                </LogoContainer>
                    <Name>{this.props.name}</Name>
                <Detail>
                    <PaymentCycle>Payment Cycle: {this.props.paymentCycle}</PaymentCycle>
                    <Price>Price: {this.props.price}/cycle</Price>
                    <AdditionalNotes>Notes: {this.props.additionalNotes}</AdditionalNotes>
                </Detail>
            </Container>
        );
    }
}

export default SubscriptionItem;