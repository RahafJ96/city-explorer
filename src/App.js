import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer.js';
import Main from './components/Main.js';

class App extends React.Component {

  render() {
    return(
      <>
        <Header />
        <Main />
        <Footer />
      </>
    )
  }
}

export default App;