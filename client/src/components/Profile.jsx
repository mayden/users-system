import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


const Profile = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Your Personal Profile</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
            floatingLabelText="Username"
            name="username"
            errorText={errors.username}
            value={user.username}
            disabled={true}
        />
      </div>

      <div className="field-line">
        <TextField
            floatingLabelText="Full Name"
            name="fullname"
            errorText={errors.fullname}
            onChange={onChange}
            value={user.fullname}
        />
      </div>

      <div className="field-line">
        <TextField
            floatingLabelText="City"
            errorText={errors.city}
            name="city"
            onChange={onChange}
            value={user.city}
        />
      </div>

      <div className="field-line">
         Leave empty if you don't want to change the password.
      </div>

      <div className="field-line">
        <TextField
            floatingLabelText="Current Password"
            type="password"
            name="currentPassword"
            errorText={errors.currentPassword}
            onChange={onChange}
            value={user.currentPassword}
        />
      </div>

      <div className="field-line">
        <TextField
            floatingLabelText="New Password"
            type="password"
            name="newPassword"
            errorText={errors.newPassword}
            onChange={onChange}
            value={user.newPassword}
        />
      </div>

      <div className="field-line">
        <TextField
            floatingLabelText="Confirm New Password"
            type="password"
            name="confirmPassword"
            errorText={errors.confirmPassword}
            onChange={onChange}
            value={user.confirmPassword}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Update Your Profile" primary />
      </div>

    </form>
  </Card>
);

Profile.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Profile;
