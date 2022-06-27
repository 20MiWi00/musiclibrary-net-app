import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";

const Register = () =>{


    const [name,setName] = useState("");
	const [surname,setSurname] = useState("");
    const [login,setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword,setVerifyPassword] = useState("");
    const navigate = useNavigate();
	
    function setError(){
        var regex = new RegExp("^([0-9].*[A-Z])\|([A-Z].*[0-9])");
            if(password.length > 0 && verifyPassword.length > 0 && email.length > 0){
                if(!regex.test(password) || password.length < 8){
                    return(
                        <Typography variant="h5" style = {{color:"#994343"}}>Niepoprawne hasło!</Typography>
                    );
                }
                if(password != verifyPassword){
                    return(
                        <Typography variant="h5" style = {{color:"#994343"}}>Hasła są różne!</Typography>
                    );
                }
                if(!email.includes('@')){
                    return(
                        <Typography variant="h5" style = {{color:"#994343"}}>Niepoprawny email!</Typography>
                    );
                }
            }
            return(
                <Typography variant="h5"> </Typography>
            );
    }

	function checkData(){
		var regex = new RegExp("^([0-9].*[A-Z])\|([A-Z].*[0-9])");
		if(regex.test(password) && password.length > 7){
			if((email.length > 0 && email.includes('@')) && (password === verifyPassword) && name.length > 0 && surname.length > 0)
				return true;
		}
		else
			return false;
	} 

    async function sendData(){

        await fetch('http://localhost:8080/register',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                "login" : login,
                "password" : password,
                "name" : name,
                "surname" : surname,
                "email" : email,
                "role" : "user"
            })
        })
        .then(response => checkStatus(response))  
        .catch(error => console.log("Error detected: " + error))
    }
    function checkStatus(data){
        console.log(data);
        var mode = data.status;
        if(mode === 200){
            navigate("/");
        }
        if(mode === 500){
            alert("Podane dane już istnieją!");
            setLogin("");
            setEmail("");
        }
    }

	return (
        <div
            style = {{
                display: "flex",
                flexDirection: "column",
                alignItems :"center",
                justifyContent: "center",
                padding:20,
            }}>
            <div
                style={{
                    paddingTop : 30,
                    display: "flex",
                    flexDirection: "row",
                    alignItems :"center",
                    justifyContent: "center",
                    gap:50,
                }}>
                <CustomInputWithLabel
                    value = {name}
                    setFunction = {setName}
                    label = "Imię"
                    type = "text"
                />
                <CustomInputWithLabel
                    value = {surname}
                    setFunction = {setSurname}
                    label = "Nazwisko"
                    type = "text"
                />
            </div>
            <div
                style = {{
                    display: "flex",
                    flexDirection: "row",
                    alignItems :"center",
                    justifyContent: "center",
                    paddingTop:60,
                    gap:50,
                }}>
                <CustomInputWithLabel
                    value = {login}
                    setFunction = {setLogin}
                    label = "Login"
                    type = "text"
                />
                <CustomInputWithLabel
                    value = {email}
                    setFunction = {setEmail}
                    label = "Adres email"
                    type = "email"
                />
            </div> 
            <div
                style = {{
                    display: "flex",
                    flexDirection: "row",
                    alignItems :"center",
                    justifyContent: "center",
                    paddingTop:60,
                    gap:50,
                }}>
                <CustomInputWithLabel
                    value = {password}
                    setFunction = {setPassword}
                    label = "Hasło"
                    type = "password"
                />
                <CustomInputWithLabel
                    value = {verifyPassword}
                    setFunction = {setVerifyPassword}
                    label = "Powtórz hasło"
                    type = "password"
                />
            </div>
        <Typography variant="h6" style = {{color:"#706D69",fontStyle:"italic"}}>
            Hasło musi zawierać przynajmniej 8 znaków w tym jedną wielką literę i cyfrę.
        </Typography>
        <div style={{padding:40}}>{setError()}</div>
        {checkData() ? (
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
                        sendData();
                    }}>
                    Rejestracja
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
                Rejestracja
            </Button>
        )}
        </div>
	);
};

export default Register;