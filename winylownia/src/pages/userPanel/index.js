import { Typography,Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import EntryPanel from "../../components/EntryPanel";
import sample from "./sample.json";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserPanel = () => {

	const navigate = useNavigate();
	const params = useParams();
	const [entries,setEntries] = useState([]);
	const token = window.sessionStorage.getItem("token");

	useEffect(() => {
		const fetchData = async() => {
			await fetch('http://localhost:8080/getUserEntries',
			{
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: params.userID.toString()
			})
			.then(response => response.json().then(data =>({
				data : data
			})))
			.then(res => setEntries(res.data.data))
			.catch(error => console.log("Error detected: " + error))
		}
		fetchData()
	},[entries]);

	if(token){
		return (
			<div
				style = {{
					display:"flex",
					flexDirection:"column",
				}}>
					<div
						style={{
							display:"flex",
							flexDirection : "row",
							width : "100%",
							height: 150,
							backgroundColor :"#C4C4C4",
							filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
							alignItems:"center",
							justifyContent:"center",
							gap:40,
						}}>
						<Link
							to = {`/settings/${params.userID}`}
							style={{
								textDecoration: "none",
							}}>
							<Button
								style={{
									background: "#706D69",
									color: "white",
									borderRadius : "2px",
									paddingRight: 10,
									paddingLeft: 10,
								}}>
								<Typography variant="h5">Ustawnienia</Typography>
							</Button>
						</Link>
						<div
							style={{
								width : "70%",
								textAlign : "center",
								color : "black",
							}}>
							<Typography variant = "h3" fontWeight="bold">
								Wpisy {params.userID}
							</Typography>
						</div>
						<Link
							to = {`/addEntry/${params.userID}`}
							style={{
								textDecoration: "none",
							}}>
							<Button
								style={{
									background: "#706D69",
									color: "white",
									borderRadius : "2px",
									paddingRight: 10,
									paddingLeft: 10,
								}}>
								<Typography variant="h5">Dodaj wpis</Typography>
							</Button>
						</Link>                                            			
					</div>
					<div
						style={{
							display:"flex",
							flexDirection : "column",
						}}>
						<EntryPanel
							data = {entries}
							type = "extended"
						/>
					</div>
			</div>
		);
	}
	else {
		navigate("/login");
	}
	
};

export default UserPanel;
