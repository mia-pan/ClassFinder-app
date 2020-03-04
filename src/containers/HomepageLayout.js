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
      )
    }
}
  
HomepageLayout.propTypes = {
    children: PropTypes.node,
}