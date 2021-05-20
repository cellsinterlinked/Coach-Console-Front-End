import React, { useContext } from 'react';
import ClientItem from './ClientItem';
import Button from '../../Shared/components/FormElements/Button';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './ClientList.css';
import {GiWeightLiftingDown} from 'react-icons/gi';
import { Link } from 'react-router-dom';

const ClientList = props => {
  const mode = useContext(DarkModeContext);

  if (props.items.length === 0) {
    return (

     <div className="center">
      <h2>No Clients Yet. </h2>
    </div>
    )
  }

  return (
    <React.Fragment>
    <div className="client-list-header__holder">
    <GiWeightLiftingDown className="weight-lifter"/>
    <h2 className={mode.darkMode ? "dark-clients-title" : "light-clients-title"}>Your Clients</h2>
    <p className={mode.darkMode ? "your-clients-number-dark" : 'your-clients-number-light'}>{`${props.items.length} Clients`}</p>

    </div>
    {/* <hr className={mode.darkMode ? "dark-break" : "light-break"} /> */}
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