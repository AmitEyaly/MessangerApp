import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux"

const LoginComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [login, setLogin] = useState({
    phoneNumber: 0,
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const parsedValue = id === 'phoneNumber' ? parseInt(value, 10) : value;
    setLogin(prevUser => ({
      ...prevUser,
      [id]: parsedValue
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    console.log(login);
    try {

      // Make a POST request to the API endpoint using Axios
      const response = await axios.post('http://localhost:3030/auth/login', login);
      // Extract the data from the response
      if (response.status == 200) {
        let { token } = response.data;
        let {userName} = response.data;
        console.log(userName);
        let userId = login.phoneNumber;
        console.log(response.data);
        // Store token in session storage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', userName);
        setisLoggedIn(true);

      } else {
        // Handle login failure, maybe show an error message
        console.error('Login failed');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error logging in:', error);

    }

  }


  useEffect(() => {
    // Checking if user is not loggedIn
    if (!isLoggedIn) {
      navigate("/Home/login");
    } else {
      dispatch({ type: "LOGGEDIN", payload: isLoggedIn })
      navigate("/MessangerApp/");
    }
  }, [navigate, isLoggedIn, dispatch]);

  return (
    <div className='container-fluid' style={{ background: "bisque"}}>
      <h1>Login</h1>
      <form id="id_form" className='justify-content-center' onSubmit={submitLogin} >
        <div className='row'>
          <div className='col-12'>
            <label> phoneNumber  </label>
            <br />
            <input id="phoneNumber" className="form-control-sm" type="number" onChange={handleChange} required />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-12'>
            <label>password  </label>
            <br />
            <input id="password" className="form-control-sm" type="password" onChange={handleChange} required /><br />
          </div>
        </div>
        <br />
        <button style={{ background: "orange" }} type='submit' >Login</button>
      </form>
      <Link to="/Home/register">Not Registered? Click here</Link>
    </div>
  )
}

export default LoginComp
