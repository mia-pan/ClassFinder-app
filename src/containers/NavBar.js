import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Menu, Container, Image } from 'semantic-ui-react'

export default class NavBar extends Component{
   currentUser = this.props.currentUser
   loggedIn = !!this.props.currentUser.id
   state = { activeItem: 'home' }
   handleItemClick = (e, { name }) => {
     console.log( "name" , name)
    this.setState({ activeItem: name })
  
  }
  
    
render(){
  const { activeItem } = this.state
  return (
    <div className={`ui top fixed inverted ${this.props.color} menu`}>
      <Image size='small' src='./logo.png' position="left" />
        <Container>
            <Menu.Item as={NavLink} to="/" name='home'  active={activeItem === 'home'} onClick={this.handleItemClick}/>
               
    
            <Menu.Item as={NavLink} to="/categories" name='categories' active={activeItem === 'categories'} onClick={this.handleItemClick}/>
            <Menu.Item as={NavLink} to="/myProfile" name='my profile' active={activeItem === 'my profile'} onClick={this.handleItemClick}/>
            <Menu.Item as={NavLink} to="/category_details/:id" name='Class' active={activeItem === 'Class'} onClick={this.handleItemClick}/>
            <Menu.Item position='right'>
                <Button  as={NavLink} to="/Login" name='Log in' active={activeItem === 'Log in'} onClick={this.handleItemClick} style={{ marginLeft: '0.3em' }}>
                Log in
                </Button>
                <Button as='a' as={NavLink} to="/Signup" name='Sign up' active={activeItem === 'Sign up'} onClick={this.handleItemClick} style={{ marginLeft: '0.3em' }}>
                Sign Up
                </Button>
            </Menu.Item>
        </Container>
    
      
    </div>
  );
};
}
