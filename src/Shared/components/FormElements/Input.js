import React, { useReducer, useEffect, useContext } from 'react';     // use reducer for more complex or interconnected state. 
import { validate } from '../../util/validators';
import './Input.css';
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'; 

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
      case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default : 
      return state
  }
}

const Input = props => {
  const mode = useContext(DarkModeContext);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',               //initialize form with value(if it already has one like in the case of place update where it starts already having a value)if not, an empty string
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE', 
      val: event.target.value,
      validators: props.validators
    })
  };

  const touchHandler = event => {
    dispatch({
      type: 'TOUCH'
    })
  }

  const element = props.element === 'input' ? ( 
  
  <div className={mode.darkMode ? "dark-form" : "light-form" }>
  <input
    required
    autocomplete="off"  
    id={props.id}
    name={props.id} 
    type={props.type} 
    placeholder=""
    onChange={changeHandler}
    onBlur={touchHandler}
    value={inputState.value}
    className={props.importedStyle}
    /> 
    <label for={props.id} className={"label-name"}>
      <span className="content-name">{props.labelText}</span>
    </label>
    </div>
   
    
    ) : (
  <div className={mode.darkMode ? "dark-form-text" : "light-form-text"}>
  <label>Notes</label>
  <textarea 
    id={props.id} 
    rows={props.rows || 6} 
    onChange={changeHandler} 
    onBlur={touchHandler}
    value = {inputState.value}
    className={props.importedStyle}
    />
    </div>
    
    )
  

  return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
  <label htmlFor={props.id}>{props.label}</label>
  {element}
  {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
  </div>
};

export default Input;