import React, { Component } from 'react'

import ClassDetail from "../components/ClassDetail";
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button, Form } from 'semantic-ui-react';
import SearchBar from '../components/SearchBar';

class Class extends Component {

    // constructor(){
    //     super()
    //     this.state = {
    //         allAppointments: ''
    //     }
    // }
    componentDidMount() {
        this.props.fetchAppointments()
    }

    displayClasses = (props) => {
         
        return this.props.appointments.map(appointment => {
            return(

                <div><ClassDetail appointment={appointment}  {...props} onAddAppointment={this.props.onAddAppointment}/></div>
            )
             
         })
    }

    displaySort = (props) => {
            return this.props.appointments.map(appointment => {
        return(
            <SearchBar appointment={appointment} onSortByName={this.props.onSortByName} onSortByStatus={this.props.onSortByStatus}  handleFilter={this.props.handleFilter} />
           
        )
        })
    }

    // mappingClasses = () => {
    //    return  this.state.allAppointments.map(appointment => {
    //        return(
    //             <div><ClassDetail appointment={appointments} /></div>)
            
    //     })
    // }
 
    render () {
        return(
            // <div style={{  paddingTop:"70px"}}>
            //     {this.displayClasses()}
            // </div>
        <div style={{paddingTop: '70px'}} > 
            
            <SearchBar appointments={this.props.appointments} onSortByName={this.props.onSortByName} onSortByStatus={this.props.onSortByStatus}  onFilterAppointment={this.props.handleFilter} />
          {/* <div>{this.displaySort()}</div> */}
          <div>
                <Container style={{ paddingTop:"100px"}} >
                <Card.Group centered>{this.displayClasses()}</Card.Group>  

                </Container>
          </div>
        </div>
        )
    }
}
export default Class;