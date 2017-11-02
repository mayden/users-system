const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const mongoose = require('mongoose');
const config = require('../../config');
const bcrypt = require('bcrypt');

/**
 *  API for dashboard page.
 */
router.get('/dashboard', (req, res, next) => {
  res.status(200).json({
    message: "Thanks for using our services. Please select page from the right menu."
  });
});


/**
 * API for getting all the users
 */
router.get('/users/getAll', (req, res, next) => {

  User.find({}, (err, users) => {
    if (err) {
      res.status(401).json(err);
    }

    res.status(200).json({
      users: users
    });
  });

});

/**
 * API for getting the user profile information.
 */
router.post('/users/delete', (req, res, next) => {
  const usersRemove = [];

  const usersToDelete = JSON.parse(req.body.users);

  for(var i = 0; i < usersToDelete.length; i++)
    usersRemove.push(mongoose.Types.ObjectId(usersToDelete[i]));


  // find username details
  User.remove({ _id : { '$in': usersRemove}}, (err, result) => {
    if (err) {
      return res.status(401).json(err);
    }
    else
    {
      res.status(200).json({
        success: true,
        message: 'You have been successfully deleted those users.',
        result: result.n
      });
    }

  });
});


/**
 * API for deleting other users.
 * params: array of objectIds
 */
router.post('/profile/get', (req, res, next) => {

  const userName = req.body.username;

  // find username details
  User.find({ 'username': userName}, (err, result) => {

    if (err) {
      return res.status(401).json(err);
    }
    else
    {
      res.status(200).json({
        success: true,
        message: 'You have been successfully deleted those users.',
        user: result
      });
    }

  });
});

/**
 * Validate the update profile form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateProfileUpdate(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  var fullNameRegex=/^[a-zA-Z ]+$/; // Only A-Z and a-z



  if (!payload || typeof payload.fullname !== 'string' || payload.fullname.trim().length === 0 || !fullNameRegex.test(payload.fullname.trim())) {
    isFormValid = false;
    errors.fullname = 'Please provide your full name. Only between a-z and A-Z Characters (Spaces are allowed)';
  }

  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide your city.';
  }

  // If user change his password
  if(isUserChangedPassword(payload))
  {
    if (!payload || typeof payload.newPassword !== 'string' || payload.newPassword.trim().length < 6) {
      isFormValid = false;
      errors.newPassword = 'Password must have at least 6 characters.';
    }

    if (!payload || typeof payload.confirmPassword !== 'string'  || payload.newPassword !== payload.confirmPassword) {
      isFormValid = false;
      errors.confirmPassword = 'Password does not match. (New Password and Confirm New Password)';
    }

  }


  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/** isUserChangedPassword - returns true only if user wants to change his password.
 *
 * @param payload
 * @returns {boolean}
 */
function isUserChangedPassword(payload) {
  return !(payload.currentPassword  == 'undefined' || payload.currentPassword == null || payload.currentPassword == '');

}


function validatePassword(payload, done) {
  const errors = {};
  let isValid = true;
  let message = '';

  if (!payload || !(payload.newPassword === payload.confirmPassword)) {
    isValid = false;
    errors.confirmPassword = 'Confirm Password is incorrect.';
  }

  if (!payload || typeof payload.newPassword !== 'string' || payload.newPassword.trim().length < 6) {
    isValid = false;
    errors.newPassword = 'New Password must have at least 6 characters.';
  }


  return {
    success: isValid,
    message,
    errors
  };

}



router.post('/profile/update', (req, res, next) => {
  const validationResult = validateProfileUpdate(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  const user = {
    username: req.body.username,
    fullname: req.body.fullname,
    city: req.body.city
  }


  if(isUserChangedPassword(req.body))
  {

    var isPasswordCorrect = validatePassword(req.body);

    User.findOne({ username: user.username }, (err, user) => {
      if (err) {
        isPasswordCorrect.errors.username = err;
        isPasswordCorrect.success = false;
      }


      // check if a hashed user's password is equal to a value saved in the database
      user.comparePassword(req.body.currentPassword, (passwordErr, isMatch) => {
        if (err) {
          isPasswordCorrect.errors.username = err;
          isPasswordCorrect.success = false;
        }

        if(passwordErr)
        {
          isPasswordCorrect.message = err;
          isPasswordCorrect.success = false;
        }

        if (!isMatch) {
          isPasswordCorrect.errors.currentPassword = "Your password is incorrect. Please type correct password.";
          isPasswordCorrect.success = false;
        }

        if(!isPasswordCorrect.success)
        {
          console.log(isPasswordCorrect.errors);

          return res.status(400).json({
            success: false,
            message: isPasswordCorrect.message,
            errors: isPasswordCorrect.errors
          });
        }
        // new password was success
        else
        {
          bcrypt.genSalt((saltError, salt) => {
            if (saltError)
            {
              return callback(saltError);
            }

            bcrypt.hash(req.body.newPassword, salt, (hashError, hash) => {
              if (hashError) { return callback(hashError); }

              user.password = hash;

              // find username details
              User.findOneAndUpdate({username: user.username},{fullname: user.fullname, city: user.city, password: user.password}, (err, user) => {
                if (err) {
                  return res.status(401).json(err);
                }

                res.status(200).json({
                  user: user,
                  success: true,
                  message: 'You have been successfully updated your profile.'
                });
              });

            });
          });
        }
      });
    });
  }
  else
  {
    // find username details
    User.findOneAndUpdate({username: user.username},{fullname: user.fullname, city: user.city}, (err, user) => {
      if (err) {
        return res.status(401).json(err);
      }

      res.status(200).json({
        user: user,
        success: true,
        message: 'You have been successfully updated your profile.'
      });
    });
  }






});



module.exports = router;
