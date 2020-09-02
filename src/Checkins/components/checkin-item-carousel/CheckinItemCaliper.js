import React, {useContext} from 'react'
import CheckinData from "../CheckinData";
import './CheckinItemCarousel.css';

const CheckinItemCaliper = props => {

  return(
    <div className="checkinItem-inner-container">
    <CheckinData dataTitle="Chest Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.chest}mm</p>} />
    <CheckinData dataTitle="Axilla Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.axilla}mm</p>} />
    <CheckinData dataTitle="Tricep Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.tricep}mm</p>}  />
    <CheckinData dataTitle="Subscapular Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.subscapular}mm</p>}  />
    <CheckinData dataTitle="Abdominal Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.abdominal}mm</p>}  />
    <CheckinData dataTitle="Suprailiac Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.suprailiac}mm</p>}  />
    <CheckinData dataTitle="Thigh Measurement" children={<p style={{fontSize: "1rem", color: "green"}}>{props.thigh}mm</p>}  />
    </div>
  )
}

export default CheckinItemCaliper;