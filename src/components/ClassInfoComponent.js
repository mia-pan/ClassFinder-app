import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button } from 'semantic-ui-react'
import { api } from '../services/api'
class ClassInfoComponent extends Component {

   
    
    render(){
        return(
            <Card.Group>
            <Card>
            <Card.Content>
            <Card.Header>Class Name: {this.props.appointment.name}</Card.Header>
            <Card.Meta>Class Time: {this.props.appointment.time} </Card.Meta>
            <Card.Description>
            Class Duration:{this.props.appointment.duration} 
            </Card.Description>
            <Card.Description>
            Class Location:{this.props.appointment.location}
            </Card.Description>
            <Card.Description>
            Class Instructor:{this.props.appointment.instructor}
            </Card.Description>
            <Card.Description>
            Class Status:{this.props.appointment.status}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Update
          </Button>
          <Button basic color='red' onClick={() => this.props.onclick(this.props.appointment)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
    </Card.Group> 
        )
    }

}
export default ClassInfoComponent;
