import {
	Button,
	InputBase,
	Typography,
	Divider,
	Pagination,
} from "@mui/material";
import usePagination from "./../utills/usePagination"
import { useState } from "react";
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

	const [page,setPage] = useState(1);
	const perPage = 3;
	const paginatedData = usePagination(data,perPage);

	const handleChange = (e,p) => {
		setPage(p);
		paginatedData.jump(p);
	}

	return (
		<div
			style={{
				flexDirection: "column",
				width: "100%",
				display: "grid",
			}}>			
			{ data.length > 0 ? 
				paginatedData.currentData().map((x) => {
					return( 
						<div>
							<Entry key={x.id} data={x} type = {type} />
						</div>
					);
				}) 
			: 
			<div
				style={{
					display : "flex",
					paddingTop : 50,
					justifyContent : "center",
				}}>
				<Typography variant = "h3">Brak wyników</Typography>
			</div>
			}
			<div
				style = {{
					display : "flex",
					justifyContent : "center",
					alignItems : "center",
					width : "100%",
					paddingTop : 10,
					paddingBottom : 10,
					paddingRight : 20,
				}}>
				<Pagination
					count = {Math.ceil(data.length / perPage)}
					size = 'large'
					page = {page}
					shape = 'rounded'
					onChange = {handleChange}
				/>
			</div>	 
		</div>
	);
};

export default EntryPanel;
