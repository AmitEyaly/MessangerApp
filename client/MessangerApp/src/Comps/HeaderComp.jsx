import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const HeaderComp = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  console.log(loggedIn);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <nav className=" navbar bg-info">
          <div className="container-fluid">
            <div className="navbar-brand" >
              <img src="https://cdn-icons-png.flaticon.com/512/714/714015.png"
                alt="Logo" width="70%" height="35" className="d-inline-block align-text-top" style={{ marginRight: '8px' }}
              ></img>
            </div>
            <div className="dropdown">
              <a className="btn btn-info dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              HAYUSH
              </a>
              <ul className="dropdown-menu">
                <li><Link to='/Home/Register' className='dropdown-item'>Register</Link></li>
                <li><Link to='/Home/login' className='dropdown-item'>Login</Link></li>
                <li><Link to='/MessangerApp' className='dropdown-item'>HomePage</Link></li>
                <li><Link to='/contacts' className='dropdown-item'>Contacts</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default HeaderComp
