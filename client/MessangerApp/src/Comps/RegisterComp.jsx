import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'






const RegisterComp = () => {
  const navigate = useNavigate();
  const [isRegistered, setisRegistered] = useState(false);
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    phoneNumber: '',
    password: '',
    chatsRelated: [],
    contacts: []
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setUser(prevUser => ({
      ...prevUser,
      [id]: value
    }));
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    console.log(user);
    try {

      // Make a POST request to the API endpoint using Axios
      const response = await axios.post('http://localhost:3030/auth/register', user);
      // Extract the data from the response
      console.log(response);

      if (response.data == "User created successfully!") {
        setisRegistered(true)
      }
      else {
        console.log(response.data);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching data:', error);

    }

  }

  useEffect(() => {
    // Checking if user is not loggedIn
    if (!isRegistered) {
      navigate("/Home/register");
    } else {
      navigate("/Home/login");
    }
  }, [navigate, isRegistered]);

  return (
    <div className='container' style={{ background: "bisque" }}>
      <h4>Wellcome to MessangerApp! please register here:</h4>
      <i className="fa-regular fa-frog"></i>
      <br />
      <div className='justify-content-center'>
        <form id="id_form" onSubmit={createNewUser}>
          <div className='row'>
            <div className='col-12'>
              <label>fullName</label>
              <br />
              <input id="fullName" value={user.fullName} className="form-control-sm" type="text" onChange={handleChange} required />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <label>userName</label>
              <br />
              <input id="userName" value={user.userName} className="form-control-sm" type="text" onChange={handleChange} required />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <label>phoneNumber</label>
              <br />
              <input id="phoneNumber" value={user.phoneNumber} className="form-control-sm" type="number" onChange={handleChange} required />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <label>password</label>
              <br />
              <input id="password" value={user.password} className="form-control-sm" type="password" onChange={handleChange} required />
            </div>
          </div>
          <br />
          {/* <div className='row'>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary"><i className="fa-solid fa-frog">1</i></button>
              <button type="button" className="btn btn-primary"></button>
              <button type="button" className="btn btn-primary"><i className="fa-solid fa-hippo"></i></button>
            </div>
          </div> */}
          <button style={{ background: "green" }} type='submit'>Register</button>
        </form>
        <div>
        </div>
      </div>
      <Link to="/Home/login">Already Registered? Click to Login</Link>
    </div>
  )
}

export default RegisterComp
