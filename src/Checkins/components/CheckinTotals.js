import React from 'react';
import './CheckinTotals.css';
import Card from '../../Shared/components/UIElements/Card'
import { Link } from 'react-router-dom';
import Button from '../../Shared/components/FormElements/Button';

const CheckinTotals = props => {
  return (
    <Card className="totals-card" >
    <div className="totals-info">

    <h1 className="client-name">{props.name}</h1>
    <hr />
    <div className="graph-image">
      <img src="https://straighthealth.com/wp-content/uploads/2016/02/weight-vs-calorie-intake-15Sep13.jpg" alt="graph" />
    </div>
    <h3>XX BodyFat Lost Total</h3>
    <hr />
    <h3>XX Bodyweight Lost Total</h3>
    <hr />
    <h3>Show/End Date</h3>
    <hr />
    <h3>Stuff</h3>
    </div>
    <footer>
    <Link to={`/${props.client}/newcheckin`}>
    <div className="new-checkin-box">
      <Button
      buttonStyle="new-checkin__button"
      >New Checkin</Button>
    </div>
    </Link>
    </footer>
    </Card>
    
    
  )
}

export default CheckinTotals;