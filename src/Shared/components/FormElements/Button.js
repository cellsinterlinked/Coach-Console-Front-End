import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../App';

import './Button.css';

const Button = props => {
  const {themeMode} = useContext(DarkModeContext);

  if (props.href) {
    return (
      <a
        className={themeMode === 'darkTheme' ? `dark-button button--${props.size || 'default'} ${props.inverse &&
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
        className={themeMode === 'darkTheme' ? `dark-button button--${props.size || 'default'} ${props.inverse &&
          'dark-button--inverse'} ${props.danger && 'dark-button--danger'}` : `light-button button--${props.size || 'default'} ${props.inverse &&
            'light-button--inverse'} ${props.danger && 'light-button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
    className={themeMode === 'darkTheme' ? `dark-button button--${props.size || 'default'} ${props.inverse &&
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
