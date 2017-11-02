import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
<Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
            floatingLabelText="Username"
            name="username"
            errorText={errors.username}
            onChange={onChange}
            value={user.username}
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
          value={user.city}
          errorText={errors.city}
          name="city"
          onChange={onChange}
          />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <TextField
            floatingLabelText="Confirm Password"
            type="password"
            name="confirmPassword"
            errorText={errors.confirmPassword}
            value={user.confirmPassword}
            onChange={onChange}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

