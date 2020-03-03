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
import ProfileEditForm from './components/ProfileEditForm'
import CreateBlog from './components/CreateBlog'



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
          isTeacher: false
        },
      },
      categories: [],
      blogs: [],
      appointments: [],
      selectedCategoryDetail: null,
      searchCategory: []

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
    if (token) (
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(data => {
        console.log("login data", data)
        const updatedState = { ...this.state.auth, user: data.user };
        this.setState({ auth: updatedState, categories: data.categories, blogs: data.blogs, appointments: data.appointments, searchCategory: data.categories })
      })
    )
  }

  // signup = user => 
  // this.postUser(user)
  // .then(this.login)
  // componentDidUpdate() {
  //   console.log("STATE UPDATED, USER: ", this.state.auth.user)
  // }
  
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
    fetch("http://localhost:3000/user_appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        user_appointments: {
          user_id: this.state.auth.user.id,
          appointment_id: selectedAppointment.id
        }
      })
    })
    const newOwnedAppointments = this.state.appointments
    if (this.state.appointments.includes(selectedAppointment)) {
      let newer = newOwnedAppointments.filter(appointment => {
        return appointment.id !== selectedAppointment.id
      })
      this.setState({
        appointments: newer
      })
    } else {
      newOwnedAppointments.push(selectedAppointment)
      this.setState({
        appointments: newOwnedAppointments
      })
    }
  }

  onclickDelete = (deletedAppointment) => {
    fetch(`http://localhost:3000/appointments/${deletedAppointment.id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
    }).then(() => this.setState(preState => ({
      appointments: preState.appointments.filter(apt => apt !== deletedAppointment)
    })))

  }

  deleteBlog = (deleteBlog) => {
    fetch(`http://localhost:3000/blogs/${deleteBlog.id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
    }).then(() => this.setState(preState => ({
      blogs: preState.blogs.filter(blog => blog !== deleteBlog )
    })))
  }


  handleChange = e => {
    const input = e.target.value;
    console.log("handleChange", e.target.value)
    // const upFirstLetter = input.charAt(0).toUpperCase() + input.slice(1);
    // console.log("__CAPITALIZE__", upFirstLetter)
    let filtered = this.state.categories.filter(categories => categories.name.includes(input))
    this.setState({
      searchCategory: filtered
    })

  }

  editProfile = (profileInfo, id) => {
    console.log("EIDT PROFILE")
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: id,
        //the id comes into the first structure because of the backend params are finding the id
        user: {
          username: profileInfo.username,
          email: profileInfo.email
        }
      })
    }).then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({
          auth: {
            user: { ...data }
            //or user: data
          }
        })

      }
      )
  }

  CreateBlog = (blogInfo, id) => {
    fetch('http://localhost:3000/blogs',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        blog:{
        image: blogInfo.image,
        title: blogInfo.title,
        story: blogInfo.story,
        user_id: id
      }
      }) 
    })
    .then(res => res.json())
    .then(data =>
      this.setState(preState => ({
        blogs: [...preState.blogs, data],
      }))
      )
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
                search={this.state.search}
                onSearch={this.handleChange}
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
            render={props => <CategoriesCardContainer {...props} showCategories={this.state.searchCategory} />}
          />

          <Route exact
            path="/category_details/:id"
            render={props => <CardInfoComponent {...props} selectedCategory={this.state.selectedCategoryDetail}
              onShowDetail={this.onShowDetail}
              onAddAppointment={this.onAddAppointment} />}
          />

          <Route
            path="/myProfile"
            exact
            render={props => <ProfileContainer {...props} showUser={this.state.auth.user}
              userBlogs={this.state.blogs}
              userAppointments={this.state.appointments}
              userCategories={this.state.categories}
              onclick={this.onclickDelete} 
              deleteBlog={this.deleteBlog}
              />}
          />

          <Route
            path="/edit-profile/:id"
            exact
            render={props => (
              <ProfileEditForm
                {...props}
                profileInfo={this.state.auth}
                onEditProfile={this.editProfile}
              />
            )}
          />

          <Route
            path="/create-blog/:id"
            exact
            render={props => (
              <CreateBlog
                {...props}
                userInfo={this.state.auth.user}
                onCreateBlog={this.CreateBlog}
      
              />
            )}
          />

        </Router>





      </div>
    );
  }

}

export default App;
