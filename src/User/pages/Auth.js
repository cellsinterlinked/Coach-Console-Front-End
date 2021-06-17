import React, { useState, useContext } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import Button from '../../Shared/components/FormElements/Button';
import Input from '../../Shared/components/FormElements/Input';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './Auth.css';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import Waves from '../../Shared/components/UIElements/Waves';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';
import DarkIconAnimation from '../../Shared/components/UIElements/DarkIconAnimation';

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const mode = useContext(DarkModeContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/user/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/user/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  if (isLoading) {
    return (
    <div className="center loaderOverlay">
      {!mode.darkMode && <IconAnimation loading={isLoading}/>}
      {mode.darkMode && <DarkIconAnimation loading={isLoading}/>}
    </div>
    )
  }

  return (
    <div style={{animation: "pageEnter 1s"}}>
      { !isLoading &&<div
        className={
          mode.darkMode ? 'auth-container auth-dark-back' : 'auth-container'
        }
      >
        <Waves />
        <MainNavigation />
        <ErrorModal error={error} onClear={clearError} />
        <Card className="authentication">

          {isLoginMode && <h2 className={mode.darkMode ? "login-head-dark" : "login-head-light"}>LOGIN</h2>}
          {!isLoginMode && <h2 className={mode.darkMode ? "login-head-dark" : "login-head-light"}>SIGNUP</h2>}
          {/* {mode.darkMode ? <DarkIconAnimation /> : <IconAnimation />} */}
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
            <br />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
          </form>
          <br />
          <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </Card>
      </div>}
    </div>
  );
};

export default Auth;
