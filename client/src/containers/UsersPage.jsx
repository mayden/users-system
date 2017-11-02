import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Users from '../components/Users.jsx';
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['username', 'fullname', 'city'];

class UsersPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');
    let successMessage = '';


    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      users: [],
      currentUser: {
        username: username,
        userId: userId
      },
      chosenUsers: [],
      searchTerm: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }


  /**
   * This method will be executed after initial rendering.
   * We will render the users list from our API.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/users/getAll');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          users: xhr.response.users
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

    xhr.send();
  }


  /**
   * In this function we are sending the users we want to delete to our API.
   * ou
   * @param event
     */
  handleSubmit(event)
  {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();


    // User can't delete himself.
    if(this.state.chosenUsers.indexOf(this.state.currentUser.userId) > -1)
    {
      const errors = {};
      errors.summary =  "You can't delete yourself. Please be careful :)";

      this.setState({
        errors: errors
      });
    }
    else
    {
      const usersPost = JSON.stringify(this.state.chosenUsers);
      const formData = `users=${usersPost}`;

      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', 'api/users/delete');

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);

      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          // success

          // update the user list without rendering the page
          const tempUsers = [];
          const tempChosenUsers = this.state.chosenUsers;


          this.state.users.forEach(function(item, index)
          {
            let indexArray = tempChosenUsers.indexOf(item._id);

            if(indexArray <= -1)
            {
              tempUsers.push(item);
            }
          });


          // change the component-container state
          this.setState({
            successMessage: xhr.response.message,
            users: tempUsers
          });

          localStorage.setItem('successMessage', xhr.response.message);

          // change the current URL to /
          this.context.router.replace('/users');
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


  }

  /**
   * Retrieving the data according to the user click.
   * @param rowNumber
   * @param columnNumber
   * @param evt
     */

  handleCellClick (rowNumber, columnNumber, evt) {

    const chosenUsers = this.state.chosenUsers;
    const chosenId = evt.target.dataset.myRowIdentifier;

    let inArray = chosenUsers.indexOf(chosenId);

    if(inArray > - 1)
    {
      chosenUsers.splice(inArray, 1);
    }
    else
    {
      chosenUsers.push(chosenId);
    }

    this.setState({chosenUsers: chosenUsers});
}

  /**
   * Updating the user table according to the search term.
   * @param term
     */
  searchUpdated (term) {
    this.setState(
        {
          searchTerm: term
        }
    )
  }


  /**
   * Render the component.
   */
  render() {
    const filteredUsers = this.state.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))


    return (
      <Users
        errors={this.state.errors}
        onSubmit={this.handleSubmit}
        successMessage={this.state.successMessage}
        currentUser={this.state.currentUser}
        users={this.state.users}
        chosenUsers={this.state.chosenUsers}
        onSearch={this.searchUpdated}
        filteredUsers={filteredUsers}
        handleCellClick={this.handleCellClick}
      />
    );
  }

}

UsersPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UsersPage;
