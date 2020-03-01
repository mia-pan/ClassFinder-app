import React from 'react';
import './App.css';
// import HomepageLayout from './containers/HomepageLayout'
import ProfileContainer from './containers/ProfileContainer'
// import About from './containers/About'
import CategoriesCardContainer from "./containers/CategoriesCardContainer";
import CardInfoComponent from './components/CardInfoComponent'
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

        user: {
          id: null,
          username: null,
          email: null,
          isTeacher: null
        },
      },
      categories: [],
      blogs: [],
      appointments: [],
      selectedCategoryDetail: null,
      
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
    // this.fetchCategories()
    const token = localStorage.getItem("token");
    if (token) {

      console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(data => {
        console.log("login data", data)
        const updatedState = { ...this.state.auth, user: data.user };
        this.setState({ auth: updatedState, categories: data.categories, blogs: data.blogs, appointments: data.appointments });
      });
    }
  }

  // signup = user => 
  // this.postUser(user)
  // .then(this.login)

  login = data => {
    const updatedState = { ...this.state.auth, user: { id: data.id, username: data.username } };
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

  fetchCategories = () => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => this.setState({ allCategories: data }))
  }

  // this.setState({allCategories: data}

  onShowDetail = (data) => {
    console.log("showCategoryDetail:", data)
    this.setState({
      selectedCategoryDetail: data
    })
  }

  onAddAppointment = (selectedAppointment) => {
    fetch("http://localhost:3000/user_appointments",{
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({
        user_appointments: {user_id: this.state.auth.user.id,
        appointment_id: selectedAppointment.id}
      })
    })
     const newOwnedAppointments = this.state.appointments
     if(this.state.appointments.includes(selectedAppointment)){
       let newer = newOwnedAppointments.filter(appointment => {
         return appointment.id !== selectedAppointment.id
       })
       this.setState({
        appointments: newer
       })
     }else{
       newOwnedAppointments.push(selectedAppointment)
       this.setState({
         appointments: newOwnedAppointments
       })
     }
  }

  onclickDelete = (deletedAppointment) => {
 fetch(`http://localhost:3000/appointments/${deletedAppointment.id}`,{
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
      }).then(() => this.setState(preState => ({
    appointments: preState.appointments.filter(apt => apt !== deletedAppointment )
  })))

  }


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
            render={props => <Login {...props} onLogin={this.login} />}
          />

          <Route
            exact
            path="/Signup"
            render={props => <Signup {...props} />}
          />

          <Route exact
            path="/categories"
            render={props => <CategoriesCardContainer {...props} showCategories={this.state.categories}  />}
          />          
          
          <Route exact
            path="/category_details/:id"
            render={props => <CardInfoComponent {...props} selectedCategory={this.state.selectedCategoryDetail} 
                                              onShowDetail={this.onShowDetail}
                                              onAddAppointment={this.onAddAppointment}/>}
          />

          <Route
            path="/myProfile"
            exact
            render={props => <ProfileContainer {...props} showUser={this.state.auth.user} 
            userBlogs={this.state.blogs} 
            userAppointments={this.state.appointments} 
            userCategories={this.state.categories}
            onclick={this.onclickDelete}/>}
          />
        </Router>

      </div>
    );
  }

}

export default App;
