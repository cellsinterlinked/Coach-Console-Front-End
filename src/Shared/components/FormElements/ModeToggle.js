import React, { useContext } from 'react';
import { DarkModeContext } from 'src/App.js';
import './ModeToggle.css'

const ModeToggle = () => {
  const {toggleTheme, themeMode} = useContext(DarkModeContext);
  const handleThemeChange = (e) => {
    console.log(e);
    toggleTheme();
  };

	return (
		<div
			className={
				themeMode === 'darkTheme'
					? 'dark-toggle-container'
					: 'light-toggle-container'
			}
		>
			<span style={{ color: themeMode === 'darkTheme' ? 'grey' : 'yellow' }}>☀︎</span>
			<span className={themeMode === 'darkTheme' ? 'dark-toggle' : 'light-toggle'}>
				<input
					checked={themeMode === 'darkTheme'}
					onChange={handleThemeChange}
					id='checkbox'
					className='checkbox'
					type='checkbox'
				/>
				<label htmlFor='checkbox' />
			</span>
			<span style={{ color: themeMode === 'darkTheme' ? 'slateblue' : 'grey' }}>
				☾
			</span>
		</div>
	);
};

export default ModeToggle;
