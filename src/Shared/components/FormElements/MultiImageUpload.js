import React from 'react';
import './ImageUpload.css';
import Button from './Button';
import { DarkModeContext} from '../../context/dark-mode-context';

const MultiImageUpload = () => {
  const mode = useContext(DarkModeContext);

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const [fileArray, setFileArray]= useState([])

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();  
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file)
  }, [file])


  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  };





  return (
    <div className="form-control">
      <input 
        id={props.id} 
        ref={filePickerRef}
        style={{ display: 'none' }} 
        type="file" 
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
          <div className={mode.darkMode ? "dark-image-upload__preview" : "light-image-upload__preview"}>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <p>Please pick an image.</p>}
            </div>
            <Button  type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}
}

export default MultiImageUpload;