import { api } from '../services/api'
import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button, Form } from 'semantic-ui-react'

class ProfileEditForm extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
        }
    }



    handleSubmit = e => {
        const id = this.props.match.params.id
        this.props.onEditProfile(this.state, id)
        this.props.history.push('/myProfile')
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }


render() {
    return(
        <div>
        <Container style={{ margin: '12rem 0 0 12rem' }}>
    <Form onSubmit={e => this.handleSubmit(e) }>
                        <Form.Field>
                        <label>username</label>
                        <input placeholder='username' name="username" value={this.state.username} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Email</label>
                        <input placeholder='email' name="email" value={this.state.email} onChange={this.handleChange}/>
                        </Form.Field>
                        {/* <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' />
                    </Form.Field> */}
                        <Button type='submit'>Confirm Change</Button>
                    </Form>
                    </Container>
                    </div>
    )
}


}
export default ProfileEditForm;
