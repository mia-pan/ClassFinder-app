import React, { Component } from 'react'
import { Marker } from "react-google-maps";
import { icon }  from 'semantic-ui-react'


export default class CategoryMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
         
        >
        </Marker>
    );
  }
}