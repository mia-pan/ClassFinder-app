import { api } from '../services/api'
import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button, Form } from 'semantic-ui-react'
import S3FileUpload from 'react-s3'

const config = {
    bucketName: 'class-finder-project',
    region: 'us-west-2',
    accessKeyId: 'AKIAJS4DM2CHMQC4EYDQ',
    secretAccessKey: '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'
}


class CreateBlog extends Component {

    constructor(){
        super()
        this.state = {
            title: "",
            story: "",
            image: "",
        }
    }
   

   
    
    upload = (e) => {
         S3FileUpload.uploadFile(e.target.files[0], config)
         .then(data => {
           this.setState({
             image: data.location
           })
         })
         .catch((err)=>{
             alert(err)
         })
    }
    
 

    handleSubmit = e => {
       
        const id = this.props.match.params.id

        console.log("userId", id)
        this.props.onCreateBlog(this.state, id)
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
                        <label>title</label>
                        <input placeholder='title' name="title" value={this.state.title} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>story</label>
                        <input placeholder='story' name="story" value={this.state.story} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>image</label>
                        <input placeholder='image' name="image" value={this.state.image} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Upload your own Images</label>
                        <input type="file" placeholder='image' name="image" onChange={this.upload}/>
                        </Form.Field>
                        <Button type='submit'>Create</Button>
                    </Form>
                    </Container>
                    </div>
    )
}


}
export default CreateBlog;