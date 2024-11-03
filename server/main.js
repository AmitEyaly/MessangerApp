const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require("./configs/connectDB");
const http = require('http');
const {createSocket} = require("./sockets/appSocket")
const session = require('express-session');

const UsersRouter = require('./routes/UsersRouter')
const authRouter = require('./routes/AuthRouter');
const ChatsRouter = require ('./routes/ChatsRouter')


connectDB();
const server = http.createServer(app);


//middlewares
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173', // Replace with your client's origin
        credentials: true
      }
));
app.use(session({
    secret: 'secretsessionkey', 
    resave: false,
    saveUninitialized: true,
    HttpOnly: false,
    cookie:{
        maxAge: 1000*60*60*24 
    }
  }));


//routers
app.use('/auth', authRouter);
app.use('/users', UsersRouter);
app.use('/MessangerApp', ChatsRouter);

createSocket(server)

const PORT = 3030;
server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})

