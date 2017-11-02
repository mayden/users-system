import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Dashboard = ({ message }) => (
  <Card className="container">
    <CardTitle
      title="Personal Dashboard"
      subtitle=""
    />

    {message && <CardText style={{ fontSize: '16px', color: 'green' }}>{message}</CardText>}
  </Card>

);

Dashboard.propTypes = {
    message: PropTypes.string.isRequired
};

export default Dashboard;
