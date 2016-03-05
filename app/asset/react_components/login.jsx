import React from 'react';
import req from 'superagent';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.setId = this.setId.bind(this);
    this.setPw = this.setPw.bind(this);
  }
  signIn() {
    req
      .post('http://murmuring-ridge-75162.herokuapp.com/api/signin')
      .send(this.state)
      .end((err, res) => {
        console.log(res);
      });
  }
  signUp() {
    req
      .post('http://murmuring-ridge-75162.herokuapp.com/api/signup')
      .send(this.state)
      .end((err, res) => {
        console.log(res);
      });
  }
  setId(e) {
    this.setState({ username: e.target.value });
  }
  setPw(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    return (
      <div>
        <input type='text' value={this.state.id} onChange={this.setId} />
        <input type='password' value={this.state.password} onChange={this.setPw} />
        <button onClick={this.signIn}> 로그인 </button>
        <button onClick={this.signUp}> 가입 </button>
      </div>
    );
  }
}
