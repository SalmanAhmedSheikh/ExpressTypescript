import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class App extends Component {
  // state={username:''};

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      encryptdata: '',
      decryptdata: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDecryptClick = this.handleDecryptClick.bind(this);
  }

  handleChange(event) {
    console.log('event.target.value', event.target.value)
    this.setState({ username: event.target.value });
  }


  setMyValue() {
    this.setState = {
      username: this.value
    }

  }

  handleClick() {
    console.log('this.state.username Encrypt', this.state.username);
    axios.post('http://localhost:3000/Encryption', { userdata: this.state.username })
      .then(response => this.setState({ encryptdata: response.data }))
  }


  handleDecryptClick() {
    console.log('this.state.username Decrypt', this.state.username);
    axios.post('http://localhost:3000/Decryption', { userdata: this.state.username })
      .then(response => this.setState({ decryptdata: response.data }))
  }

  render() {
    return (
      <div className='button__container'>
        <input width="100px" height="40px"
          type="text"
          name="Encryption"
          id="txtEncryption"
          value={this.state.username} onChange={this.handleChange}
        />
        &nbsp;&nbsp;
        <button className='button' onClick={this.handleClick}>Encrypt Data</button>&nbsp;&nbsp;
        <button className='button' onClick={this.handleDecryptClick}>Decrypt Data</button>


        <p color="red">{this.state.encryptdata}</p>



        <p color="red">{this.state.decryptdata}</p>


      </div>
    )
  }
}
export default App


