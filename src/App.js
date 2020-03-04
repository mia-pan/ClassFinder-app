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
import Footer from "./containers/Footer";
import HomepageLayout from "./containers/HomepageLayout";
import About  from "./containers/About"
import CreateAppointment from './components/CreateAppointment'
import CreateCategory from './components/CreateCategory'




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
      searchCategory: [],
      ownedAppointments: [],
      allAppointments: [],
      allCategories: []
    };
  }

  //  setUserState = (data) => {
  //    this.setState({
  //     name: data.name,
  //     email: data.email,
  //     loggedIn: true,
  //    })
  //  }

  populateUser() {
    api.auth.getCurrentUser().then(data => {
      console.log("login data", data)
      const updatedState = { ...this.state.auth, user: data.user };
      console.log("updateState", updatedState)
      this.setState({ auth: updatedState, categories: data.categories, blogs: data.blogs, appointments: data.appointments, searchCategory: data.categories })
    })
  }

  componentDidMount() {

    const token = localStorage.getItem("token");
    if (token) {
      // make a request to the backend and find our user
      this.populateUser();
    }

  }

  // signup = user => 
  // this.postUser(user)
  // .then(this.login)
  // componentDidUpdate() {
  //   console.log("STATE UPDATED, USER: ", this.state.auth.user)
  // }

  login = data => {
    const updatedState = { ...this.state.auth, user: data.user };
    console.log("data", data)
    localStorage.setItem("token", data.jwt);
    this.populateUser();
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} },
      blogs: [],
      appointments: []
    });
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

  fetchAppointments = () => {
    fetch("http://localhost:3000/appointments")
      .then(res => res.json())
      .then(data => this.setState({ allAppointments: data }))
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
    }).then(res => res.json()).then(data => {
      this.setState(prev => {
        return {
          appointments: [...prev.appointments, data]
        }
      },
      () => this.populateUser())
    })

    // const newOwnedAppointments = this.state.ownedAppointments
    // if (this.state.ownedAppointments.includes(selectedAppointment)) {
    //   let newer = newOwnedAppointments.filter(appointment => {
    //     return appointment.id !== selectedAppointment.id
    //   })
    //   this.setState({
    //     ownedAppointments: newer
    //   })
    // } else {
    //   newOwnedAppointments.push(selectedAppointment)
    //   this.setState({
    //     ownedAppointments: newOwnedAppointments
    //   })
    // }
  }

  onclickDelete = (deletedAppointment) => {

    fetch(`http://localhost:3000/appointments/${deletedAppointment.id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
    }).then(() => this.setState(preState => ({
      appointments: preState.appointments.filter(apt => apt !== deletedAppointment)
    })))
  }

  deleteUserAppointments = (appointment) => {
    const appointmentsId = appointment.id;
    // console.log("userId", userId, "appointmentsId", appointmentsId)
    let id = null;
    this.state.auth.user.user_appointments.forEach(join => {
      console.log(join)
      console.log(appointmentsId)
      if (join.appointment_id === appointmentsId) {
        id = join.id;
      }
    })
    console.log(id)
    fetch(`http://localhost:3000/user_appointments/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.populateUser()
    })
  }

  deleteBlog = (deleteBlog) => {
    fetch(`http://localhost:3000/blogs/${deleteBlog.id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
    }).then(() => this.setState(preState => ({
      blogs: preState.blogs.filter(blog => blog !== deleteBlog)
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
    fetch('http://localhost:3000/blogs', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        blog: {
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

  CreateAppointment =(appointmentInfo, id) => {
    fetch('http://localhost:3000/appointments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        appointments: {
          name: appointmentInfo.name,
          time: appointmentInfo.time,
          duration: appointmentInfo.duration,
          location: appointmentInfo.location,
          instructor: appointmentInfo.instructor,
          status: appointmentInfo.status,
          category_id: id
        }
      })
  })
  .then(res => res.json())
      .then(data =>
        this.setState(preState => ({
          appointments: [...preState.appointments, data],
        }))
      )
    }

    CreateCategory =(categoryInfo, id) => {
      fetch('http://localhost:3000/categories', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          categories: {
            image: categoryInfo.image,
            name: categoryInfo.name,
            description: categoryInfo.description,
            
          }
        })
    })
    .then(res => res.json())
        .then(data =>
          this.setState(preState => ({
            categories: [...preState.categories, data],
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
            path="/home"
            render={props => <HomepageLayout {...props} />}
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
            render={props => <CategoriesCardContainer {...props}
              showCategories={this.state.searchCategory}
              showCategoriesWithoutLogin={this.state.allCategories}
            />}
          />

          <Route exact
            path="/category_details/:id"
            render={props => <CardInfoComponent {...props} selectedCategory={this.state.selectedCategoryDetail}
              onShowDetail={this.onShowDetail}
              categories={this.state.categories}
              onAddAppointment={this.onAddAppointment} />}
          />

          <Route
            path="/myProfile"
            exact
            render={props => <ProfileContainer {...props} showUser={this.state.auth.user}
              userBlogs={this.state.blogs}
              userAppointments={this.state.appointments}
              userCategories={this.state.categories}
              onclick={this.deleteUserAppointments}
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

        <Route
            path="/create-appointment"
            exact
            render={props => (
              <CreateAppointment
                {...props}
                userInfo={this.state.auth.user}
                onCreateAppointment={this.CreateAppointment}
                 
              />
            )}
          />

        <Route
            path="/create-categories"
            exact
            render={props => (
              <CreateCategory
                {...props}
                userInfo={this.state.auth.user}
                onCreateCategory={this.CreateCategory}

              />
            )}
          />

          <Route
            path='/About'
            render={props =>(
              <About
                {...props}
              />

            )}
          />

          <Route
            path='/'
            render={() =>
              <Footer
                onLogout={this.logout}
              />

            }
          />

        </Router>





      </div>
    )
  }

}

export default App;
