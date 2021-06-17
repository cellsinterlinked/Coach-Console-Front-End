import React, { useContext } from 'react';
import ClientItem from './ClientItem';
import Button from '../../Shared/components/FormElements/Button';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './ClientList.css';
import squat from '../../Shared/Resources/squat.jpg';

const ClientList = props => {
  const mode = useContext(DarkModeContext);

  if (props.items.length === 0) {
    return (

     <div className={mode.darkMode ? "center dark-no-clients-wrapper" : "center light-no-clients-wrapper"}>
      <h2>No Clients Yet. </h2>
      <Button to="/newclient">ADD NEW CLIENT</Button>
    </div>
    )
  }

  return (
    <React.Fragment>
    <div className="client-list-header__holder">
    <div  className="header-background-wrapper">
      <img alt="" style={{opacity: mode.darkMode ? "0.7" : "0.9"}} src={squat}></img>
    <h2 className={mode.darkMode ? "dark-clients-title" : "light-clients-title"}>Your Clients</h2>
    {props.items.length !== 1 ? <p className={mode.darkMode ? "your-clients-number-dark" : 'your-clients-number-light'}>{`${props.items.length} Clients`}</p> : 
     <p className={mode.darkMode ? "your-clients-number-dark" : 'your-clients-number-light'}>{`${props.items.length} Client`}</p>
    } 

    
    </div>

    </div>
    <div className={mode.darkMode ? "dark-page-split" : "light-page-split"}></div>
    <ul className="clients-list">
      {props.items.map(client => {
        return (
        <ClientItem 
          key={client.id} 
          id={client.id} 
          image={client.image} 
          name={client.name} 
          checkinCount={client.checkins.length}/>
        
      )})}

    </ul>
    <div className="new-client__button">
      <Button 
        to="/newclient"
        buttonStyle="button-new-client"
        >ADD NEW CLIENT</Button>
    </div>
    </React.Fragment>
  )


};


export default ClientList;