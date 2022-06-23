import { Typography,Button, Divider,Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../../utills/useDebounce";
import EntryPanel from "../../components/EntryPanel";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import { useParams, useNavigate } from "react-router-dom";

const Settings = ({type = "user"}) => {

    const navigate = useNavigate();
    const params = useParams();

    const[newPassword,setNewPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    

    function checkPassword(){
        var regex = new RegExp("^([0-9].*[A-Z])\|([A-Z].*[0-9])");
        if(!regex.test(newPassword) || newPassword.length < 8){
            return false;
        }
        else{
            if(newPassword === confirmPassword)
                return true;
            return false;
        }
    }

    async function sendData(){

        await fetch('http://localhost:8080/changePass',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                "login" : params.userID,
                "password" : newPassword,
            })
        })
        .then(response => response.json().then(data =>({
			data : data
		})))
		.then(res => checkStatus(res))  
        .catch(error => console.log("Error detected: " + error))
    }

    function checkStatus(response){
        var mode = response.data.status;
        if(mode === "OK"){
			navigate(`/userPanel/${params.userID}`);
        }
        else{
			alert("Wystąpił błąd serwera");
		}
        return;
    }

    return(
        <div>
            {
                type === "user" ?(
                    <div
                        style = {{
                            display : "flex",
                            flexDirection : "column",
                            alignItems : "center",
                            justifyContent : "center",
                            paddingTop : 100,
                            gap : 80,
                        }}>
                        <div
                            style={{
                                display : "flex",
                                flexDirection : "column",
                                textAlign : "center",
                                justifyContent : "center",
                                alignItems : "center",
                                width : "70%",
                                height : 300,
                                gap : 10,
                                backgroundColor : "#C4C4C4",
                            }}>
                            <Typography variant = "h4" fontWeight = "bold">
                                Zmień hasło
                            </Typography>
                            <br></br>
                            <div
                                style = {{
                                    display : "flex",
                                    flexDirection : "row",
                                    alignItems : "center",
                                    justifyContent : "center",
                                    gap : 30,
                                }}>
                                <CustomInputWithLabel
                                    value = {newPassword}
                                    setFunction = {setNewPassword}
                                    label = "Nowe hasło"
                                    type = "password"
                                />
                                <CustomInputWithLabel
                                    value = {confirmPassword}
                                    setFunction = {setConfirmPassword}
                                    label = "Powtórz nowe hasło"
                                    type = "password"
                                /> 
                            </div>
                            <Typography variant="h6" style = {{color:"#706D69",fontStyle:"italic"}}>
                                Hasło musi zawierać przynajmniej 8 znaków w tym jedną wielką literę i cyfrę.
                            </Typography>
                            {checkPassword() ? (
                                <Button
                                    style={{
                                        background: "#706D69",
                                        color: "white",
                                        borderRadius: "2px",
                                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                                        width : 200,
                                    }}>
                                    <Typography
                                        style={{fontSize : 22,color : "#E5E5E5"}}
                                        variant="button"
                                        onClick={() => {
                                            sendData()
                                        }}>
                                        Zmień hasło
                                    </Typography>
                                </Button>
                            ):(
                                <Button
                                disabled
                                style={{
                                    borderRadius: "2px",
                                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                                    width : 200,
                                    fontSize : 22,
                                }}>
                                    Zmień hasło
                                </Button>
                            )}                                 
                        </div>
                    </div>
                ):(
                    <div>
                        Dopisanie wyświetlania listy userów oraz ich usuwanie
                    </div>
                )
            }
        </div>
    );
}

export default Settings;