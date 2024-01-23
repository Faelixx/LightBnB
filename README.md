# LightBnB - Lighthouse Labs Project

A simple multi-page Airbnb clone that uses a server-side Javascript to display the information from queries to web pages via SQL queries. 

## Description

A simple app (similar to AirBnB) that allows you to browse for vacation rental properties in select cities. Create a user Id to book, track and list rental properties in any location around the world. 

When searching for a property, you create the conditions for your stay! Each listing has a bedroom count, bathroom count, parking stall count and a user review system that allows you to hear testimonials from tenants just like you! 

**_Note: All database information used in LightBnB is entirely fake._**

##### Technical Description

By using the following [Source Code,](https://github.com/lighthouse-labs/LightBnB_WebApp) we updated the database system from using a hardcoded JavaScript Object to a dynamically created, and updatable relational database using PostGreSQL and node pg.

### Dependencies

* bcrypt ^3.0.6
* cookie-session ^1.3.3
* express ^4.17.1
* nodemon ^1.19.1
* pg ^8.11.3

### Installing

* Git clone repo into local directory
* > npm install // to install all npm dependencies

### Executing program

* > npm run local // to launch web application
* > psql -h localhost -p 5432 -U labber lightbnb // to connect to database
