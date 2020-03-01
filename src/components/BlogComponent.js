import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button } from 'semantic-ui-react'

class BlogComponent extends Component {

    render(){
        return(
            <Card style={{margin: '12rem 0 0 12rem'}}>
                            <Image src={this.props.blog.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{this.props.blog.title}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Description</span>
                                </Card.Meta>
                                <Card.Description>
                                    {this.props.blog.story}
                                </Card.Description>
                            </Card.Content>
                            </Card>


        )
    }
}
export default BlogComponent;
