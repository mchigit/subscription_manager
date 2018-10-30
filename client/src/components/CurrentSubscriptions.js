import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import photoshopIcon from '../img/photoshopIcon.svg';
import _ from 'lodash';

import SubscriptionItem from './SubscriptionItem.js';

import allData from '../data/data.json';


const Container = styled.div`
    background-color: #D3D3D3;
    position: fixed;
    width: 1200px;
    left: 50%;
    margin-left: -600px;
    height: 100%;
    z-index: 15;
    opacity: 0.9;
    overflow: scroll;
    margin-bottom: 200px;
`;

const Title = styled.div`
    text-align: center;
    margin-top: 100px;
`;

const Subscriptions = styled.div`
    text-align: center;
    width: 1000px;
    margin: 0 auto 200px auto;
`

const TestImg = styled.img`
    height: 100px;
    width: 100px;
`;

class CurrentSubscriptions extends Component {
    constructor(props) {
        super(props)

        this.state = {
          }
    }

    render() {
        return (
                <Container>
                    <Title>
                        <h1>Current Subscriptions</h1>
                    </Title>
                    <Subscriptions>
                    {_.map(allData, function(data, index){
                        var color = index%2 == 0 ? "#B87155" : "#df9f9f";
                        return(
                        <SubscriptionItem color={color} logo={photoshopIcon} name={data.name} paymentCycle={data.paymentCycle} price={data.price} additionalNotes={data.additionalNotes}/>
                        )
                    })}         
                    </Subscriptions>
                </Container>
        );
    }
}

export default CurrentSubscriptions;