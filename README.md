# System Users Task

I've built this mini-project as part of job interview.

## Run & Install

```
    git clone https://github.com/mayden/users-system.git
    cd users-system
    npm install
```

 After you install the modules and configured the enviroment, we need to bundle the app.js so:

```
    npm run bundle
```

 And finally, start our system:

 ```
    npm start
 ```

Moreover, don't forget to run the mongodb on your local machine.


## User Features
    - Create account (username, full name, city, password)
    - Edit Personal Info (except username)
    - View other users and ability to delete them
    - Input filter to find by username, full name and city.


## Stack
    - Node.JS
    - Express
    - React.JS
    - MongoDB


## API
This mini-project works as REST API. The paths are:

-   Retrieve all the users: `` /api/users/getAll``
-   Delete users by IDs: `` /api/users/delete``
-   Get User by Username: `` /api/profile/get``
-   Update User Profile: `` /api/profile/update``
-   Get Dashboard Message: `` /api/dashboard/``



## User Authentication
Made with PassportJS (PassportLocalStrategy), Validator, and JWT (JSON Web Token).
User.username is the unique key. 




## Mongoose Schema
```
    const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: { unique: true }
     },
    fullname: String,
    city: String,
    password: String
});
```



## PUG Template Engine
I didn't understand why to use it, because I am rendering it trough React.JS and designing it with Material-UI.

Anyway, Here is an old project of mine, using Jade (previous version of PUG):
https://github.com/mayden/PickApp




## Summary
Hope you like it! :)




## Future Ideas
As I worked on this project, I always had ideas to improve and upgrade. So here some of the ideas to implement in the future:
-   Google API Search City Input
-   Unit Testing (API)



## p.s

If there any bugs, please report me and I'll try to fix them asap.




