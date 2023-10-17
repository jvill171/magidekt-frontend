import React, { useContext, useState } from "react";
import "./AuthForm.scss"
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

/**AuthForm
 * Takes 2 params:
 *      formTitle - a string
 *      formAttr - an object like:
 *          {
 *              name, initVal, label,
 *              type, disabled
 *          }
 *  NOTE: name, initVal, and label are REQUIRED, else form breaks !!!
 */
const AuthForm = ({ formTitle, formAttr, submitAction }) =>{

    // Generate the initial state for formData
    const INIT_FORMDATA = 
        formAttr.reduce((formData, field) => {
            formData[field.name] = field.initVal;
            return formData;
        }, {});

    // Initialize state variables for form inputs
    const [formData, setFormData] = useState(INIT_FORMDATA);
    const [formErr, setFormErr] = useState([])

    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate()

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = await submitAction(formData);
        // If Error
        if(token.message){
            setFormErr([...token.message])
        }else{
            // Else register/login user & save token
            localStorage.setItem("_token", token);
            updateUser();
            navigate("/") //After login, redirect to "/"
        }
    }

    return(
        <div className="form-wrapper">
          <h2>{formTitle}</h2>
          <form className="AuthForm" onSubmit={handleSubmit}>

          {formAttr.map((fGroup, idx)=>
                <div className="form-group" key={`${fGroup.name}-${idx}`}>
                    <label htmlFor={fGroup.name}>
                        {fGroup.label}:
                    </label>
                    <input
                        type={fGroup.type || "text"}
                        id={fGroup.name}
                        name={fGroup.name}
                        value={formData[fGroup.name]}
                        onChange={handleInputChange}
                        disabled={fGroup.disabled || false}
                    />
                </div>
            )}

            <div>
              <button type="submit">Submit</button>
            </div>
            {formErr.length > 0 && 
                <div className="form-errors">
                    <ul>

                        {formErr.map((e, idx) =>
                            <li key={`err-msg-${idx}`}>{e}</li>
                            )}
                    </ul>
            </div>
            }
          </form>
        </div>
    )
}

export default AuthForm;