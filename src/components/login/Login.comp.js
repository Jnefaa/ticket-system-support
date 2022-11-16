
import React , {useState,useEffect}from 'react'
import  propTypes from 'prop-types' ;
import {Container , Row  , Form, Col, Button,Spinner,Alert } from 'react-bootstrap'
import {loginFail,loginPending,loginSuccess} from './loginSlice';
import { useDispatch ,useSelector} from 'react-redux';
import {userLogin} from '../../api/userApi'
import { useHistory } from 'react-router-dom';
import {getUserProfile} from '../../pages/dashboard/userAction'
export const LoginForm= ({formSwitcher }) => {
 
  const dispatch = useDispatch()
  const history = useHistory()
 const {isLoading , isAuth ,error}= useSelector((state) => state.login)
 
 useEffect (()=> { 
   ( sessionStorage.getItem('accessJWT')) && history.push("/dashboard")
 },[history,isAuth])
  const [email,setEmail] = useState("nefaa03@gmail.com") ; 
  const [password,setPassword] = useState("password124") ;

  const handleOnChange = e => { 
    const {name , value}= e.target ; 

    switch (name) { 
      case "email" : 
      setEmail (value) ; 
      break ; 

      case "password" : 
      setPassword (value) ; 
      break ; 

      default : 
      break ; 
    }
   //console.log(name,value) ; 
    }
    

    const handleOnSubmit= async (e) => { 
      e.preventDefault ()
      if (!email || !password ) { 
      return  alert('complete all the form  !!!')
      }
   dispatch(loginPending()); 

   try {
     const isAuth = await userLogin({email,password})
     console.log(isAuth)
     if(isAuth.status === "error") { 
      return  dispatch(loginFail(isAuth.message))
     }
     dispatch(loginSuccess())
     dispatch(getUserProfile())
     history.push('/dashboard')
     
   } catch (error) {
     dispatch(loginFail(error.message))
   }
  //Todo call api to submit the form 
  //console.log(email,password) ; 
    } ; 



  return (


    

    <Container> 
       <Row> 
         <Col> 
         <h1 className='text-info text-center'> Client Login </h1>
         <hr/> 
         {error && <Alert variant='danger' >{error} </Alert>}
         <Form autoComplete='off' onSubmit={handleOnSubmit} > 
           <Form.Group> 
            
             <Form.Control 
             type='email' 
             name='email'
             value={email} 
             onChange={handleOnChange}
             required
             placeholder='Enter Email'
              /> 
           </Form.Group>
           <Form.Group> 
            
             <Form.Control 
             type='password' 
             name='password' 
             required
             value={password} 
             onChange={handleOnChange}
             placeholder='password'
              /> 
           </Form.Group>
           <Button  type="submit"> Login </Button>
           {isLoading && <Spinner variant='primary' animation='border'/>}
         </Form>
         <hr/> 
         </Col>
       </Row>
       <Row> 
         <Col> 
         <a href="password-reset" onClick={ ()=> formSwitcher('reset')}> Forget Password</a>
         </Col>
       </Row>
	   
	   Do you still not have an account
        <a href="/Registration"> Register Now </a>
	
    </Container>
	
  )
}
LoginForm.propTypes ={  
  formSwitcher :propTypes.func.isRequired, 
}