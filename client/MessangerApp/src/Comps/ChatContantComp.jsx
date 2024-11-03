import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { Element } from "react-scroll";



const ChatContantComp = () => {
  // const messages = useSelector(state => state.chatList);
  // const currentChatId = useSelector((state) => state.currentChatId);
  const currentMessages = useSelector((state) => state.currentMessages)
  const chatList = useSelector((state) => state.chatList)
  const [userId, setUserId] = useState('')
  // const [chatContant, setChatContant] = useState([]);
  // const [currentMessages, setCurrentMessages] = useState([]);
  

  // // update messages when `messages` or `currentChatId` changes
  // useEffect(() => {
  //   // Filter messages based on current chat ID
  //   setChatContant( messages.find(message => message.chatId === currentChatId));
  //   if (chatContant) {
  //     // If messages are found for the current chat ID, update state
  //     setCurrentMessages (chatContant.MessagesRelated)
  //   } else {
  //     // If no messages are found, reset currentMessages state
  //     console.log('no currentMessages found');
  //   }
  // }, [messages, currentChatId]);
  
  useEffect(() => {
    console.log(currentMessages);
    // setUserId(sessionStorage.getItem('userId'))
  }, [currentMessages]);
 

  

  
return (
  <div className="row" style={{ background: "white", height: "400px" }}>
    <div className="col" id='chatContant' >
      <div>
      {currentMessages && currentMessages.map((message, index) => (
       message.senderID === userId ? (
         <div key={index}>
            <p  className="sender"><small style={{color:"white"}}>{message.senderID}: </small> <br />{message.contant} <br /><small style={{color:"lightgrey"}}>{message.time}</small></p>
          </div>
      ) : (
        <div key={index}>
          <p  className="receiver"><small style={{color:"blue"}}>{message.senderID}: </small><br />{message.contant} <br /><small style={{color:"grey"}}>{message.time}</small></p>
        </div>
      )
          ))}
          <br />
      </div>
    </div>
  </div>
)
}

export default ChatContantComp
