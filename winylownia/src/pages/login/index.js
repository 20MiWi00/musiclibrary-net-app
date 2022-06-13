import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";

const Login = () => {

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function sendData(){

        await fetch('http://localhost:8080/login',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                "login" : login,
                "password" : password,
            })
        })
        .then(response => checkStatus(response))  
        .catch(error => console.log("Error detected: " + error))
    }

	function checkStatus(response){
        console.log(response);
        var mode = response.status;
        if(mode === 200){
            navigate("/userPanel");
        }
        else{
			alert("Niepoprawny login lub hasło!");
			setLogin("");
			setPassword("");
		}
        return;
    }

	return (
		<div
			id="login_page"
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems : "center",
				justifyContent : "center",
				gap : 40,
			}}>
			<CustomInputWithLabel
				value={login}
				setFunction = {setLogin}
				label="Login"
				type = "text"
			/>
			<CustomInputWithLabel
				value={password}
				setFunction = {setPassword}
				label="Hasło "
				type = "password"
			/>
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
					Zaloguj
				</Typography>
			</Button>
			<div
				style={{
					display:"flex",
					flexDirection:"row",
					gap: 10,
					paddingTop:100,
					}}>
				<Typography variant="h3" style = {{color:"#706D69"}}>Nie masz konta?</Typography>
				<Link
					to={"/register"}
					style={{ flexGrow: 1, textDecoration: "underline", color: "#706D69",fontWeight: "bold", }}>
					<Typography variant="h3">Rejestracja</Typography>
				</Link>
			</div>
		</div>
	);
};

export default Login;
