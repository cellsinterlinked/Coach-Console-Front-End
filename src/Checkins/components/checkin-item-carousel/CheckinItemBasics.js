import React, {useContext} from 'react'

 import { GiPincers } from "react-icons/gi";
 import { FaWeight } from "react-icons/fa";
 import { GoCalendar } from "react-icons/go";
 import { FaCalendarWeek } from "react-icons/fa";
import { GiMuscularTorso } from "react-icons/gi";
import CheckinData from "../CheckinData";

const margin = {
  marginBottom: ".5rem"
};

const CheckinItemBasics = props => {

  return(
    <div className="checkinItem-inner-container">
     <CheckinData children={<GoCalendar style={{ height: "2rem", width: "auto", color: "#bf00ff" }}/>}
       dataTitle="Date of Checkin" data={props.date} style={margin}/>
       
       <CheckinData
      children={
        <FaWeight style={{ height: "2rem", width: "auto", color: "#2fc6a6" }} />
      }
      dataTitle="Weight at Checkin"
      data={props.weight}
      style={margin}
    />

    <CheckinData
      children={
        <FaCalendarWeek
          style={{ height: "2rem", width: "auto", color: "#db8515" }}
        />
      }
      dataTitle="Week of Checkin"
      data={props.weeksOut}
      style={margin}
    />

    <CheckinData
      children={
        <GiPincers
          style={{ height: "2rem", width: "auto", color: "#ff0000" }}
        />
      }
      dataTitle="Body Fat%"
      data={props.bodyFat}
      style={margin}
    />

    <CheckinData
      children={
        <GiMuscularTorso
          style={{ height: "2rem", width: "auto", color: "#006eff" }}
        />
      }
      dataTitle="Lean Body Mass"
      data={props.leanBodyMass}
      style={margin}
    />
       </div>
    )
    
  }
export default CheckinItemBasics;




// import React, {useContext}from 'react';
//  import { DarkModeContext } from "../../Shared/context/dark-mode-context";
//  import { GiPincers } from "react-icons/gi";
//  import { FaWeight } from "react-icons/fa";
//  import { GoCalendar } from "react-icons/go";
//  import { FaCalendarWeek } from "react-icons/fa";
// import { GiMuscularTorso } from "react-icons/gi";
//  import CheckinData from "../CheckinData";

// const CheckinItemBasics = props => {
//   const mode = useContext(DarkModeContext);
// return (
//   <div className="checkinItem-inner-container">
//     <CheckinData
//       children={
//         <GoCalendar
//           style={{ height: "2rem", width: "auto", color: "#bf00ff" }}
//         />
//       }
//       dataTitle="Date of Checkin"
//       data={props.date}
//     />

//     <CheckinData
//       children={
//         <FaWeight style={{ height: "2rem", width: "auto", color: "#2fc6a6" }} />
//       }
//       dataTitle="Weight at Checkin"
//       data={props.weight}
//     />

//     <CheckinData
//       children={
//         <FaCalendarWeek
//           style={{ height: "2rem", width: "auto", color: "#db8515" }}
//         />
//       }
//       dataTitle="Week of Checkin"
//       data={props.weeksOut}
//     />

//     <CheckinData
//       children={
//         <GiPincers
//           style={{ height: "2rem", width: "auto", color: "#ff0000" }}
//         />
//       }
//       dataTitle="Body Fat%"
//       data={props.bodyFat}
//     />

//     <CheckinData
//       children={
//         <GiMuscularTorso
//           style={{ height: "2rem", width: "auto", color: "#006eff" }}
//         />
//       }
//       dataTitle="Lean Body Mass"
//       data={props.leanBodyMass}
//     />
//   </div>
// );
// }
// export default CheckinItemBasics;
