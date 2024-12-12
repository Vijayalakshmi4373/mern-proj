import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
// import photo1 from '../../images/photo1.png';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  // MDBCardImage,
  MDBRow,
  // MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '', password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const isLoggedIn = JSON.parse(localStorage.getItem("userData"));
        const { type } = isLoggedIn
        
        switch (type) {
          case "admin":
            navigate("/adminHome")
            window.location.href = "/adminHome";
            break;
          case "user":
            navigate("/userhome", { state: { name: "Vishwa", age: 23 } })
            // window.location.reload();
            window.location.href = "/userhome";
            break;

          default:
            navigate("/Login")
            break;
        }
      }
      else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong')

    }
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/'} className='logo'>HealPlus<span>&#43;</span></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <Link to={'/'} className='nav-items'>Home</Link>
              <Link to={'/login'} className='nav-items'>Login</Link>
              <Link to={'/register'} className='nav-items'>Register</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>


      <MDBContainer className="my-5" style={{ position: 'relative', top: '46px' }}>

        <MDBCard style={{ border: 'none' }} className='w-50 h-50 mx-auto'>
          <MDBRow style={{ background: 'white' }} className='g-0 border-none p-3 rounded'>

            {/* <MDBCol md='6'>
              <MDBCardImage src={photo1} alt="login form" className='rounded-start w-100' />
            </MDBCol> */}

             {/* <MDBCol md='6'> */}
              <MDBCardBody className='d-flex mx-5 flex-column'>

                <div className='d-flex flex-row mt-2 mb-5 justify-content-center'>
                  <span className="h1 fw-bold mb-0 text-center">Sign in to your account</span>
                </div>

                <Form onSubmit={handleSubmit}>
                <label className="form-label fw-bold" htmlFor="formControlLgEmail">Email</label>
                  <MDBInput
                    style={{ margin: '5px auto', background: '#f0f0f0' }}
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    id="formControlLgEmail"
                    type="email"
                    size="md"
                    autoComplete='off'
                    className='rounded-pill'
                  />
                  <label className="form-label fw-bold" htmlFor="formControlLgPassword">Password</label>
                  <MDBInput
                    style={{ margin: '5px auto', background: '#f0f0f0' }}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    id="formControlLgPassword"
                    type="password"
                    size="md"
                    autoComplete='off'
                    className='rounded-pill'
                  />
                  <br></br>
                  <Button className="mb-4 px-5 btn-hvr" size='lg' type='submit'>Login</Button>
                </Form>
                <p className="mb-5 pb-lg-2" style={{ color: 'black' }}>Don't have an account? <Link to={'/register'} style={{ color: 'blue'}}>Register here</Link></p>

              </MDBCardBody>
              {/* </MDBCol> */}

          </MDBRow>
        </MDBCard>

      </MDBContainer>
    </>
  );
}

export default Login;