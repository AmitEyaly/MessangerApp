import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import socket from "../socketio/socket"
import { useEffect } from "react"



const WriteMessageComp = () => {

  const dispatch = useDispatch()
  const chatId = useSelector((state) => state.currentChatId);
  const mongoId = useSelector(state => state.currentmongo_Id);
  // const chatInfo = useSelector((state) => state.chatInfo);
  const sender = sessionStorage.getItem('userId')
  const [message, setMessage] = useState(""); // State to capture input value
  const [newMessObj, setnewMessObj] = useState({});//state to create new message


  const createNewMessage = () => {
    const time = new Date();
    setnewMessObj({
        time: time.toISOString(),
        senderID: sender,
        contant: message
      })
    // socket.emit('message', { chatId, newMessObj })
          // Clear input after sending message
    setMessage("");
    const bar = document.getElementById('typingMesBar')
    bar.value = ''
    bar.placeholder = "Type your message here"
  }

  useEffect(()=>{
    socket.emit('message', { chatId, newMessObj, mongoId })
  }, [newMessObj])

  useEffect(() => {
    socket.on('messageResponse', (newMessObj) => {
      console.log(newMessObj);
      dispatch({type:"ADD_MESSAGE", payload:newMessObj})
    });
  }, [dispatch]);


  return (
    <div className="row align-self-center bg-info-subtle ">
      <div className="col">
        <br />
        <div className="row">
          <div className="col-9">
            <input
              id='typingMesBar'
              type="text"
              placeholder="Type your message here"
              style={{ width: "80%", marginTop: "10px", wordBreak: "break-word" }}
              onChange={(e) => { setMessage(e.target.value) }} />
          </div>
          <div className="col-3">
            <button style={{ background: "White", marginBottom: "15px" }} onClick={createNewMessage} >Send</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default WriteMessageComp
