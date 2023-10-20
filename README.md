# Social Network API

The Social Network API is a back-end application that provides the capability to manage a social networking platform. Users can sign up, create thoughts, react to thoughts, and add or remove friends from their friend list.

## Features:

- CRUD operations for Users and Thoughts.
- Ability to add and remove Reactions to Thoughts.
- Add and remove friends to a user's friend list.

## Prerequisites:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) for API testing.

## Setup:

1. **Clone the repository**:
    ```bash
    git clone git@github.com:tijanihind/Social-Network-API.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Social-Network-AP
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

Upon running the command, the server will start, and the Mongoose models will be synced to the MongoDB database.

## API Routes Testing:

### Using Insomnia (or Postman):

#### Users & Thoughts:

GET all Users/Thoughts: Use the paths /api/users and /api/thoughts
POST a new User/Thought: Use the paths /api/users and /api/thoughts
PUT to update a User/Thought by ID: Use the paths /api/users/:id and /api/thoughts/:id
DELETE a User/Thought by ID: Use the paths /api/users/:id and /api/thoughts/:id
Reactions & Friends
POST to create a Reaction to a Thought: Use the path /api/thoughts/:thoughtId/reactions
DELETE to remove a Reaction from a Thought: Use the path /api/thoughts/:thoughtId/reactions/:reactionId
POST to add a Friend to a User's friend list: Use the path /api/users/:userId/friends/:friendId
DELETE to remove a Friend from a User's friend list: Use the path /api/users/:userId/friends/:friendId

#### Expected Responses
When you open the API GET routes in Insomnia for users and thoughts, the data for each route will be displayed in formatted JSON. Testing API POST, PUT, and DELETE routes will allow you to successfully create, update, and delete users and thoughts in the database. Similarly, testing API POST and DELETE routes for reactions and friends will let you manage reactions to thoughts and manage a user's friend list.

## Contributing
Feel free to fork the repository, make changes, and create pull requests. Any contributions you make are greatly appreciated.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Questions
For any questions, feel free to reach out.
