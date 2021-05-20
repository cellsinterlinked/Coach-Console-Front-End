import React, {useContext} from 'react';
import CheckinItem from './CheckinItem';
import Card from '../../Shared/components/UIElements/Card';
import CheckinTotals from '../components/CheckinTotals';
import Button from '../../Shared/components/FormElements/Button';
import './CheckinList.css'
import {DarkModeContext} from '../../Shared/context/dark-mode-context';
import { Link } from 'react-router-dom';



const CheckinList = props => {
  const mode = useContext(DarkModeContext);
  const clientId = props.clientId; 

  const tempArray = [1, 2, 3, 4, 5, 6]
  
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
{/* props.items.map */}
{/* to={`/${clientId}/${checkin.id}` */}

<div className="big-checkin-list">
  {tempArray.map(checkin => (
    <Link className={mode.darkMode ? "dark-checkin-card" : "light-checkin-card"} to={`/`}>
      <div className="checkin-card-backdrop">
        <img alt="" src="https://www.orlandocatcafe.com/wp-content/uploads/2020/07/12.png" />
        
      </div>
    <p className={mode.darkMode ? "dark-checkin-card-date" : "light-checkin-card-date"}>05/17/2021</p>
    <div className="checkin-card-img-wrapper p1">
    <img alt="" src="https://www.orlandocatcafe.com/wp-content/uploads/2020/07/12.png" />
    </div>
    <div className="checkin-card-img-wrapper p2">
    <img alt="" className="p2" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rescuepets.com.au%2Fapp%2Fuploads%2F1%2F886d92993c90c6a6bd6308706c4a24ac951c7272a515d64392214ee7d170dab4.jpg-1500x.jpg&f=1&nofb=1" />
    </div>
    <div className="checkin-card-img-wrapper p3">
    <img alt="" className="p3" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fviralcats.net%2Fblog%2Fwp-content%2Fuploads%2F2020%2F02%2FRelaxed-by-Ionut-Donici.jpg&f=1&nofb=1" />
    </div>

    <div className={mode.darkMode ? "dark-checkin-card-stats-wrapper" : "checkin-card-stats-wrapper"}>
      <section >
        <h1>6</h1>
        <p>Week</p>
      </section>
      <div className={mode.darkMode ? "dark-card-vert-divider" : "light-card-vert-divider"}></div>
      <section >
        <h1>5</h1>
        <p>Check-ins</p>
      </section>
    </div>

    </Link>
    // <CheckinItem
    //   key={checkin.id}
    //   id={checkin.id}
    //   image={checkin.image}
    //   date={checkin.date}
    //   weight={checkin.weight}
    //   weeksOut={checkin.weeksOut}
    //   bodyFat={checkin.bodyFat}
    //   leanBodyMass={checkin.leanBodyMass}
    //   fatMass={checkin.fatMass}
    //   athlete={checkin.athlete} 
    //   notes={checkin.notes}
    //   neckMeasure={checkin.neckMeasure}
    //   armMeasure={checkin.armMeasure}
    //   chestMeasure={checkin.chestMeasure}
    //   waistMeasure={checkin.waistMeasure}
    //   hipsMeasure={checkin.hipsMeasure}
    //   thighMeasure={checkin.thighMeasure}
    //   calfMeasure={checkin.calfMeasure}
    //   chest={checkin.chest}
    //   axilla={checkin.axilla}
    //   tricep={checkin.tricep}
    //   subscapular={checkin.subscapular}
    //   abdominal={checkin.abdominal}
    //   suprailiac={checkin.suprailiac}
    //   thigh={checkin.thigh}
    //   cardioDuration={checkin.cardioDuration}
    //   cardioCalories={checkin.cardioCalories}

    
    //   onDelete={props.onDeleteCheckin}
    //   />
  ))}
</div>
</React.Fragment>
)
}
export default CheckinList;