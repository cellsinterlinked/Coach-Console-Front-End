import React, {useContext} from 'react'
import CheckinData from "../CheckinData";
import './CheckinItemCarousel.css';

const CheckinItemMeasurements = props => {

  return(
    <div className="checkinItem-inner-container">
    <CheckinData dataTitle="Neck Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.neckMeasure}"</p>} />
    <CheckinData dataTitle="Arm Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.armMeasure}"</p>} />
    <CheckinData dataTitle="Chest Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.chestMeasure}"</p>}  />
    <CheckinData dataTitle="Waist Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.waistMeasure}"</p>}  />
    <CheckinData dataTitle="Hips Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.hipsMeasure}"</p>}  />
    <CheckinData dataTitle="Thigh Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.thighMeasure}"</p>}  />
    <CheckinData dataTitle="Calf Measurement" children={<p style={{fontSize: "1rem", color: "red"}}>{props.calfMeasure}"</p>}  />
    </div>
  )
}

export default CheckinItemMeasurements;