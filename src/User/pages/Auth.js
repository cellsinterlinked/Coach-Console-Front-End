import React, { useState, useContext } from 'react'
import Card from '../../Shared/components/UIElements/Card';
import Button from '../../Shared/components/FormElements/Button';
import Input from '../../Shared/components/FormElements/Input';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { DarkModeContext } from '../../App';
import './Auth.css'

const Auth = (props) => {
  const {themeMode} = useContext(DarkModeContext);
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient()


  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false)

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({name: undefined},
        formState.inputs.email.isValid &&
        formState.inputs.password.isValid); //when we are in login mode we drop the form input of name and only worry about the other two
    } else {                              //when in signup mode
      setFormData({
        ...formState.inputs,              //include name in the form data
        name: {
          value: '',
          isValid: false
        }
      },
      false
      )
    }
    setIsLoginMode(prevMode => !prevMode);
  }


  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try{
        const responseData = await sendRequest(
          'http://localhost:5000/api/user/login',
          'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        },
      );

      auth.login(responseData.user.id)
    } catch (err) {

    }

    } else {
      try{

        const responseData = await sendRequest('http://localhost:5000/api/user/signup', 'POST', JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        },
        );

        auth.login(responseData.user.id)
      } catch (err) {}
  }
};


  return (
  <React.Fragment>
  <ErrorModal error={error} onClear={clearError}/>
  <Card className={themeMode === 'darkTheme' ? "dark-authentication" : "light-authentication"}>
  {isLoading && <LoadingSpinner asOverlay />}
    <h2>Login Required</h2>
    {/* <hr /> */}
    <br />
    <form onSubmit={authSubmitHandler}>
      {!isLoginMode && (
      <Input
        element="input"
        id="name"
        type="text"
        labelText="Your Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your name."
        onInput={inputHandler}
        importedStyle="box"
      />
      )}
      <Input
        id="email"
        element="input"
        type="email"
        labelText="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email address."
        onInput={inputHandler}
        importedStyle="box"
        />
        <Input
        id="password"
        element="input"
        type="password"
        labelText="Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a password (minimum 5 characters)."
        onInput={inputHandler}
        importedStyle="box"
        />
        <Button
          type="submit"
          disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
    </form>
    <br />
    <Button
      inverse
      onClick={switchModeHandler}>
      {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
  </Card>
  </React.Fragment>
  )
}

export default Auth;
