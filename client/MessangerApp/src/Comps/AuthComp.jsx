import {Link} from 'react-router-dom'


const AuthComp = () => {
  return (
    <div>
      <h1 style={{color:"green"}}>Wellcome to the Messanger App!</h1>
      <Link to='/Home/register'>For Registration</Link>
      <Link to='/Home/login'>Already Registered?</Link>
    </div>
  )
}

export default AuthComp
