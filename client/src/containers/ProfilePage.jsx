import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Profile from '../components/Profile.jsx';


class ProfilePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    const username = localStorage.getItem('username');

    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        username: username,
        fullname: '',
        city: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    // create a string for an HTTP body message
    const username = encodeURIComponent(this.state.user.username);
    const formData = `username=${username}`;


    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/profile/get');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

        this.setState({
          user: xhr.response.user[0]
        });
      }
      else {
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }

    });

    xhr.send(formData);
  }

  /**
   * Process the form - updating the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    localStorage.removeItem('successMessage');

    // create a string for an HTTP body message
    const username = encodeURIComponent(this.state.user.username);
    const fullname = encodeURIComponent(this.state.user.fullname);
    const city = encodeURIComponent(this.state.user.city);
    const currentPassword = encodeURIComponent(this.state.user.currentPassword);
    const newPassword = encodeURIComponent(this.state.user.newPassword);
    const confirmPassword = encodeURIComponent(this.state.user.confirmPassword);

    const formData = `username=${username}&fullname=${fullname}&city=${city}&currentPassword=${currentPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'api/profile/update');

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);

    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        localStorage.setItem('successMessage', xhr.response.message);

        // change the current URL to /
        this.context.router.replace('/profile');
      } else {
        // failure


        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * handle the change in the input fields.
   * @param event
     */
  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }




  /**
   * Render the component.
   */
  render() {
    return (
      <Profile
        onSubmit={this.processForm}
        onChange={this.handleChange}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProfilePage;
