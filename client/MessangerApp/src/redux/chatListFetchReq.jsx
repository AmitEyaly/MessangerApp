import {fetch_chats_req, fetch_chats_success, fetch_chats_failed } from "./chatList/chatListActions"
import axios from "axios";


export const fetchChatList = () => {
    return async (dispatch) => {
        dispatch(fetch_chats_req())
        try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        console.log(response);
        const data = await response.json();
        console.log(data);
        dispatch(fetch_chats_success(data));
      } catch (error) {
        dispatch(fetch_chats_failed(error.message));
      }
    };
  };

