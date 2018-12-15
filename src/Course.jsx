/* eslint-disable no-undef */
import React, { Component } from 'react';
import getCourses from './Contentful';
import Login from './Login';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: !!firebase.auth().currentUser,
      courses: []
    }
  }
  componentDidMount() {
    var self = this;
    if (self.state.isLoggedIn) {
      getCourses(currentUser.uid).then(courses => {
        alert(courses)

        self.setState({
          courses
        })
      }).catch((error) => {
        console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan('course')}:`))
        console.error(error)
      });
    }

    firebase.auth().onAuthStateChanged(function (user) {
      const isLoggedIn = !!user;
      self.setState({
        isLoggedIn
      });

      if (isLoggedIn) {
        getCourses(user.uid).then(courses => {
          self.setState({
            courses
          })
        }).catch((error) => {
          console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan('course')}:`))
          console.error(error)
        });
      } else {
        self.setState({
          courses: []
        })
      }
    });
  }

  render() {
    const coursesDiv = (<div>
      <h2>Courses</h2>
      <h3><button onClick={() => firebase.auth().signOut()}>Logout</button></h3>
      <ul>
        {this.state.courses.map((course, i) => <li key={i}>
          {course.name}
        </li>)}
      </ul>
    </div>);
    const child = this.state.isLoggedIn ? coursesDiv : <Login />;
    return (<div>
        {child}
      </div>
    );
  }
}

export default App;
