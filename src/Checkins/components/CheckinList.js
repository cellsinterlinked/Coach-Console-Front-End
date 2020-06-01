import React from 'react';
import CheckinItem from './CheckinItem';
import Card from '../../Shared/components/UIElements/Card';
import CheckinTotals from '../components/CheckinTotals';
import Button from '../../Shared/components/FormElements/Button';
import './CheckinList.css'


const CheckinList = props => {

  const totalBf = props.items[0].bodyfat - props.items[props.items.length - 1].bodyfat
    console.log(totalBf)

  if (props.items.length === 0) {
    return (
      <div className="client-list center">
      <Card>
        <h2>No checkins found. Maybe create one?</h2>
        <Button to="/checkins/new">Log Progress</Button>
      </Card>
      </div>
    )
  }

return <React.Fragment> 
 <CheckinTotals 
    name={props.items[0].name}
    client={props.items[0].client} /> 
<ul className="client-list">
  {props.items.map(checkin => (
    <CheckinItem
      key={checkin.id}
      id={checkin.id}
      image={checkin.imageUrl}
      date={checkin.date}
      weight={checkin.weight}
      weeks_in={checkin.weeks_in}
      bodyfat={checkin.bodyfat}
      week_loss={checkin.week_loss}
      creator={checkin.creator} 
      notes={checkin.notes}
      />
  ))}
</ul>
</React.Fragment>

}
export default CheckinList;