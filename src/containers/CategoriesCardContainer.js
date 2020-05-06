import React from "react";
import { api } from "../services/api";
import { Route, Switch } from "react-router-dom";
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react'
import CategoriesCard from "../components/CategoriesCard";

class CategoriesCardContainer extends React.Component {

  // constructor(){
  //     super();
  //     this.state = {
  //         categories: []
  //     }
  // }

  // componentDidMount() {
  //     if (!localStorage.getItem("token")) {
  //       this.props.history.push("/login");
  //     } else {
  //       api.auth.getCurrentUser().then(user => {
  //         // console.log(user);
  //         if (user.error) {
  //           this.props.history.push("/login");
  //         } else {
  //           api.categories.getCategories ().then(data => {
  //             this.setState({
  //                 categories: data
  //             });
  //           });
  //         }
  //       });
  //     }
  //   }

  renderCards = () => {
    return this.props.showCategories.map(category => {
      // console.log(category)

      return (
       
        <Grid.Column>
          <CategoriesCard history={this.props.history} category={category} onClick={this.props.onClick} key={category.id} onShowDetails={this.props.onShowDetails} onShowDetailsWithoutLogin={this.props.showCategoriesWithoutLogin}/>
        </Grid.Column>
        

      )
    })
  }

  render() {
    return (
      <div className='categoryDiv'  style={{ margin: '70rem, 70, 50, 90rem', paddingTop:"100px" }}>
        {/* {console.log(this.props)} */}
        <Container style={{ margin: '70rem, 70, 50, 90rem' }}>
        <Grid  centered>
        <Grid.Row columns={4} >

            {this.renderCards()}

         </Grid.Row>
        </Grid>
        </Container>
      </div>
    )


  }

}

export default CategoriesCardContainer;