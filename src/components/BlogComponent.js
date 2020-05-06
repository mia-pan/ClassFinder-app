import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button } from 'semantic-ui-react'

class BlogComponent extends Component {

    render(){
        return(
            <Card style={{margin: '2rem'}}>
                            <Image src={this.props.blog.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{this.props.blog.title}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Description</span>
                                </Card.Meta>
                                <Card.Description>
                                    {this.props.blog.story}
                                </Card.Description>
                                
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                       Edit
                                    </Button>
                                    <Button basic color='red' onClick={() => this.props.onclick(this.props.blog)}>
                                        Delete
                                    </Button>
                                    </div>
                            </Card.Content>
                            </Card>


        )
    }
}
export default BlogComponent;
