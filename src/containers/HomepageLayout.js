import React, { Component } from "react";
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'

const getWidth = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}



const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h1'
        content='Class Finder '
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Do what you love, Always Learning.'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button classname="homepageButton" primary size='huge' color='orange' background-color='orange'>
        Where to begin?
        <Icon name='right arrow' />
      </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

export default class HomepageLayout extends Component{
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <>
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              
                
             
              <HomepageHeading />
            </Segment>
          </Visibility>
  
          {children}
        </Responsive>



<Segment style={{ padding: '8em 0em' }} vertical>
  <Grid container stackable verticalAlign='middle'>
    <Grid.Row>
      <Grid.Column width={8}>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Base on your preferences
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          We can give your superpowers to do things that they never thought possible.
          Let us delight your customers and empower your needs
        </p>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Popular venues near you
        </Header>
        <p style={{ fontSize: '1.33em' }}>
      Find the sports that you likes
        </p>
      </Grid.Column>
      <Grid.Column floated='right' width={6}>
        <Image bordered rounded size='large' src='data:image/jpeg;base64,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' />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column textAlign='center'>
        <Button size='huge'>Check Them Out</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</Segment>

<Segment style={{ padding: '0em' }} vertical>
  <Grid celled='internally' columns='equal' stackable>
    <Grid.Row textAlign='center'>
      <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
        <Header as='h3' style={{ fontSize: '2em' }}>
          "Class Pass"
        </Header>
        <p style={{ fontSize: '1.33em' }}>Always Learning</p>
      </Grid.Column>
      <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Top Categories
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          
          <b></b> yoga kickboxing rock climbing 
        </p>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</Segment>

<Segment style={{ padding: '8em 0em' }} vertical>
  <Container text>
    <Header as='h3' style={{ fontSize: '2em' }}>
    Lorem Ipsum
    </Header>
    <p style={{ fontSize: '1.33em' }}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    </p>
    <Button as='a' size='large'>
      Read More
    </Button>
    </Container>
    </Segment>
   

       

</>
      )
    }
}
  
HomepageLayout.propTypes = {
    children: PropTypes.node,
}
