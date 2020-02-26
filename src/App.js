import React from 'react';
import './App.css';
// import HomepageLayout from './containers/HomepageLayout'
// import ProfileContainer from './containers/ProfileContainer'
// import About from './containers/About'
import CategoriesCardContainer from "./containers/CategoriesCardContainer";
import { api } from "./services/api";
import Login from "./containers/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from "./containers/NavBar";
import Signup from './containers/Signup';


class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
     
      // name: "",
      // email: "",
      // loggedIn: false,
      auth: {
        user: {}
      }
    };
  }

//  setUserState = (data) => {
//    this.setState({
//     name: data.name,
//     email: data.email,
//     loggedIn: true,
//    })
//  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        // console.log(user)
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ auth: updatedState });
      });
    }
  }

  // signup = user => 
  // this.postUser(user)
  // .then(this.login)

  login = data => {
    const updatedState = { ...this.state.auth, user: {id: data.id,  username: data.username} };
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} } });
  };

  //Fetches: 
  // getUser = username => 
  // fetch('http://locahost:3000/users/${username}')
  // .then(res => res.json())

  // postUser = user => 
  //   fetch("http://localhost:3000/api/v1/users", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json", "Accept": "application/json"},
  //     body: JSON.stringify(user)
  //   })
  // .then(res => res.json())
 



  render() {
  return (
    <div className="App">
      <Router>
        <Route 
          path='/'
          render={() => 
            <NavBar
              
              title="ClassFinder"
              description="our app"
              icon="class finder"
              currentUser={this.state.auth.user}
              handleLogout={this.logout}
            />
          }
        />
          <Route
                exact
                path="/login"
                render={props => <Login {...props} onLogin={this.login}  />}
          />

         <Route
                exact
                path="/Signup"
                render={props => <Signup {...props}  />}
          />  

          <Route exact
          path="/categories"
          render={props => <CategoriesCardContainer {...props}/>}
           />
      </Router>
          
    </div>
  );
  }

}

export default App;
