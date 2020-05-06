import React from 'react'
import { Card, Image, Icon, Label, Menu, Table } from 'semantic-ui-react'
import { api } from '../services/api'
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import Map from './Map'



class CardInfoComponent extends React.Component {
    //   prevent asynchronous, if the props from parents container didn't finish rendering data, this method below will help sending data back 
    componentDidMount() {
        api.categories.getCategories().then(data => {
            console.log(data)
            data.forEach(category => {
                if (category.id == this.props.match.params.id) {
                    // api.appointments.getCategoryAppointments(category).then(data => { this.props.onShowDetail({ category: category, appointments: data }) })
                    this.props.onShowDetail(category)

                }
            })
        })

    }

    handleClick = (e, appointment) => {
        this.props.onAddAppointment(appointment)
    }

   

    render() {
        return (
            <>
            {this.props.selectedCategory!==null?<>
            
            
                    <div style={{margin: '10rem 0 0 0'}}>
                    <div style={{width: '50%', float: 'left'}}>
                    <Card style={{margin: '0rem 0 0 12rem'}}>
                        <Image src={this.props.selectedCategory.image} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{this.props.selectedCategory.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>Description</span>
                            </Card.Meta>
                            <Card.Description>
                                {this.props.selectedCategory.description}
                            </Card.Description>
                        </Card.Content>
                        
                    </Card>
                    </div>

                    <div className="App" style={{width: '50%', float: 'right', margin: '0 0 8rem 0'}}>
                    <Map categories={this.props.categories}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDkhgpXKUb91RTLLIu5YkRy5_DVVA5x7ng&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px`, width: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                    </div>
                    </div>

            
                    <div>
                            <Table celled style={{width: '80%', margin: 'auto'}}>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Class Name</Table.HeaderCell>
                                <Table.HeaderCell>Time</Table.HeaderCell>
                                <Table.HeaderCell>Class Duration</Table.HeaderCell>
                                <Table.HeaderCell>Location</Table.HeaderCell>
                                <Table.HeaderCell>Instructor</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Add to my Card</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>
                            <Table.Body style={{}}>
                            
                        
                            {this.props.selectedCategory.appointments.map(appointment =>{
                            return (
                                <Table.Row>
                                <Table.Cell>{appointment.name}</Table.Cell>
                                <Table.Cell>{appointment.time}</Table.Cell>
                                <Table.Cell>{appointment.duration}</Table.Cell>
                                <Table.Cell>{appointment.location}</Table.Cell>
                                <Table.Cell>{appointment.instructor}</Table.Cell>
                                <Table.Cell>{appointment.status}</Table.Cell>
                                <Table.Cell><button onClick={(e) => this.handleClick(e, appointment)} >Add to Card</button></Table.Cell>
                                </Table.Row>
                            )
                            })
                            }
                            
                            </Table.Body>
                            <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='9'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                                </Table.HeaderCell>
                                </Table.Row>
                                </Table.Footer>
                                </Table>
                    </div>
            
            </>:null}
            
            </>
        )
    }
}
export default CardInfoComponent

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDkhgpXKUb91RTLLIu5YkRy5_DVVA5x7ng'
// })(MapContainer);

// const mapStyles = {
//     width: '350%',
//     height: '35%',
// };
//another way to achieve


// CardInfoComponent.defaultProps = {
//     selectedCategory: {
//         name: "",
//         appointments: []
//     }
// }