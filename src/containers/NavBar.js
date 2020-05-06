import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Menu, Container, Image, Input} from 'semantic-ui-react'

export default class NavBar extends Component{
   currentUser = this.props.currentUser
   loggedIn = !!this.props.currentUser.id
   state = { activeItem: 'homepage' }
   handleItemClick = (e, { name }) => {
     console.log( "name" , name)
    this.setState({ activeItem: name })
  
  }

  handleChange = e => {
    console.log("input", e.target.value)
    this.props.onSearch(e)
  }
  
    
render(){
  const currentUser = this.props.currentUser
  const { activeItem } = this.state
  return (
    <div className={`ui top fixed inverted ${this.props.color} menu`}>
      <Image size='small' src='./logo.png' position="left" />
        <Container>
            {/* <Menu.Item as={NavLink} to="/" name='home'  active={activeItem === 'home'} onClick={this.handleItemClick}/> */}
            <Menu.Item as={NavLink} to="/home" name='home'  active={activeItem === 'homepage'} onClick={this.handleItemClick}/>  
            <Menu.Item as={NavLink} to="/categories" name='categories' active={activeItem === 'categories'} onClick={this.handleItemClick}/>
            <Menu.Item as={NavLink} to="/myProfile" name='my profile' active={activeItem === 'my profile'} onClick={this.handleItemClick}/>
            <Menu.Item as={NavLink} to="/classes" name='Class' active={activeItem === 'Class'} onClick={this.handleItemClick}/>
            <Menu.Item>
             <Input className='icon' value={this.props.search} icon='search' onClick={(e) => this.handleChange(e)}  placeholder='Search...' />
            </Menu.Item>
            {this.props.login ? null : <Menu.Item position='right'>
                 <Button  as={NavLink} to="/Login" name='Log in' active={activeItem === 'Log in'} onClick={this.handleItemClick} style={{ marginLeft: '0.3em' }}>
                Log in
                </Button>
                <Button as='a' as={NavLink} to="/Signup" name='Sign up' active={activeItem === 'Sign up'} onClick={this.handleItemClick} style={{ marginLeft: '0.3em' }}>
                Sign Up
                </Button>
            </Menu.Item>}

       {this.props.login ? <Menu.Item position='right'><p>Welcome</p>  {currentUser.username}</Menu.Item>: null}
       {this.props.login ? <div id="job-header">
            <div style={{width: "33%", height: "48px"}} >
            <div id="profile">
              <img  id= "profile-image" 
              style = {{height: "48px", width: "48px"}}
              src="https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/68/9d/49/689d4905-203d-f90f-d2a0-0f1c596bd484/source/256x256bb.jpg"
              alt="profile-pic"
              />
              </div></div>
              </div>: null }
        </Container>
    
      
    </div>
  );
};
}
