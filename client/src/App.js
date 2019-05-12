import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';
import loginBackground from './img/loginBackground.jpg';

import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import CurrentSubscriptions from './components/CurrentSubscriptions.js';
import OpenSubscriptionItem from './components/OpenSubscriptionItem.js';

library.add(faAddressBook);
library.add(faGlasses);
library.add(faCheck);
library.add(faKey);

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

class App extends Component {

  constructor() {
    super();
    this.state = {
        activePage: 'openSubscriptionItem',
        timePassed: false
    };

    this.goToSignUp = this.goToSignUp.bind(this);
    this.timePassed = this.timePassed.bind(this);
  } 

  goToSignUp(){
    this.setState({
      activePage: 'signUp'
    })
  }

  timePassed(){
    this.setState({
      timePassed: true
    })
  }

  createNewSub(){
    this.setState({
      activePage: 'createNewSub'
    })
  }

  render() {
    return (
      <div className="App">
        <Background timePassed={this.state.timePassed}></Background>
        {this.state.activePage === 'signIn' ?
        <SignIn goToSignUp={this.goToSignUp} timePassed={this.timePassed}/> : null
        }
        
        {this.state.activePage === 'signUp' ?
        <SignUp /> : null
        }

        {this.state.activePage === 'currentSubscriptions' ?
        <CurrentSubscriptions /> : null
        }

        {this.state.activePage === 'openSubscriptionItem' ?
        <OpenSubscriptionItem /> : null
        }
      </div>
    );
  }
}

export default App;
