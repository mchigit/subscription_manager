import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import SignUp from './components/SignUp.js';

library.add(faGhost);
library.add(faGlasses);
library.add(faCheck);

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUp />
      </div>
    );
  }
}

export default App;
