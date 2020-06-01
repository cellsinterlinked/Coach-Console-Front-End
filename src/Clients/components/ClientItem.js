import React from 'react';
import Avatar from '../../Shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import Card from '../../Shared/components/UIElements/Card';
import './ClientItem.css'


const ClientItem = props => {
  return <li className="client-item">
    <Card className="client-item__content">
    <Link to={`/${props.id}/checkins`}>
      <div className="client-item__image">
        <Avatar image={props.image} alt={props.name} />
      </div>
      <div className="client-item__info">
       <h2>{props.name}</h2>
       <h3>{props.checkinCount} {props.checkinCount === 1 ? "Checkin" : "Checkins"}</h3>
      </div>
    </Link>
    </Card>
</li>
 
  
}


export default ClientItem;
      