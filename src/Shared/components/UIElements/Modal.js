import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';
import { DarkModeContext } from '../../../Shared/context/dark-mode-context';
import './Modal.css';

const ModalOverlay = props => {
  const mode = useContext(DarkModeContext)
  
  const content = (
    <div className={mode.darkMode ? 'dark-modal' : 'light-modal'} >
      <header className={mode.darkMode ? 'dark-modal__header' : 'light-modal__header'}>
        <h2>{props.header}</h2>
      </header>
      <form 
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
        >
        <div className ={mode.darkMode ? 'dark-modal__content' : 'light-modal__content'}>
          {props.children}
        </div>
        <footer className={mode.darkMode ? 'dark-modal__footer' : 'light-modal__footer'}>
          {props.footer}
        </footer>
        </form>                                                      
    </div>
    );                                                                   
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));  
  };
  
  const Modal = props => {
    const mode = useContext(DarkModeContext)
    return (
      <React.Fragment>
        {props.show && <Backdrop onCLick={props.onCancel} />}
        <CSSTransition 
          in={props.show} 
          mountOnEnter 
          unmountOnExit 
          timeout={200} 
          classNames={mode.darkMode ? "dark-modal" : "light-modal"}   
          >
            <ModalOverlay {...props} />
          </CSSTransition>
      </React.Fragment>
    )
  }
  
  export default Modal;
    
    
    
