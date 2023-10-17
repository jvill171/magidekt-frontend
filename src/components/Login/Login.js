import AuthForm from "../AuthForm/AuthForm";
import MagidektApi from "../../helpers/MagidektApi";

const Login = () =>{
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
            },
        ]

    // Login
    const submitAction = async(data) => await MagidektApi.login(data)

    return(
        <>
            <AuthForm 
                formTitle="Login"
                formAttr={formAttr}
                submitAction={submitAction}
            />
        </>
    )
}

export default Login;