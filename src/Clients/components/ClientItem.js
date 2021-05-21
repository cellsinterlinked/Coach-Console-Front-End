import React, { useContext, useState, useEffect } from 'react';
import Avatar from '../../Shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './ClientItem.css'
import { useHttpClient } from '../../Shared/hooks/http-hook'; 

const ClientItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCheckins, setLoadedCheckins] = useState([])
  const mode = useContext(DarkModeContext)

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/checkins/athlete/${props.id}`);
        setLoadedCheckins(responseData.checkins)

      } catch (err) {}
    };
    fetchCheckins();
  }, [props.Id, props.id, sendRequest, setLoadedCheckins]);


  return <li className={mode.darkMode ? "dark-client-item" : "light-client-item"}>
   
    <Link to={`/${props.id}/checkins`}>
      <div className="client-background-image">

        {loadedCheckins.length > 0 && <div className="background-image-filter"></div>}
        {loadedCheckins.length > 0 && <img alt="" src={`http://localhost:5000/${loadedCheckins[0].image}`}/>}
        {loadedCheckins.length === 0 && <div className="background-placeholder" alt=""/>}


      </div>
      <div className={mode.darkMode ? "dark-client-item__image" : "light-client-item__image"}>
        <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
      </div>
      <div className={mode.darkMode ? "dark-client-item__info" : "light-client-item__info"}>
       <h2>{props.name}</h2>
       <h3>{props.checkinCount} {props.checkinCount === 1 ? "Checkin" : "Checkins"}</h3>
      </div>
      <div className="banner-container">
        <div className="banner-list">
      <div style={{background: "linear-gradient(#6d17cb, #2876f9)"}}className="banner-circle-display">
            <p>6</p>
          </div>
          <p>Weeks</p>
        </div>
        <div className="banner-list">
        <div style={{background: "linear-gradient(#14557b, #7fcec5)"}}className="banner-circle-display">
            <p>6</p>
          </div>
          <p>Checkin#</p>
        </div>
        <div className="banner-list">
          <div style={{background: "linear-gradient(#5f0a87,#a4508b)"}}className="banner-circle-display">
            <p>10%</p>
          </div>
          <p>BodyFat</p>
        </div>
      </div>
    </Link>
</li>
 
  
}


export default ClientItem;
      