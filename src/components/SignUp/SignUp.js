import AuthForm from "../AuthForm/AuthForm";
import MagidektApi from "../../helpers/MagidektApi";
import formatErrMsg from "../../helpers/formatErrMsg"

const SignUp = () =>{
    const formAttr = [
            {
                label: "Username",
                name:  "username",
                initVal: "",
            },{
                label: "Password",
                name:  "password",
                initVal: "",
                type: "password",
            },{
                label: "Email",
                name: "email", 
                initVal: "",
                type: "email",
            },
        ]

        // Signup
        const submitAction = async(data) =>{
            let res = await MagidektApi.signUp(data)
            if(res.message){
                const labels = {};
                    for (const field of formAttr) {
                        labels[field.name] = field.label;
                    }
                formatErrMsg(res.message, labels)
            }
            return res;
        }
        
    return(
        <>
            <AuthForm 
                formTitle="Sign Up"
                formAttr={formAttr}
                submitAction={submitAction}
            />
            <div>
                <p>
                    <b>NOTE</b>:
                    Username must be unique and cannot be changed after you have chosen it.
                    <br/>
                    You will be given the opportunity to update your Display Name however.
                </p>
            </div>
        </>
    )
}

export default SignUp;