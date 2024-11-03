import { io } from "socket.io-client";

let token = sessionStorage.getItem('token')
const socket = new io ('http://localhost:3030', {
autoConnect : true,
withCredentials: true,
query:{token}

});

export default socket;