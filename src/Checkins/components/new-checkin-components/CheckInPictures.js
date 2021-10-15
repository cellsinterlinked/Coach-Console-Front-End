import React, { useState, useContext} from "react";
import Button from '../../../Shared/components/FormElements/Button'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import ImageUpload from '../../../Shared/components/FormElements/ImageUpload'
import Axios from 'axios'


const CheckinPictures = ({next, handlePublicIds}) => {

  const mode = useContext(DarkModeContext);
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false
      }

    })
  const [ids, setIds] = useState([])

    const [imageArray, setImageArray] = useState([]);
    const [parentPreview, setParentPreview] = useState(null)

    const arrayHandler = async () => {

    let res

    async function uploadImage() {
      const formData = new FormData();
      
      formData.append("upload_preset", "coach-console-athletes")
      formData.append('file', formState.inputs.image.value)
      formData.append('cloud_name', "dbnapmpvm")
      try {
          res = await Axios.post(process.env.REACT_APP_CLOUDINARY_URL, 
          formData
        )
        } catch (err) {
            console.log("cloudinary didn't work")
          }
        }
        await uploadImage()
      
      
      // const replacement = [...imageArray, {value: res.data.url, url:res.data.url}]
      const replacement = [...imageArray, res.data.url]
      const idreplacement = [...ids, res.data.public_id]
      setImageArray(replacement)
      setIds(idreplacement)
      setParentPreview(null)
      console.log(res.data.public_id)
     
    }

    

    const submitHandler = (e) => {
      e.preventDefault()
      next(imageArray)
      handlePublicIds(ids)
      
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
          {imageArray.length > 0 && imageArray.map((picture, index )=> <div key={index}className="photo-list-prev-box"><img alt="" src={picture} /></div>)}

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
