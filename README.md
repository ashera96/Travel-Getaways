# Travel-Getaways
Website for a travel agency

## Introduction

Stakeholders identified are;
- Admininstrator
- Registered Customer
- Unregistered Customer

Folders of this project are structed as follows;
- Admin application ( Angular )
- Client application ( Angular )
- Backend application 

### Functionalities

- Administrator will have the power to manage all the travel packages and their details
- Chatbot to ensure quick customer interaction
- Customer profile to book tours and manage tour details
- Search function to search through all tour plans and get quick responses
- Public forum to collect user feedback
- Static pages which will be visible to any unregistered customer

## Technological Overview

Development of the web application is done using the below mentioned technology stack.
- Angular
- Node
- Express
- Firebase ( Cloud Firestore ) 

## Installation

``` bash
# clone the repo
$ git clone https://github.com/ashera96/Travel-Getaways.git

# go into app's directory
$ cd Travel-Getaways

# go into admin directory
$ cd admin

# install admin app's dependencies
$ npm install

# Launch the server for the admin app
$ ng serve --open

#go into client directory
$ cd client

# install client app's dependencies
$ npm install

# Launch the server for the client app
$ ng serve --port=8080 --open
```