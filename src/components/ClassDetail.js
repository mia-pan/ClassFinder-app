import React, { Component } from 'react';
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button, Form } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom'
class ClassDetail extends Component {
    
   
   
   

    

    render() {
        return (
            
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
        <div className='ui one buttons'>
          
          <Button basic color='green' as={NavLink} to="/myProfile" onClick={() => this.props.onAddAppointment(this.props.appointment)}>
           Add to My Card
          </Button>
        </div>
      </Card.Content>
    </Card>
    
    
    
        )
    }

}
export default ClassDetail;

// this.props.appointment.name