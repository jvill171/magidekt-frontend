import React, { useContext, useEffect, useState } from "react";
import MagidektApi from '../../helpers/MagidektApi';
import "./NewDeck.scss"
import UserContext from "../../context/UserContext";
import formatErrMsg from "../../helpers/formatErrMsg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import makeTitleCase from "../../helpers/makeTitleCase";


const NewDeck = ({deckInfo=undefined}) =>{
    const navigate = useNavigate();
    const {user} = useContext(UserContext)


    const INIT_FORMDATA =deckInfo
        ? { ...deckInfo }
        : {
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
        const lowerTag = newTagRef.current.value.toLowerCase();
        const newTag = makeTitleCase(lowerTag)
        newTagRef.current.value = "";

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
            
            let res = !deckInfo
                ? await MagidektApi.createDeck(user, formData)
                : await MagidektApi.updateDeck(user, formData.id, formData);

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
            <div className="form-wrapper">
                <h2>{ !deckInfo ? "New Deck" : "Deck Info" }</h2>
                
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
                            rows={3}
                            maxLength={200}
                            value={formData.description}
                            type="text"
                            id="description"
                            name="description"
                            onChange={handleInputChange}
                            placeholder="Description - 200 character limit..."
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
                            value={formData.format}
                        >
                            { validFormats &&
                                validFormats.map(fmt=>
                                        <option key={`format-${fmt}`} value={fmt}>
                                            {makeTitleCase(fmt)}
                                        </option>
                                )
                            }
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <div className="tags">
                            <label>Tags:</label>
                            {formData.tags &&
                                <div className="tag-list">
                                    {formData.tags.map((tag, idx) => (
                                    <div className="tag-bubble" key={`tag-${idx}`}>
                                        {`${tag} `}
                                        <FontAwesomeIcon
                                            className="faXmark"
                                            icon={faXmark}
                                            onClick={() => handleRemoveTag(idx)}
                                        />
                                    </div>
                                    ))}
                                </div>
                            }
                        </div>
                        
                        {formData.tags && formData.tags.length < 5
                            ?   <div className="tag-input-row">
                                    <input
                                        ref={newTagRef}
                                        maxLength={20}
                                        placeholder={`Add a tag... [ ${formData.tags.length} of 5 ]`}
                                    />
                                    <button
                                        className = "add-tag-btn"
                                        onClick = { handleAddTag }
                                    >Add Tag</button>
                                </div>
                            :   <p className="tag-limit">Tag limit reached (5)</p>
                        }
                    </div>
                        
                    {showMsg && 
                        <ul>
                            {formErr && formErr.map((e, idx) => <li key={`err-${idx}`}>{e}</li>)}
                        </ul>
                    }
                    
                    <button onClick={handleSubmit}>
                        { !deckInfo ? "SUBMIT" : "UPDATE" }
                    </button>
                </form>
            </div>
        </>
    )
}

export default NewDeck;