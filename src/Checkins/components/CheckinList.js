import React, {useContext} from 'react';
import CheckinItem from './CheckinItem';
import Card from '../../Shared/components/UIElements/Card';
import CheckinTotals from '../components/CheckinTotals';
import Button from '../../Shared/components/FormElements/Button';
import './CheckinList.css'
import {DarkModeContext} from '../../Shared/context/dark-mode-context';



const CheckinList = props => {
  const mode = useContext(DarkModeContext);
  const clientId = props.clientId; 
  
  if (props.items.length === 0) {
    return (
      <div className= "client-list center">
      <Card className={mode.darkMode ? "dark-no-checkins-card" : "light-no-checkins-card"}>
        <h2>No checkins found. Maybe create one?</h2>
        <Button to={`/${clientId}/newcheckin`}>Log Progress</Button> 
        {/* SEND TO CORRECT URL */}
      </Card>
      </div>
    )
  }

return (
<React.Fragment> 
 <CheckinTotals
    clientId={props.clientId} 
    name={props.items[0].name}
    client={props.items[0].client}
    items = {props.items}
    />


<ul className="client-list">
  {props.items.map(checkin => (
    <CheckinItem
      key={checkin.id}
      id={checkin.id}
      image={checkin.image}
      date={checkin.date}
      weight={checkin.weight}
      weeksOut={checkin.weeksOut}
      bodyFat={checkin.bodyFat}
      leanBodyMass={checkin.leanBodyMass}
      fatMass={checkin.fatMass}
      athlete={checkin.athlete} 
      notes={checkin.notes}
      neckMeasure={checkin.neckMeasure}
      armMeasure={checkin.armMeasure}
      chestMeasure={checkin.chestMeasure}
      waistMeasure={checkin.waistMeasure}
      hipsMeasure={checkin.hipsMeasure}
      thighMeasure={checkin.thighMeasure}
      calfMeasure={checkin.calfMeasure}
      chest={checkin.chest}
      axilla={checkin.axilla}
      tricep={checkin.tricep}
      subscapular={checkin.subscapular}
      abdominal={checkin.abdominal}
      suprailiac={checkin.suprailiac}
      thigh={checkin.thigh}
      cardioDuration={checkin.cardioDuration}
      cardioCalories={checkin.cardioCalories}

    
      onDelete={props.onDeleteCheckin}
      />
  ))}
</ul>
</React.Fragment>
)
}
export default CheckinList;