import React, { useState, useContext} from "react";
import Button from '../../../Shared/components/FormElements/Button'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import ImageUpload from '../../../Shared/components/FormElements/ImageUpload'


const CheckinPictures = ({next}) => {

  const mode = useContext(DarkModeContext);
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false
      }

    })

    const [imageArray, setImageArray] = useState([]);
    const [parentPreview, setParentPreview] = useState(null)

    const arrayHandler = () => {
      const replacement = [...imageArray, {value: formState.inputs.image.value, url:parentPreview}]
      setImageArray(replacement)
      // setParentPreview(null)
      // error handling that says no more than six photos.
     
    }

    

    const submitHandler = (e) => {
      e.preventDefault()
      next(imageArray)
      
    }

  return (
    <form  className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={submitHandler}>
      <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>Upload Progress Pictures</h2>
      <div className="caliper-directions-box">
          <p>
            Upload a progress picture of your client from the date of this check
            in.{" "}
          </p>
        </div>
        <div className="checkin-image-box">
          <ImageUpload center id="image" onInput={inputHandler} setParentPreview={setParentPreview} errorText="" />
        </div>

        <div className="photo-list-prev-wrapper">
          {imageArray.length > 0 && imageArray.map((picture, index )=> <div key={index}className="photo-list-prev-box"><img alt="" src={picture.url} /></div>)}

        </div>
        

        <div className="submit-checkin" style={{marginTop: "2rem"}}>
          <Button
            type="button"
            disabled={!formState.isValid || imageArray.length === 6}
            onClick={arrayHandler}
          >
            {/* {imageArray.length === 0 ? "Add This Photo" : "Add Another Photo"} */}
            Add Photo To Gallery
          </Button>
          </div>

          {imageArray.length === 6 && <p className="photoWarning">Maximum of 6 Photos!</p>}

     
        <div className="submit-checkin" style={{marginTop: "2rem"}}>
          <Button
            type="submit"
            disabled={!formState.isValid || imageArray.length === 0}
          >
            Next
          </Button>
        </div>
    </form>
  )
}

export default CheckinPictures
