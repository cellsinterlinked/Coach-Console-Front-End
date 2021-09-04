import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import Card from '../../Shared/components/UIElements/Card';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import './ClientForm.css';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import { AuthContext } from '../../Shared/context/auth-context';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';
import DarkIconAnimation from '../../Shared/components/UIElements/DarkIconAnimation';

const EditClient = () => {
  const mode = useContext(DarkModeContext);
  const auth = useContext(AuthContext)

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedClient, setLoadedClient] = useState();

  const clientId = useParams().clientId;

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/athletes/${clientId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token,
          }
        
        );
        setLoadedClient(responseData.athlete);
        setFormData(
          {
            name: {
              value: responseData.athlete.name,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchClient();
  }, [sendRequest, clientId, setFormData, auth.token]);

  const clientUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/athletes/${clientId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token

        }
      );
      history.push(`/${clientId}/checkins`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
    <li className={mode.darkMode ? 'dark-client-item' : 'light-client-item'}>
    {mode.darkMode ? <div className="center dark-loaderOverlay">
      <DarkIconAnimation loading={isLoading} />
    </div> : <div className="center loaderOverlay">
      <IconAnimation loading={isLoading} />
    </div>}
    </li>

    )
  }

  if (!loadedClient && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Client!</h2>
        </Card>
      </div>
    );
  }

  return (
    
    <div
      className={
        mode.darkMode
          ? 'new-client-container dark-new-client'
          : 'new-client-container'
      }
    >
      <MainNavigation />
      <ErrorModal error={error} onClear={clearError} />
      <form
        className={
          mode.darkMode ? 'dark-new-client__form' : 'light-new-client__form'
        }
        onSubmit={clientUpdateSubmitHandler}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <h2
          className={
            mode.darkMode
              ? 'dark-create-client-head'
              : 'light-create-client-head'
          }
        >
          Edit Client Info
        </h2>
        <br />
        <Input
          id="name"
          labelText="Name"
          element="input"
          type="text"
          errorText="Please enter valid name"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          importedStyle="new-client__inputs"
        />

        {/* <ImageUpload center id="image" onInput={inputHandler} errorText="" /> */}
        <div
          className={
            mode.darkMode
              ? 'dark-new-client-button__box'
              : 'light-new-client-button__box'
          }
        >
          <Button
            type="submit"
            disabled={!formState.isValid}
            buttonStyle="new-client-button"
          >
            UPDATE CLIENT
          </Button>
        </div>
      </form>
    </div>
    
  );
};

export default EditClient;
