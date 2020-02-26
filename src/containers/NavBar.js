import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Menu, Container } from 'semantic-ui-react'

export default class NavBar extends Component{
   currentUser = this.props.currentUser
   loggedIn = !!this.props.currentUser.id
   state = { activeItem: 'home' }
   handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }
  
    
render(){
  const { activeItem } = this.state
  return (
    <div className={`ui top fixed inverted ${this.props.color} menu`}>
        <Container>
            <Menu.Item as={NavLink} to="/" name='home'  active={activeItem === 'home'} onClick={this.handleItemClick}/>
               
    
            {loggedIn ?(<Menu.Item as={NavLink} to="/categories" name='categories' active={activeItem === 'categories'} onClick={this.handleItemClick}/>) : null}
            <Menu.Item as={NavLink} to="/class" name='class' active={activeItem === 'class'} onClick={this.handleItemClick}/>
            <Menu.Item as={NavLink} to="/myProfile" name='my profile' active={activeItem === 'my profile'} onClick={this.handleItemClick}/>
            <Menu.Item position='right'>
                <Button as={NavLink} to="/Login" name='Log in' active={activeItem === 'Log in'} onClick={this.handleItemClick} style={{ marginLeft: '0.5em' }}>
                Log in
                </Button>
                <Button as='a' as={NavLink} to="/Signup" name='Sign up' active={activeItem === 'Sign up'} onClick={this.handleItemClick} style={{ marginLeft: '0.5em' }}>
                Sign Up
                </Button>
            </Menu.Item>
        </Container>
    
      
    </div>
  );
};
}
