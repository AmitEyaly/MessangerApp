const socket = require("socket.io");
const chatsBLL = require('../BLL/chatsBLL');
const jwt = require("jsonwebtoken");

exports.createSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    }
  })


  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  }).on("connect", (socket) => {

    console.log("connect from client");

    // Listen for a custom event to join a room
    const joinRoom = (room) => {
      try {
        // Join the room identified by the user ID
        socket.join(room);
        socket.emit("message", 'user has joianed chatRoom:' + room);
      } catch (error) {
        socket.emit("message", 'Internal Server Error')
      }

    };

    // Emit a joinRoom event for the default room when a connection is established
    joinRoom('defaultRoom');

    // Listen for a custom event to join a room
    socket.on('joinRoom', (chatId) => {
      joinRoom(chatId);
    });



    socket.on("message", async ({ chatId, newMessObj, mongoId }) => {
      if (chatId == 'defaultRoom') {
        console.log('default room msg recived');
      }
      else {
        try {
          const token = socket.handshake.query.token;
          console.log(newMessObj);
          let save = await chatsBLL.updateChatById(token, newMessObj, mongoId)
          console.log(save);
          io.to(chatId).emit('messageResponse', newMessObj);
        } catch (error) {
          socket.emit("message", 'Internal Server Error')
        }
      }

    })
  })
}

