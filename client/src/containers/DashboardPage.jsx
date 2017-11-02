import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      message: 'Thanks for using our services. Please select page from the right menu.'
    };
  }


  /**
   * Render the component.
   */
  render() {
    return (<Dashboard message={this.state.message} />);
  }

}

export default DashboardPage;
