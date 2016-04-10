import React from 'react';
import req from 'superagent';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      session: '',
    };
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.setId = this.setId.bind(this);
    this.setPw = this.setPw.bind(this);    
  }

  signIn() {
    req
      .post('/api/signin')
      .send(this.state)
      .end((err, res) => {
        console.log(res);
        this.props.SOCKET.emit('storeClientInfo', { customId:res.body._id });
        this.setState({session: true});
        this.props.setAuth(res.body._id);
        console.log(this.props.auth);

      });
  }
  signUp() {
    this.setState({ session: this.props.mySession});
    console.log(this.state);
    req
      .post('/api/signup')
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
    // const panelSignUp = {
    //     <input type='text' value={this.state.id} onChange={this.setId} />
    //     <input type='password' value={this.state.password} onChange={this.setPw} />
    //     <input type='text' value={this.state.session} />
    //     <button onClick={this.signUp}> 가입 </button>
    // }
    // const panelSignIn = {
    //     <input type='text' value={this.state.id} onChange={this.setId} />
    //     <input type='password' value={this.state.password} onChange={this.setPw} />
    //     <input type='text' value={this.state.session} />
    //     <button onClick={this.signIn}> 로그인 </button>
    // }
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
