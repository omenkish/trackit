# README

# Time Tracker App

Trackit is a simple application for tracking users clock in and clock out

You can access a demo on heroku here 

- [**TrackIt**](https://eneojo-trackit.herokuapp.com)

## Getting started

## Installation

In order to install and run this project locally, you would need to have the following installed on you local machine.

- [**Ruby 2.7.0**](https://www.ruby-lang.org/en/downloads/)
- [**PostgreSQL**](https://www.postgresql.org/download/)
- [**Bundle gem**](https://https://bundler.io/)

### Installation

Take the following steps to setup the application on your local machine:

- Run `git clone https://github.com/omenkish/trackit.git` to clone this repository

- Run `bundle install` to install all required gems

=================================OR==================================

- Unzip the zipped file and move to the next step

### Configuring the database

_Note_ create and update Update your .env file with the following

```yml
DB_PASSWORD = 
DB_USERNAME =
```

- Create these 2 databases `time_tracker` and `time_tracker_test`. To create them, run:

  ```bash
  rails db:create
  ```

- Next run the code below to migrate schemas that might have not been added to the database

  ```bash
  rails db:migrate
  ```
- Create 1 user with the 2 different entries  by running
    ```bash
      rails db:seed
    ```
## Starting the server

* Run `rails s` to start the application

* Visit: http://localhost:3000/ and login using
- Username: `johnny`
- Password: `123456`

## Tests

* Run test with `rails test`

## Written Response

* Given the time constraint, it was difficult to plan properly. My initial plan was to have a users and entry tables. Each entry represents a complete clock in and clock out by a user.

For the entries schema, a record belongs to a user and that relationship is accounted for by the `user_id` attribute. I wanted each record to have clock_in and clock_out attributes to denote when a user clocks in or out.

The limitation of this approach is that it would be difficult on the frontend, to track entries for users who clock_in today and clock_out the next day, e.g people working on night shifts.

So I decided to go with a simple table that keeps track of the time and the type of entry we are tracking. A clock_in or clock_out operation creates a new record. On the frontend, the date is displayed for each entry to denote the day it was created. This allows us to create multiple entries in a day

## Given a day, I will

* properly display errors on the frontend with toasts
* add more frontend validations
* add a fall back route on the frontend
* Validate the backend to ensure that only a `clock out` record can be created after a `clock in` record

## Given a month, I will

* split the application into a rails backend and a react frontend.
* build a proper user management system e.g authorization, roles
* use a proper state management mechanism like redux or context api
* Implement more test cases for both the api and react
* use `rspec` for testing instead of minitest
* add pagination to the application
