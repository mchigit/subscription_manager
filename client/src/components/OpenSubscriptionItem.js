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
    -webkit-transition: left 1s; /* Safari */
    transition: left 1s;
    opacity: 0.9;
    border-radius: 15px;
`;

const Title = styled.div`
    font-size: 36px;
    text-align: center;
    margin-top: 50px;
`;

const DetailBox = styled.div`
    margin-left: 20%;
    margin-top: 100px;
    font-size: 16px;
`;

const DetailItem = styled.div`
    margin-top: 20px;
`;



class OpenSubscriptionItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    <Title>Youtube Music</Title>
                    <DetailBox>
                        <DetailItem>Start Date: 2018-03-25</DetailItem>
                        <DetailItem>Recurring Cycle: 30 days</DetailItem>
                        <DetailItem>Next Payment Date: 2018-04-25</DetailItem>
                        <DetailItem>Amount: 15 CAD</DetailItem>
                    </DetailBox>
                </Container>
            </div>
        );
    }
}

export default OpenSubscriptionItem;