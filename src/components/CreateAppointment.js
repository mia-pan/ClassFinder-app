import { api } from '../services/api'
import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button, Form, Dropdown } from 'semantic-ui-react'
import S3FileUpload from 'react-s3'

// const config = {
//     bucketName: 'class-finder-project',
//     region: 'us-west-2',
//     accessKeyId: 'AKIAJ3SMCFMF2PW37WWQ',
//     secretAccessKey: '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'
// }


class CreateAppointment extends Component {

    constructor(){
        super()
        this.state = {
            name: "",
            time: "",
            duration: "",
            location: "",
            instructor: "",
            status: "",
            category_id: "",
        }
    }
   

   
    
    // upload = (e) => {
    //      S3FileUpload.uploadFile(e.target.files[0], config)
    //      .then(data => {
    //        this.setState({
    //          image: data.location
    //        })
    //      })
    //      .catch((err)=>{
    //          alert(err)
    //      })
    // }
    
 

    handleSubmit = e => {
       
        const id = this.props.match.params.id

        console.log("userId", id)
        this.props.onCreateBlog(this.state, id)
        this.props.history.push('/myProfile')
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
   
    options = (props) => {

        // { key: 1, text: {this.props.categoriesInfo}, value: 1 },
        // { key: 2, text: 'Choice 2', value: 2 },
        // { key: 3, text: 'Choice 3', value: 3 },
        const categoriesInfo = this.props.categoriesInfo
        const length = categoriesInfo.length
        console.log("length", length, "categoriesInfo", categoriesInfo)
        const output = []
        let key=0
        while(key < length) {
            output[key] = {text:this.props.categoriesInfo[key].name, value:key+1};
            key++
        }

        return output;
    }


render() {
    return(
        <div>
        <Container style={{ margin: '12rem 0 0 12rem' }}>
    <Form onSubmit={e => this.handleSubmit(e) }>
                        <Form.Field>
                        <label>name</label>
                        <input placeholder='name' name="name" value={this.state.name} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>time</label>
                        <input placeholder='time' name="time" value={this.state.time} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>duration</label>
                        <input placeholder='duration' name="duration" value={this.state.duration} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>location</label>
                        <input placeholder='location' name="location" value={this.state.location} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>instructor</label>
                        <input placeholder='instructor' name="instructor" value={this.state.instructor} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <label>status</label>
                        <input placeholder='status' name="status" value={this.state.duration} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                        <Dropdown clearable options={this.options()} selection />
                        </Form.Field>

                    
                        
                        <Button type='submit'>Create</Button>
                    </Form>
                    </Container>
                    </div>
    )
}


}
export default CreateAppointment;