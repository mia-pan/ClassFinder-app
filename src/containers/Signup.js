import React, {Component} from 'react';
import { Form, Button, Grid, Header, Dropdown, Message, Segment, Image} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import { api } from '../services/api';

const options = [
  { key: 't', text: 'Teacher', value: true },
  { key: 'n', text: 'Not a Teacher', value: false },
 
]

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    isTeacher: false
  }

  

  handleChange = e => 
    this.setState({[e.target.name]: e.target.value})

  handleClick = () => {
    let {username, email, password} = this.state
    // console.log("username", username)
    if (username && email && password) {
      api.user.signUp({user: this.state}).then(user => {
        console.log(user)
        if (!user.error) {
          this.props.history.push("/login")
        }
      })
    }

  }

  handleUserChange = (e, value) => {
    //   console.log(value.value)
    this.setState({...this.state, isTeacher: value.value}
    )
}


  render() {
    let {username, email, password, isTeacher} = this.state
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
              <Image src='/logo.png' />Create your account 
            </Header>
            <Form size='large' autoComplete="off">
            <Segment stacked>
              <Form.Input 
                fluid 
                icon='user circle' 
                iconPosition='left' 
                placeholder='Username'
                name="username"
                value={username} 
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='email'
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='password'
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <Dropdown
                fluid
                placeholder= 'Select User Type'
                selection
                options={options}
                value={this.state.isTeacher}
                onChange={this.handleUserChange}
            />
            <br></br>
           
              <Button 
                color='orange' 
                fluid size='large'
                onClick={this.handleClick}
              >
                Sign up 
              </Button>
              </Segment>
            </Form>

            <Message>
            If you already have an account, please <Link to='/login'>Log In</Link>
           </Message>
          </Grid.Column>
        </Grid>
      
    )
  }
}
  
export default Signup