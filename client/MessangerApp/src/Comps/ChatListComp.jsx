import { useEffect, useState } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import socket from "../socketio/socket"
import axios from "axios";



const ChatListComp = () => {
  const chatList = useSelector(state => state.chatList);
  const [currentMessgesArray, setcurrentMessgesArray] = useState([])
  const [uploadChat, setUploadChat] = useState([])
  const [clickCount, setClickCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch()

  // Function to find a chat by chatId
  const findDetailsByChatId = (MessagesList, chatId) => {
    setcurrentMessgesArray('')
    let filtedMessages = MessagesList.find(chat => chat.chatId === chatId);
    if (filtedMessages) {
      console.log(filtedMessages);
      setUploadChat(filtedMessages);
      dispatch ({ type: "SETMONGO_ID", payload: filtedMessages._id })
      setcurrentMessgesArray(filtedMessages.MessagesRelated)
    }
    else {
      console.log('no messages found');
    }
  };

  // an async function to fetch data from the API
  // const updateMessages = async () => {
  //   try {
  //     // Make a GET request to the API endpoint using Axios
  //     const userId = sessionStorage.getItem('userId')
  //     let token = sessionStorage.getItem('token')
  //     const response = await axios.put('http://localhost:3030/MessangerApp/' + userId,
  //     uploadChat,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //           'Authorization': token
  //         }
  //       })
  //     console.log(response)
  //   } catch (error) {
  //     // Handle any errors that occur during the request
  //     console.error('Error fetching data:', error);
  //   }
  // }


  const openChat = (chatId) => {
    if (clickCount === 0) { 
      dispatch({ type: "SETCHATROOM", payload: chatId })
      socket.emit('joinRoom', chatId);
      findDetailsByChatId(chatList, chatId)
      // dispatch({type:"SETCHATCONTANT", payload: currentMessgesArray})
    }
    else{
      if (currentMessgesArray.length>0) {
        // updateMessages();
        dispatch({ type: "SETCHATROOM", payload: chatId })
        socket.emit('joinRoom', chatId);
        findDetailsByChatId(chatList, chatId)
        // dispatch({type:"SETCHATCONTANT", payload: currentMessgesArray})
      }
      else {
        console.log('messagesArray is empty');
      }
    }
    setClickCount(prevCount => prevCount + 1)

  }

  useEffect(() => {
    console.log('set?!'+ currentMessgesArray);
    dispatch({type:"SETCHATCONTANT", payload: currentMessgesArray})
  }, [dispatch,currentMessgesArray])

  const filteredChats = searchInput 
  ? chatList.filter(chat =>
      chat.chatId.toLowerCase().includes(searchInput.toLowerCase())
  )
  : chatList;

  return (
    <div>
      <h2>Chat List</h2>
      <div className="row">
        <div className="col-2">
          <GiMagnifyingGlass style={{ fontSize: "30px", color: "skyblue" }} />
        </div>
        <div className="col-10">
          <input type="text"
          placeholder="Search"
          style={{ width: '90%' }} 
          onChange={(e) => {setSearchInput(e.target.value)}}/>
        </div>
      </div>
      <br />
      <div className="row">
        <div>
          <dl >
            {filteredChats && filteredChats.map(item => (
              <dt key={item.index}>
                 <ul className="list-group list-group-flush">
                <button
                  id={item.chatId}
                  className="btn btn-primary"
                  style={{}}
                  onClick={() => openChat(item.chatId)}>
                  {item.chatId}</button>
                  </ul>
              </dt>
            ))}
            {!chatList && <p>No chat list available.</p>}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ChatListComp
