# Background
This project is an assignment given to a job applicant by the hiring company as a test for software development skiils.
The code should be of high quality, readable, concise, and uses best practices up to par with modern industry standards.

# Goal
Create a web application that displays the real-time geolocation of the International Space Station (ISS) on a 2D map.
The application should fetch the new location every 15 seconds from the server and update the map display.

# Implementation details
* In a single repository create separate "client" and "server" directories.
* No database required.
* Server should use Node, Express, and TypeScript.
* Server should fetch data on startup and every 10 seconds from http://api.open-notify.org/iss-now.json and keep the last result in a variable named 'issLocation'. The returned json object is of that structure:
```
{
  "message": "success",
  "timestamp": UNIX_TIME_STAMP,
  "iss_position": {
    "latitude": CURRENT_LATITUDE,
    "longitude": CURRENT_LONGITUDE
  }
}
```
* Server and client should use ts-rest library to manage the API between them.
* Server should provide a REST API for the client to get 'issLocation', don't forget to define that object in ts-rest contract.

* Client should use React and TypeScript.
* Client build tool should be Vite.
* Client should use leaflet library for world map display.
* Client should poll the server to get 'issLocation' right on page load and every 10 seconds.
* Client should display the iss.png on a 2D map in the last known location. and update it as the data is updated.
