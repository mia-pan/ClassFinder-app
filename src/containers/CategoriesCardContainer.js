import React from "react";
import { api } from "../services/api";
import { Route, Switch } from "react-router-dom";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
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
          <CategoriesCard history={this.props.history} category={category} key={category.id} onShowDetails={this.props.onShowDetails} onShowDetailsWithoutLogin={this.props.showCategoriesWithoutLogin}/>
        </ Grid.Column>

      )
    })
  }

  render() {
    return (
      <div >
        {/* {console.log(this.props)} */}
        <Grid >
          <Grid.Row columns={2} >

            {this.renderCards()}

          </Grid.Row>
        </Grid>
      </div>
    )


  }

}

export default CategoriesCardContainer;