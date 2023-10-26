import React, { useContext, useEffect, useState } from "react";
import MagidektApi from '../../helpers/MagidektApi';
import "./NewDeck.scss"
import UserContext from "../../context/UserContext";
import formatErrMsg from "../../helpers/formatErrMsg";
import { useNavigate } from "react-router-dom";


const NewDeck = () =>{
    const navigate = useNavigate();
    const {user} = useContext(UserContext)

    const INIT_FORMDATA = {
        deckName:"",
        tags:[],
        deckOwner:user,
    }
    

    // // Initialize state variables for form inputs
    const [formData, setFormData] = useState(INIT_FORMDATA);
    
    const [validFormats, setValidFormats] = useState([])
    const [showMsg, setShowMsg] = useState(false);
    const [formErr, setFormErr] = useState([])

    const newTagRef = React.createRef();

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    // ADDING A TAG TO THE TAGS LIST
    const handleAddTag = (e) => {
        e.preventDefault();
        const newTag = newTagRef.current.value.toUpperCase()
        newTagRef.current.value = ""

        // Ensure not a duplicate tag
        if(!formData.tags.includes(newTag)){
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag]
            })
        }
    }

    // REMOVING A TAG FROM THE TAGS LIST
    const handleRemoveTag = (idx) => {
        const newTagList = [...formData.tags]
        newTagList.splice(idx, 1)

        setFormData({
            ...formData,
            tags: newTagList
        })
    }

    // FORM SUBMISSION
    const handleSubmit = async (e) =>{
        e.preventDefault();

        let valid = true;
        const formErrors = [];

        if(!formData.deckName || formData.deckName.length < 1){
            formErrors.push("Deck needs a name!")
            valid = false;
        }
        if(!formData.format){
            formErrors.push("Must select a format!")
            valid = false;
        }
        
        if(!valid){
            setFormErr(formErrors)
            setShowMsg(true);
        }else{
            setShowMsg(false);
            let res = await MagidektApi.createDeck(user, formData)

            // If received res.message, something went wrong, display messages
            if(res.message){
                const msg = res.message;
                const replaceKeys = {
                    "deckName": "Name",
                    "description": "Description",
                    "format": "Format",
                    "tags": "Tags",
                    "deckOwner": "Owner",
                }

                formatErrMsg(msg, replaceKeys)

                setFormErr(msg)
                setShowMsg(true);
            }
            // Successfully created new deck, redirect user to deck builder page
            else{
                navigate(`/decks/${user}/${res.id}`);
            }
        }


        console.log(`SUBMITTED`)
    }

    // On page load, retrieve valid formats from DB
    useEffect(()=>{
        async function getFormats(){
            let formats = await MagidektApi.getDeckFormats();
            setValidFormats(formats)
        }
        getFormats();
    },[])

    return(
        <>
            <h1>New Deck Component</h1>
            
            <div className="form-wrapper">
                <h2>New Deck</h2>
                
                <form className="NewDeck-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="deckName">Name:</label>
                    <input
                        value={formData.deckName.trimStart(' ')}
                        type="text"
                        id="deckName"
                        name="deckName"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        rows={4}
                        maxLength={200}
                        value={formData.description}
                        type="text"
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                        placeholder="Description - 200 character limit..."
                        // ********************************************************************************************************
                        style={{ overflow: "auto", resize: "none" }}
                        // ********************************************************************************************************
                    >
                    </textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="format">Format:</label>
                    <select
                        name="format"
                        id="format"
                        onChange={handleInputChange}
                        required
                        >
                            <option disabled selected>FORMAT</option>
                            { validFormats &&
                                validFormats.map(fmt=>
                                        <option key={`format-${fmt}`} value={fmt}>
                                            {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                                        </option>
                                )
                            }
                    </select>
                </div>
                
                <div className="form-group">
                    <div>TAGS</div>

                    {formData.tags &&
                        <div className="tag-list">
                            <ul>
                                { formData.tags.map((tag, idx) =>
                                    <li key={`tag-${idx}`}>
                                        <i  onClick={() => handleRemoveTag(idx)}
                                            className="ms ms-ability-menace"></i>
                                        {tag}
                                    </li>)
                                }
                            </ul>
                        </div>
                    }
                    
                    {formData.tags && formData.tags.length < 5
                        ?   <>
                                <input
                                    ref={newTagRef}
                                    maxLength={20}
                                    placeholder={`Add a tag... [ ${formData.tags.length} of 5 ]`}
                                />
                                <button onClick={handleAddTag}>Add Tag</button>
                            </>
                        :   <p>Tag limit reached (5)</p>
                    }
                </div>
                    
                {showMsg && 
                    <ul>
                        {formErr && formErr.map((e, idx) => <li key={`err-${idx}`}>{e}</li>)}
                    </ul>
                }
                    
                    <button onClick={handleSubmit}>SUBMIT</button>
                </form>
            </div>
        </>
    )
}

export default NewDeck;