import { Typography,Button, Divider,Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import { useParams, useNavigate } from "react-router-dom";

const Settings = () => {

    const navigate = useNavigate();
    const params = useParams();

    const[newPassword,setNewPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const[role,setRole] = useState("user");
    const[users,setUsers] = useState([]);

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

    async function deleteUser(userToDelete){
        console.log(userToDelete)
        await fetch('http://localhost:8080/deleteUser',
        {
            method : "POST",
            body : userToDelete.toString(),
        })
        .then(alert("Usunięto użytkownika " + userToDelete));
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

    useEffect(() => {
		const fetchData = async() => {
            await fetch('http://localhost:8080/getUserRole',
            {
                method: "POST",
                body: params.userID.toString()
            })
            .then(response => response.json().then(data => ({data : data})))
            .then(res => setRole(res.data.data))
		}
        fetchData();
	},[]);

    useEffect(() => {
		const fetchData = async() => {
			await fetch('http://localhost:8080/getUsers')
            .then(response => response.json().then(data => ({data : data})))
            .then(res => setUsers(res.data.data))
            .then(console.log(users))
		}
        if(role === "admin")
        {
            fetchData();
        }
	},);


    return(
        <div>
            {
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
                    { role == "admin" ?
                        <div
                            style = {{
                                alignItems : "center",
                                justifyContent : "center",
                                flexDirection: "column",
                            }}>
                            <Typography style = {{fontWeight : "bold"}} variant = "h4">Panel Admina</Typography>
                            <div
                                style = {{
                                    display : "grid",
                                    width : 1020,
                                    background: "#C4C4C4",
                                }}>
                                {users.map((user) => {
                                    return (
                                        <div
                                            style = {{
                                                flexDirection : "row",
                                                display : "flex",
                                                alignItems : "center",
                                                justifyContent : "center",
                                                height : 100,
                                            }}>
                                            <Typography style = {{width : "80%"}} variant = "h5">Użytkownik : {user} </Typography>
                                            <Button
                                                style = {{
                                                    background : "#994343",
                                                    color : "white",
                                                    borderRadius: "2px",
                                                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                                                    fontSize : 16,
                                                    width : 150,
                                                    height : 40,
                                                }}
                                                onClick={() => {deleteUser(user)}}>
                                                Usuń Konto
                                            </Button>                                      
                                        </div>
                                    )})}
                            </div>
                        </div>
                    : <div></div> }
                </div>
            }
        </div>
    );
}

export default Settings;