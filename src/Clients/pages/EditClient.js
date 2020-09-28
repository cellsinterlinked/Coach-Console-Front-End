import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, } from '../../Shared/util/validators';
import Card from '../../Shared/components/UIElements/Card';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import './ClientForm.css';
import { DarkModeContext } from '../../App';



const EditClient = () => {
  const {themeMode} = useContext(DarkModeContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedClient, setLoadedClient] = useState();

  const clientId = useParams().clientId;

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm({
    name: {
      value: '',
      isValid: true
    },

  }, false)

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/athletes/${clientId}`);
        setLoadedClient(responseData.athlete)
        setFormData(
          {
            name: {
            value: responseData.athlete.name,
            isValid: true
            }
          }, true
        )
      } catch (err) {}
    }
    fetchClient();
  }, [sendRequest, clientId, setFormData])




  const clientUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/athletes/${clientId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push(`/${clientId}/checkins`)
    } catch (err) {}
  };

  if (isLoading) {
    return <div className="center">
    <Card>
      <LoadingSpinner />
    </Card>
    </div>
  }

  if (!loadedClient && !error) {
    return <div className="center">
      <Card>
        <h2>Could not find Client!</h2>
      </Card>
    </div>
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    {!isLoading && loadedClient &&
    <form className={themeMode === 'darkTheme' ? "dark-new-client__form" : "light-new-client__form"} onSubmit={clientUpdateSubmitHandler}>
    <h2 className={themeMode === 'darkTheme' ? "dark-create-client-head" : "light-create-client-head"}>What would you like to change?</h2>

    <div className="input-group__4">
    <Input
      id="name"
      element="input"
      type="text"
      labelText="Name"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid name."
      onInput={inputHandler}
      initialValue={loadedClient.name}
      initialValid={true}
      importedStyle="group-4"
    />
    </div>
    <div className="button-box">
    <Button
      type="submit"
      disabled={!formState.isValid}
      buttonStyle="update-button"
      >UPDATE CLIENT</Button>
    </div>

    </form>}
    </React.Fragment>
  )
}

export default EditClient;