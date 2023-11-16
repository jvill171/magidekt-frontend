
# Magidekt

Magidekt is an app that attempts to replicate [Archidekt](https://archidekt.com/ "Archidekt") through the use of [Scryfall's API](https://scryfall.com/docs/api "Scryfall API"). The frontend was build with React and the backend was built with Node, Express, and Postgresql.

### To see a live demo: 
Sign up on your own or use this demo account:

* Username: demouser
* Password: password

Magidekt is a React-based Deck builder featuring account creation, profile editing, Deck editing, and even saving!

 [Live Demo](https://magidekt.surge.sh/ "Magidekt")  

## Technologies
* React.js
* Node Express.js
* PostgreSQL

## Current Features
* Profile editing
* Account deletion
* Create a deck & add cards to a deck
* Card Searching through Scryfall API
* Account creation, login, logout -> uses authorization and authentication middleware to protect private routes
* Search Companies & Jobs: browse and search hiring companies and view the jobs posted by each company.

## Planned Features
* Deck Sharing
* Anonymous viewing and replication of decks

## Getting Started on the Server (backend)
* Clone the repository
* `cd server`
* `npm i`
* `createdb magidekt`
* `createdb magidekt_test`
* `psql magidekt < magidekt-seed.sql` (optional)
    * This seed is mainly for testing purposes and thus is not strictly required. Modify the seed as you feel fit.
    * If the seed is unused, it is recommended to create an account through the registration route.
    * **NOTE**: The default password set on both seed accounts is "password". This is not the case for the deployed app.
* `npm start`
* `npm test` to run the tests

## Getting Started on the Client (frontend)
* `npm i`
* `npm run start`
* `npm run test` to run the tests

# Future Plans & Noteworthy Code
Currently, there are many areas for improvement in my code.

* After updating Deck Info once, clicking on the `Deck Info` button again will show the old information. This is a visual bug and is simply due to the client not saving the new info, but the DB will save this info.

* While writing tests, I noticed that my ScrufallResults component continued to re-render when typing in the search form. I will look into the reason for this.

* Due to time constraints, I could not style some pages to the extent I would like, such as the Profile page.

* Most of my time in styles was spent on the major component of this project, the DeckBuilder and its child components. I feel fairly satisfied with the DeckBuilder as it stands, besides the lack of a `DeckContext`, which I will fix in the future.

* A major area for improvement I am aware of of is the lack of a `DeckContext` to keep track of deck data when building a deck, which is instead prop-drilled down through components. Due to time constraints, by the time i realized I could use a Context, I was too far into my project to take the time to refactor my code. I chose to leave it as it was in order to submit my project, but I plan to return to fix this.

* One feature I did not get to implement but plan to, is the ability to click on a card to preview its data in better detail. Due to time constraints, I cut this out of the submission, but will attempt to implement it after the `DeckContext` refactor.

* Admins currently lack the ability to directly alter a user's decks/profiles through the frontend. An Admin panel would be a nice idea to implement.

* I would like to implement some routes for all users including unauthenticated users to simply view & explore existing decks.

### Notes
* Due to the inconsistent location of data from Scryfall API, much of the code that renders card data appears rather messy. This was mainly due to having to account for double-sided cards and different layouts having data located under different places of the JSON hierarchy. It took much of my time in the project to map out in order to ensure there were no errors for the data I chose to display.