import React, { useState, useEffect, useReducer, useContext } from 'react';

import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  switch (action.type){
    case 'check':
      return {value: action.val, isValid: action.val.includes('@')};
    case 'validate':
      return {value: state.value, isValid: state.value.includes('@')};
    default:
      return {value:'', isValid:false};
  }
}

const passwordReducer = (state, action) => {
  switch (action.type){
    case 'check_psw':
      return {value: action.val, isValid:action.val.trim().length > 6 };
    case 'validate_psw':
      return {value: state.value, isValid: state.value.trim().length > 6};  
    default:
      return {value: '', isValid: false}; 
  }
}

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(()=> {
    const identifier = setTimeout(()=> { 
      console.log('Checking form validity');
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500);
    return ()=> {
      console.log('CLEAN UP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type: 'check', val: event.target.value});
    //setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'check_psw', val: event.target.value});
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: 'validate'});
    //setFormIsValid(emailState.value.includes('@') && passwordState.isValid);
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'validate_psw'});
    //setFormIsValid(emailState.isValid && passwordState.value.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label="Email" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlue={validateEmailHandler} />
        <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlue={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
