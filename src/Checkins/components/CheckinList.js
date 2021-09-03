import React, {useContext} from 'react';
import Card from '../../Shared/components/UIElements/Card';
import CheckinTotals from '../components/CheckinTotals';
import Button from '../../Shared/components/FormElements/Button';
import './CheckinList.css'
import {DarkModeContext} from '../../Shared/context/dark-mode-context';
import { Link } from 'react-router-dom';
import Silhouette from '../../Shared/Resources/mohamed-awwam-4tbNydgkJiI-unsplash.jpg';



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
{/* props.items.map */}
{/* to={`/${clientId}/${checkin.id}` */}

<div className="big-checkin-list">
  {/* {props.items.map(checkin => <Link to={`/${clientId}/${checkin.id}`} ><button>Press me</button> </Link>)} */}
  {props.items.map((checkin, index) => (
    <Link key={index} className={mode.darkMode ? "dark-checkin-card" : "light-checkin-card"} to={`/${clientId}/${checkin.id}`}>
      <div className="filter"></div>
      <div className="checkin-card-backdrop">
        {checkin.image[0] && <img alt="" src={checkin.image[0]} />}
        {!checkin.image[0] && <img alt="" src={Silhouette}></img>}
      </div>
    <p className={mode.darkMode ? "dark-checkin-card-date" : "light-checkin-card-date"}>{checkin.date.slice(0, 10)}</p>

    {checkin.image && checkin.image.map((image, index) => <div key={index} className={`checkin-card-img-wrapper p${index + 1}`}>
    <img alt={Silhouette} src={image} />
    </div> )}

    {!checkin.image[0] && <div className="checkin-card-img-wrapper ">
      <img src={Silhouette} alt=""></img>
      </div>}


    <div className={mode.darkMode ? "dark-checkin-card-stats-wrapper" : "checkin-card-stats-wrapper"}>
      <section >
        <h1>{checkin.weeksOut}</h1>
        <p>Week</p>
      </section>
      <div className={mode.darkMode ? "dark-card-vert-divider" : "light-card-vert-divider"}></div>
      <section >
        <h1>{index + 1}</h1>
        <p>Check-ins</p>
      </section>
    </div>

    </Link>
  
  ))}
</div>
</React.Fragment>
)
}
export default CheckinList;