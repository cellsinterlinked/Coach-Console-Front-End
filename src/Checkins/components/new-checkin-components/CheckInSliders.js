import React, {useContext} from "react";
import Button from '../../../Shared/components/FormElements/Button'
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'

const CheckinSliders = ({
  setBfDisplay, 
  bfDisplay, 
  setNotesDisplay, 
  notesDisplay, 
  picDisplay, 
  setPicDisplay, 
  measureDisplay, 
  setMeasureDisplay, 
  cardioDisplay, 
  setPageNum,
  setCardioDisplay}) => {

  const mode = useContext(DarkModeContext);

  const bfUnchecked = () => {
    setBfDisplay(false);
  }
  const bfChecked = () => {
    setBfDisplay(true);
  };

  const notesChecked = () => {
    setNotesDisplay(true)
 
 }
 const notesUnchecked = () => {
   setNotesDisplay(false);
 }

 const imageChecked = () => {
  setPicDisplay(true)
}

const imageUnchecked = () => {
 setPicDisplay(false)
}

const measurementsChecked = () => {
  setMeasureDisplay(true);
}

const measurementsUnchecked = () => {
  setMeasureDisplay(false);
}

const cardioChecked = () => {
  setCardioDisplay(true)
};

const cardioUnchecked = () => {
  setCardioDisplay(false)
};

  

  return (
<div className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"}>
<h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>What Do You Want To Log?</h2>
       <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>

        <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
        <span style={{ color: bfDisplay ? "grey" : "#b618ff" }}>No</span>
        <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
    <input  
    checked={bfDisplay}
    onChange={bfDisplay ? bfUnchecked : bfChecked } 
    id="bfCheckbox"
    className="checkbox"
    type="checkbox"
  />
      <label htmlFor="bfCheckbox" />
      </span>
      <span style={{ color: bfDisplay ? "#b618ff" : "grey" }}>Yes</span>
      </div>

<p>Log Caliper Data?</p>
</div>



<div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: notesDisplay ? "grey" : "#b618ff" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={notesDisplay}
              onChange={notesDisplay ? notesUnchecked : notesChecked} 
              id="notesCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="notesCheckbox" />
          </span>
          <span style={{ color: notesDisplay ? "#b618ff" : "grey" }}>Yes</span>
        </div>

        <p>Log Notes?</p>
        </div>


        <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: picDisplay ? "grey" : "#b618ff" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={picDisplay}
              onChange={picDisplay ? imageUnchecked : imageChecked} 
              id="imageCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="imageCheckbox" />
          </span>
          <span style={{ color: picDisplay ? "#b618ff" : "grey" }}>Yes</span>
        </div>

        <p>Upload Progess Photos?</p>
        </div>



        <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: measureDisplay ? "grey" : "#b618ff" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={measureDisplay}
              onChange={measureDisplay ? measurementsUnchecked : measurementsChecked} 
              id="measurementsCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="measurementsCheckbox" />
          </span>
          <span style={{ color: measureDisplay ? "#b618ff" : "grey" }}>Yes</span>
        </div>

        <p>Log Measurements?</p>
        </div>



        <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: cardioDisplay ? "grey" : "#b618ff" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={cardioDisplay}
              onChange={cardioDisplay ? cardioUnchecked : cardioChecked} 
              id="cardioCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="cardioCheckbox" />
          </span>
          <span style={{ color: cardioDisplay ? "#b618ff" : "grey" }}>Yes</span>
        </div>

        <p>Log Cardio Activity?</p>
        </div>


<div className="submit-checkin" style={{marginTop: "2rem"}}>
          <Button
            type="submit"
            onClick={() => setPageNum(1)} 
          >
            Next
          </Button>
        </div>

</div>
  )
}

export default CheckinSliders;