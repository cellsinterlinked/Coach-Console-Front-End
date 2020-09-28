import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/dark-mode-context';

import './Button.css';

const Button = props => {
  const mode = useContext(DarkModeContext);

  if (props.href) {
    return (
      <a
        className={mode.darkMode ? `dark-button button--${props.size || 'default'} ${props.inverse &&
          'dark-button--inverse'} ${props.danger && 'dark-button--danger'}` : `light-button button--${props.size || 'default'} ${props.inverse &&
            'light-button--inverse'} ${props.danger && 'light-button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={mode.darkMode ? `dark-button button--${props.size || 'default'} ${props.inverse &&
          'dark-button--inverse'} ${props.danger && 'dark-button--danger'}` : `light-button button--${props.size || 'default'} ${props.inverse &&
            'light-button--inverse'} ${props.danger && 'light-button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
    className={mode.darkMode ? `dark-button button--${props.size || 'default'} ${props.inverse &&
      'dark-button--inverse'} ${props.danger && 'dark-button--danger'}` : `light-button button--${props.size || 'default'} ${props.inverse &&
        'light-button--inverse'} ${props.danger && 'light-button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
