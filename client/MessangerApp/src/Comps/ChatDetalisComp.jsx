// import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useState } from "react";

const ChatDetalisComp = () => {
  // const [userProfile, setuserProfile] = useState()
  const chatList = useSelector(state => state.chatList);
  const currentChatId = useSelector(state => state.currentChatId);
 // Filter the chatList to find the chat with the currentChatId
 const currentChat = chatList.find(chat => chat.chatId === currentChatId);

  return (
    <div className="row" >
      <div className="col-8 bg-info-subtle" >
      {currentChat && (
        <div key={currentChat.chatId}>
        <h2> {currentChat.chatId}</h2>
        {currentChat.chatMembers.map(chat => (
          <span key={chat.id}>{chat.name} |</span>
        ))}  
        </div>
        )}
      </div>
      <div className="col-4 bg-info-subtle" style={{borderLeftColor: 'black', borderWidth: '1px', borderLeftStyle: 'solid'}}>
        <img src="https://cdn-icons-png.flaticon.com/512/2938/2938228.png"
          style={{ width: "70px", height: "70px" }} alt="emojii" />
      </div>
    </div>
  )
}

export default ChatDetalisComp
