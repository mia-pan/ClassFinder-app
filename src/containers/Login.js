import React from 'react';
import { api } from '../services/api';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    console.log("trying to log in")
    e.preventDefault();
    // console.log(this.state)
    api.auth.login(this.state.fields).then(res => {
      console.log("LOGIN.js", res)
      if (!res.error) {
        this.props.onLogin(res);
        // const updateState = { ...this.state.auth, user: res };
        // localStorage.setItem("token", res.jwt)
        // console.log('updateState', updateState)
        this.props.onLogin(res);
        this.props.history.push('/');
      } else {
        // this.setState({ auth: updateState });
        alert("error")

      }
    });
  };

  render() {

    // const responseFacebook = (response) => {
    //     fetch("http://localhost:3000/users/", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({
    //             name: response.name,
    //             email: response.email,
    //             password: ""
    //         })
    //     }).then(res => res.json()).then(data => this.props.setUserState(data))
    // }

    const { fields } = this.state;

    return (

      //     <div className="App">
      //     <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
      //   <FacebookLogin
      //     appId="" //APP ID NOT CREATED YET
      //     fields="name,email,picture"
      //     callback={responseFacebook}
      //   />
      //   <br />
      //   <br />
      //   <GoogleLogin
      //     clientId="276922702592-0ofjuvdarbsrrbnvuimoc0315m9q7d4p.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
      //     buttonText="LOGIN WITH GOOGLE"
      //     onSuccess={responseGoogle}
      //     onFailure={responseGoogle}
      //   />
      //   </div>


      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
            <Image src='/logo.png' /> Log-in to your account
         </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' value={fields.username} name="username"
                onChange={this.handleChange} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                name="password"
                type='password'
                value={fields.password}
                onChange={this.handleChange}
              />


                <Button color='orange' fluid size='large'>
                  Login
                </Button>

            </Segment>
          </Form>
          <Message>
            New to us? <Link to='/signup'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>


    )
  }
}


export default Login;

