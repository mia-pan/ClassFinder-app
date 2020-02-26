import React from "react";
import { api } from "../services/api";
// import { Route, Switch } from "react-router-dom";

class CategoriesCardContainer extends React.Component {

    constructor(){
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
          this.props.history.push("/login");
        } else {
          api.auth.getCurrentUser().then(user => {
            // console.log(user);
            if (user.error) {
              this.props.history.push("/login");
            } else {
              api.categories.getCategories ().then(data => {
                this.setState({
                    categories: data
                });
              });
            }
          });
        }
      }

    render() {
        return (
            <div>categories</div>
        )
    }

}

export default CategoriesCardContainer;