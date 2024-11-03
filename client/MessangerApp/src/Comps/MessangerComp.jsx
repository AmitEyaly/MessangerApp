import ChatDetalisComp from './ChatDetalisComp.jsx';
import ChatListComp from './ChatListComp.jsx';
import ChatContantComp from './ChatContantComp.jsx';
import WriteMessageComp from './WriteMessageComp.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Socket from '../socketio/socket.js';
import axios from 'axios';




const MessangerComp = () => {
  // state to hold the data fetched from the server
  const [data, setData] = useState([]);
  // state to hold loading state
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Log connection status
    console.log('Connecting to server...');

    // Connect to server
    Socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Handle connection error
    Socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Handle disconnection
    Socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up event listeners on component unmount
    return () => {
      Socket.disconnect();
    };
  }, []);


  useEffect(() => {
    // an async function to fetch data from the API
    const fetchData = async () => {
      try {
        // Set loading state to true
        setLoading(true);
        // Make a GET request to the API endpoint using Axios

        const userId = sessionStorage.getItem('userId')
        let token = sessionStorage.getItem('token')
        const response = await axios.get('http://localhost:3030/MessangerApp/'+userId, {
          withCredentials: true,
          headers: {
            "Content-Type" : "application/json",
            'Authorization': token
          }  
        })
      
        // Extract the data from the response
        const responseData = response.data;
        // Set the data state with the fetched data
        setData(responseData);
        console.log(data);

        // Set loading state to false
        
        setLoading(false);

     } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
        // Set loading state to false
        setLoading(false);
      }
    };
    
    // Call the fetchData function when the component mounts
    fetchData();
   
  },[] ); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    dispatch({ type: 'SETCHATLIST', payload: data });
  }, [dispatch, data]);

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-3 bg-primary" >
          <ChatListComp />
        </div>
        <div className="col-9" >
          <ChatDetalisComp />
          <div className='chatContant'>
          <ChatContantComp />
          </div>
          <WriteMessageComp />
        </div>
      </div>
      <div className="row">
        <div className='col-10'>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : data ? (
              <div>
                {/* Render the fetched data */}
                <h1>{data.title}</h1>
                <p>{data.description}</p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessangerComp

