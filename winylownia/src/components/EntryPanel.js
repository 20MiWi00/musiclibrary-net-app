import {
	Button,
	InputBase,
	Typography,
	Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"

const Entry = ({ data, type }) => {

	const navigate = useNavigate();

	async function deleteEntry(){

        await fetch('http://localhost:8080/deleteEntry',
        {
            method: "POST",
            body: data.id
        })
		.then(response => response.json().then(data =>({
			data : data
		})))
		.then(res => alert(res.data.message))
	}

	return (
		<div
		style = {{
			gap : 10,
			paddingTop: 10,
			height : 160,
		}}>
			<Typography 
				variant = "h5" 
				style = 
				{{
					display:"flex",
					justifyContent:"center",
					alignText : "center",
					fontWeight:"bold",
				}}>
					{data.title}
			</Typography>
			<div
				style = {{
					display:"flex",
					flexDirection:"row",
					paddingLeft : 30,
				}}>
				<img alt="Image" style = {{ width : 100, height : 100, borderRadius: "2px",}} src={`http://localhost:8080/files/${data.filename}`}/>
				<div
				style = {{
					display:"flex",
					flexDirection:"column",
					paddingLeft : 30,
					width : "82%"
				}}>
					<Typography variant = "h5" style = {{alignText : "left",}}>{data.singer}</Typography>
					<Typography variant = "h5" style = {{alignText : "left",}}>{data.category}</Typography>
					<Typography variant = "h5" style = {{alignText : "left",}}>{data.yearofproduction}</Typography>
				</div>
				<div
					style = {{
						display : "flex",
						alignItems : "center",
						justifyContent : "center",
						gap: 20,
						paddingRight: 20,
					}}>
					<Link
						to = {`/infoEntry/${data.id}`}
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
							<Typography variant="h5">Info</Typography>
						</Button>
					</Link>
					{type === "extended" ? (
						<Button
							style={{
								background: "#706D69",
								color: "white",
								borderRadius: "2px",
								paddingRight: 10,
								paddingLeft: 10,
						}}>
							<Typography
								variant="h5"
								onClick={() => {
									deleteEntry()
								}}>
								Usuń
							</Typography>
						</Button>
					):(<div></div>)}
				</div>
			</div>
			<Divider
				orientation={"horizontal"}
				style = {{paddingTop : 20}}
				sx={{
					height: 0,
					fullWidth : "true",
				}}
			/>
		</div>
	);
};

const EntryPanel = ({data, type}) => {
	return (
		<div
			style={{
				flexDirection: "column",
				width: "100%",
				display: "grid",
			}}>
			{data.map((x) => {
				return <Entry key={x.id} data={x} type = {type} />;
			})}
		</div>
	);
};

export default EntryPanel;
