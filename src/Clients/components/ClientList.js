import React from 'react';
import ClientItem from './ClientItem';
import Button from '../../Shared/components/FormElements/Button';
import './ClientList.css';

const ClientList = props => {
  if (props.items.length === 0) {
    return (

     <div className="center">
      <h2>No Clients Yet. </h2>
    </div>
    )
  }

  return (
    <React.Fragment>
    <h2 className="clients-title">Your Clients</h2>
    <hr />
    <ul className="clients-list">
      {props.items.map(client => {
        return (
        <ClientItem 
          key={client.id} 
          id={client.id} 
          image ={client.image} 
          name={client.name} 
          checkinCount={client.checkins}/>
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