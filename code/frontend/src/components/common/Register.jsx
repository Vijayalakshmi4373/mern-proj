import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd'
// import p2 from '../../images/p2.png'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  // MDBCardImage,
  MDBRow,
  // MDBCol,
  MDBInput,
  MDBRadio,
}
  from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: '', email: '', password: '', phone: '', type: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8001/api/user/register', user)
      if (res.data.success) {
        message.success('Registered Successfully')
        navigate('/login')
      }
      else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }

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


      <MDBContainer className="my-5">

        <MDBCard style={{ border: 'none' }} className='w-50 h-50 mx-auto'>
          <MDBRow style={{ background: 'white' }} className='g-0 border-none p-3 rounded'>

            {/* <MDBCol md='6'> */}
              <MDBCardBody className='d-flex mx-3 flex-column'>

                <div className='d-flex flex-row mb-2 d-flex justify-content-center'>
                  <span className="h1 text-center fw-bold">Sign up to your account</span>
                </div>
                <div className="p-2">
                  <Form onSubmit={handleSubmit} >
                    <label class="my-1 form-label fw-bold" htmlFor="formControlLg">Full name</label>
                    <MDBInput style={{ height: '40px', background: '#f0f0f0' }} name='fullName' value={user.fullName} onChange={handleChange} id='formControlLg' type='text' size="sm" className='rounded-pill' />
                    
                    <label class="my-1 form-label fw-bold" htmlFor="formControlLg">Email</label>
                    <MDBInput style={{ height: '40px', background: '#f0f0f0' }} name='email' value={user.email} onChange={handleChange} id='formControlLg' type='email' size="sm" className='rounded-pill' />
                    
                    <label class="my-1 form-labe fw-bold" htmlFor="formControlLg">Password</label>
                    <MDBInput style={{ height: '40px', background: '#f0f0f0' }} name='password' value={user.password} onChange={handleChange} id='formControlLg' type='password' size="sm" className='rounded-pill' />
                    
                    <label class="my-1 form-label fw-bold" htmlFor="formControlLg">Phone</label>
                    <MDBInput style={{ height: '40px', background: '#f0f0f0' }} name='phone' value={user.phone} onChange={handleChange} id='formControlLg' type='phone' size="sm" className='rounded-pill' />

                    <Container className='my-3'>
                      <MDBRadio
                        name='type'
                        id='inlineRadio1'
                        checked={user.type === 'admin'}
                        value='admin'
                        onChange={handleChange}
                        label='Admin'
                        inline
                      />
                      <MDBRadio
                        name='type'
                        id='inlineRadio2'
                        checked={user.type === 'user'}
                        value='user'
                        onChange={handleChange}
                        label='User'
                        inline
                      />
                    </Container>

                    <Button style={{marginTop: '20px'}} className="mb-4 btn-hvr" variant='dark' size='lg' type="submit">Register</Button>
                  </Form>
                  <p className="mb-5 pb-md-2" style={{ color: 'black' }}>Have an account? <Link to={'/login'} style={{ color: 'blue' }}>Login here</Link></p>

                </div>

              </MDBCardBody>
            {/* </MDBCol> */}

            {/* <MDBCol md='6'>
              <MDBCardImage style={{ mixBlendMode: 'darken' }} src={p2} alt="login form" className='rounded-start w-100' />
            </MDBCol> */}

          </MDBRow>
        </MDBCard>

      </MDBContainer>
    </>
  )
}

export default Register