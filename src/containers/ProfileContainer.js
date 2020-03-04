import React, { Component } from 'react';
import { Image, Card, Icon, Label, Menu, Table, Item, Grid , Container, Button, Form } from 'semantic-ui-react';
import { api } from '../services/api'
import ClassInfoComponent from "../components/ClassInfoComponent";
import BlogComponent from "../components/BlogComponent"
import ProfileEditForm from "../components/ProfileEditForm"
import { Link } from 'react-router-dom'



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
                    <BlogComponent blog={blog} onclick={this.props.deleteBlog}/>
                </div>
            )
        }

        )

    }

    displayCreateNew = (props) => {
        if(this.props.showUser.isTeacher)
        return (
           
                <Link to={`/create-appointment`}>
                <Button animated='fade' link>
                
                <Button.Content visible>Create A New Class</Button.Content>
                
                </Button>
                </Link>
        )
        else 
        return(null)
    }

    displayCreateCategory = (props) => {
        if(this.props.showUser.isTeacher)
        return (
           
                <Link to={`/create-categories`}>
                <Button animated='fade' link>
                
                <Button.Content visible>Create Category</Button.Content>
                
                </Button>
                </Link>
        )
        else 
        return(null)
    }

    displayStudents = () => {
        
        if(this.props.showUser.isTeacher)
        return(
            
            <p>student that joined your class </p>
            
            

        )
        else 
        return (null)
    }

    
    // editProfile = () => {
    //     return(
    //         <profileEditForm onEditProfile={this.props.onEditProfile} />
    //     )
    // }
    
   
    
    

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
                   
                    <Button animated>
                    <Button.Content visible>Next</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                    </Button>
                    <Button animated='vertical'>
                    <Button.Content hidden>Shop</Button.Content>
                    <Button.Content visible>
                        <Icon name='shop' />
                    </Button.Content>
                    </Button>
                    <Link to={`/edit-profile/${this.props.showUser.id}`}>
                    <Button animated='fade' link>
                    
                    <Button.Content visible>editProfile</Button.Content>
                    <Button.Content hidden>confirm</Button.Content>
                    </Button>
                    </Link>
                    <Link to={`/create-blog/${this.props.showUser.id}`}>
                    <Button animated='fade' link>
                    
                    <Button.Content visible>Create A New Blog</Button.Content>
                    <Button.Content hidden>go ~</Button.Content>
                    </Button>
                    </Link>

                   {this.displayCreateNew()}

                    {this.displayStudents()}
                    {this.displayCreateCategory()}
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
