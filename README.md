# MessangerApp

**Overview**

MessengerApp is a simple messaging application. It has a client front-end, and a server backend. The project also includes sample data in JSON files for users, contacts, and chats.
The backend API for the MessengerApp handles:
  -User authentication and authorization
  -Message sending / receiving
  -Persisting data (users, messages, conversations)
  -Real-time communication
  -Any business logic required to support the front-end client

The frontend Features:
  -User login / authentication
  -Fetching and displaying contact lists
  -Fetching and displaying conversations / messages
  -Sending new messages
  -Clean UI to navigate chats, users, messages

**Setup & Usage**

- Explore the JSON data files
    The project includes:
    users.json / users2.json — sample user data
    usersContacts.json — contacts of users
    chats.json — sample chats between users

- Start the server
    Go into the server folder and run your backend. (Assumes you have the dependencies installed.)

- Run the client
    Go into the client folder and run the frontend app so it can interact with the server and the sample data.

  
**Dependencies**

Backend (server)

- express

- mongoose

- dotenv

- bcrypt

- jsonwebtoken

- cors

- socket.io
  
Frontend (client)

- react

- react-dom

- react-router-dom

- redux

- axios

- socket.io-client

