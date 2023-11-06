import React, { useContext, useEffect, useState } from "react";
import MagidektApi from '../../helpers/MagidektApi';
import "./Profile.scss"
import UserContext from "../../context/UserContext";
import Loading from "../Loading/Loading"
import formatErrMsg from "../../helpers/formatErrMsg"
import Overlay from "../Overlay/Overlay";
import DeleteForm from "../DeleteForm/DeleteForm";
import { useNavigate } from "react-router-dom";


const Profile = () =>{
    const INIT_FORMDATA = {
        username: "",
        deckCount: ""
    }
    const navigate = useNavigate()

    // // Initialize state variables for form inputs
    const [formData, setFormData] = useState(INIT_FORMDATA);
    const [showMsg, setShowMsg] = useState(false);
    const [formErr, setFormErr] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)

    const { user, updateUser } = useContext(UserContext)

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
        setShowMsg(false);
        e.preventDefault();
        setFormErr([]); //Clear any previous errors

        const verifyUser = {
            username: user,
            password: formData.authPass
        }
        let tokenRes = await MagidektApi.login(verifyUser);
        if(tokenRes.message){
            //Failed to submit correct current password
            setFormErr([`Invalid password. No changes made.`])
        }else{
            let res = await MagidektApi.updateUserData(user, formData)
            
            if(res.message){
                const msg = res.message;

                const replaceKeys = {
                    "displayName": "Display Name",
                    "password": "Password",
                    "email": "E-mail"
                }
                formatErrMsg(msg, replaceKeys)
                
                setFormErr([...msg])
            }else{
                setShowMsg(true);
            }
            
            // Clear password-related form data
            setFormData({ ...formData, password:"", authPass:""})
        }
    }

    const openDeleteOverlay = async (e) =>{
        e.preventDefault();
        setFormErr([]); //Clear any previous errors

        const verifyUser = {
            username: user,
            password: formData.authPass
        }
        let tokenRes = await MagidektApi.login(verifyUser);
        if(tokenRes.message){
            setFormErr([`Enter your password open the account deletion verification.`])
        }else{
            setDeleteOpen(true)
        }
    }
    const deleteProfile = async () =>{
        await MagidektApi.deleteUser(user)
        localStorage.removeItem(`_token`)
        updateUser();
        navigate(`/`) //After deletion & sign out, redirect to "/"
    }

    useEffect(()=>{
        async function getUserProfile(){
            const res = await MagidektApi.getUserData(user)
            delete res.isAdmin;

            setFormData({...res,
                password: "",
                authPass: ""
            })
        }
        getUserProfile()
    },[user]);
    
    return(
        <>
            { (formData.username.length < 1) ?
                <Loading />
            :
            <div className="form-wrapper">

                <h2>Profile</h2>
                <form className="Profile-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            placeholder={formData.username}
                            type="text"
                            id="username"
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deckCount">Decks:</label>
                        <input
                            type="text"
                            id="deckCount"
                            name="deckCount"
                            value={formData.deckCount}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>

                    <br/>
                    
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name:</label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <br/>
                    
                    <p>Enter your current password to submit these changes:</p>
                    <div className="form-group">
                        <label htmlFor="authPass">Password:</label>
                        <input
                            type="password"
                            id="authPass"
                            name="authPass"
                            value={formData.authPass}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    { formErr.length === 0 ?
                    <>
                        {showMsg && 
                            <p className="form-success">
                                Updated Successfully!
                            </p>}
                    </>
                    :
                    <ul>
                        {formErr.map((m, idx) => <li key={idx} className="formErrs">{m}</li>)}
                    </ul>
                    }
                    <div>
                    <button type="submit">Update</button>
                    <button className="delete-btn" onClick={openDeleteOverlay} >Delete Account</button>
                    </div>
                </form>
            </div>
            }
            <Overlay isOpen={deleteOpen} onClose={ () => setDeleteOpen(false)}>
                <DeleteForm toDelete="Profile" deleteAction={deleteProfile}/>
            </Overlay>
        </>
    )
}

export default Profile;