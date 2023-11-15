
import { useState } from "react"
import "./DeleteForm.scss"


const DeleteForm = ({toDelete = "???", deleteAction}) =>{


    const [verifyDelTxt, setVerifyDelTxt ] = useState("")
    const toMatch = "Magidekt!"

    const handleDelInput = (e) => {
        setVerifyDelTxt(e.target.value);
    };

    const handleDelete = async (e)=>{
        e.preventDefault()
        await deleteAction();
    }

    return(
      <form className="DeleteForm">
        <h3>To delete your {toDelete}, type the following:</h3>
        <p>Magidekt!</p>
        <input type="text" onChange={handleDelInput} value={verifyDelTxt}/>
        <br/>
        <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={toMatch !== verifyDelTxt}
        > Delete {toDelete} </button>
      </form>
    )
}

export default DeleteForm;