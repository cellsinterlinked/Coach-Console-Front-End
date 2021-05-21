import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {           
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {     
          continue;
        }
        if(inputId === action.inputId) {
          formIsValid = true 
        } else {
          formIsValid =true
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId] : { value: action.value, isValid: action.isValid }
        },
        isValid: true
      };
      case 'SET_DATA':
        return{
          inputs: action.inputs,
          isValid: true
        }
      default:
      return state;
      }
  };


export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {  
    inputs: initialInputs,
    isValid: true
  });


const inputHandler = useCallback((id, value, isValid) => {
  dispatch({
    type: 'INPUT_CHANGE', 
    value: value, 
    isValid: true, 
    inputId: id
  })
}, [])


const setFormData = useCallback((inputData, formValidity) => {
  dispatch({
    type: 'SET_DATA',
    inputs: inputData,
    formIsValid: true
  })
}, []);


return [formState, inputHandler, setFormData]
};