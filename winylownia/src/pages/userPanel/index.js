import { Typography,Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import {useState } from "react";
import useDebounce from "../../utills/useDebounce";
import EntryPanel from "../../components/EntryPanel";
import sample from "./sample.json";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {

	window.history.pushState(null,null,"/userPanel");
	window.onpopstate = function (){
	window.history.go(2);
	}
	
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
						to = {"/settings"}
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
							<Typography variant="h5">Ustawienia</Typography>
						</Button>
					</Link>
                    <div
                        style={{
                            width : "70%",
                            textAlign : "center",
                            color : "black",
                        }}>
                        <Typography variant = "h2" fontWeight="bold">
                            TWOJE WPISY
                        </Typography>
                    </div>
					<Link
						to = {"/addEntry"}
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
						data = {sample}
						type = "extended"
					/>
				</div>
		</div>
	);
};

export default UserPanel;
