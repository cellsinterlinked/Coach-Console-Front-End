import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import '../../pages/CheckinForm.css'
import Button from '../../../Shared/components/FormElements/Button'

const CheckinFinal = ({checkinSubmitHandler}) => {
  const mode = useContext(DarkModeContext);

  return(
    <div className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} >
      <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>That Wraps Things Up!</h2>
      <p className={mode.darkMode ? "dark-final-instructions" : "light-final-instructions"}>Click Submit To Submit Your Check-In And Return To The Totals Screen!</p>
      {/* have a loading screen where you submit the data. Its followed up by a new button that is a link back to the client's page */}
      <div className="submit-checkin" style={{marginTop: "2rem"}}>
          <Button onClick={checkinSubmitHandler}>
            Submit
          </Button>
        </div>
    </div>
  )
}

export default CheckinFinal 