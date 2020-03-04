import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Menu, Container, Image, Input, Segment, Grid, List, Header, Divider} from 'semantic-ui-react'


export default class Footer extends Component{

  handleClick = (props) => {
    this.props.onLogout()
  }


    render(){
        return(
            <div>
                 <Segment inverted style={{ margin: '5em 0em 0em', padding: '5em 0em' }} vertical>
          <Container textAlign='center'>
            <Grid columns={3} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Class Finder ' />
                  <List link inverted>
                    
                    <List.Item as={NavLink} to="/About">About</List.Item>
                    <List.Item as='a'>Contact</List.Item>
                    <List.Item as={NavLink} to="/home" onClick={this.handleClick} to="/home" >Log Out </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content=' Things to do' />
                  <List link inverted>
                  <List.Item as='a'>Shop</List.Item>
                  <List.Item as='a'>Guidelines</List.Item>                                       
                  <List.Item as='a'>Become an instructor</List.Item>              
                  </List>
                </Grid.Column>
                
                <Grid.Column>
                  <Header inverted as='h4' content='Class Finder' />
                  <p>
                    Always Learning ! Do What your Love! 
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image src='/logo.png' centered size='mini' />
            <List horizontal inverted divided link size='small'>
              <List.Item as='a' href='#'>
                Site Map
              </List.Item>
              <List.Item as='a' href='#'>
              Made with ♥ From Mia pan
              </List.Item>
              <List.Item as='a' href='#'>
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
            </div>
        )
    }
}