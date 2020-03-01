import React, { Component } from 'react'
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button } from 'semantic-ui-react'
import { api } from '../services/api'
import ClassInfoComponent from "../components/ClassInfoComponent"
import BlogComponent from "../components/BlogComponent"



class ProfileContainer extends Component {

    displayClass = (props) => {
        return this.props.userAppointments.map(appointment => {
            return(
                <div>
                  <ClassInfoComponent appointment={appointment} onclick={this.props.onclick}/>
            </div>
            )
    
        })
    }
    
    displayBlog = (props) => {
        return this.props.userBlogs.map(blog => {
            return(
                <div>
                    <BlogComponent blog={blog}/>
                </div>
            )
        }

        )

    }

    

    render() {
        return (
            <>
            


                <Image style={{ margin: '12rem 0 0 12rem' }} src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" size='small' circular />

                <div style={{ margin: '0 0 0 2rem' }}>
                    <p>Username: {this.props.showUser.username}</p>
                    <p>Email: {this.props.showUser.email}</p>

                    <p>User status:{this.props.showUser.isTeacher ? <p>I am a teacher </p> : <p>I am a student</p>}</p>

              </div>
                
                <div>
                   {this.displayBlog()}
                </div>
                   
              <div>
                   <Item.Group>
                        <Item style={{margin: '12rem 0 0 12rem'}}>
                             {this.props.userCategories.map(category => {
                                 return ( 

                                   <Item.Image size='tiny' src={category.image}  />
                                 )
                             }
                             )} 
              
                             
                        </Item>
                  </Item.Group>
                
                  <div>
                     {this.displayClass()}
                 </div>
              </div>
           </>

            
        )
    }
}
export default ProfileContainer;
