import { Typography,Button, Divider } from "@mui/material";
import sample from "./sample.json";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import useDebounce from "../../utills/useDebounce";
import CustomSelect from "../../components/CustomSelect";
import EntryPanel from "../../components/EntryPanel";

const MainPage = () => {


	const [searchText, setSearchText] = useState("");
	const [category,setCategory] = useState("");
	const debounceSearchTerm = useDebounce(searchText, 500);
	

	const categories = [
        {label:"Country",value:"Country"},
        {label:"Funk",value:"Funk"},
        {label :"Jazz", value:"Jazz"},
        {label:"Latino",value:"Latino"},
        {label :"Metal", value:"Metal"},
        {label :"Pop", value:"Pop"},
        {label:"Rap",value:"Rap"},
        {label :"Rock", value:"Rock"},
        {label :"R&B", value:"R&B"},
    ];

	useEffect(() => {
		if (searchText) {
			console.log(`GO TO SEARCH PAGE: /search?q=${searchText}`);
		}
	}, [debounceSearchTerm]);

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
					<div style = {{paddingBottom : 1,paddingLeft:100 }}>
						<Typography style = {{paddingBottom : 10}} variant = "h5">Wyszukiwarka</Typography>
						<SearchBar
							value={searchText}
							setFunction={setSearchText}
							width="80%"
						/>
					</div>
					<Divider
						orientation={"vertical"}
						sx={{
							height: 125,
							width: 0,
						}}
					/>
					<CustomSelect
						categories = {categories}
						valueItem = {category}
						setFunction = {setCategory}
					/>
					<div style = {{paddingTop:40,}}>
						<Button
							style={{
								
								variant: "contained",
								background: "#706D69",
								color: "white",
								borderRadius: "2px",
								filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
								height : 40,
							}}>
							<Typography
								style = {{fontSize : 20,}}
								variant="button">
								Filtruj
							</Typography>
						</Button>
					</div>					
				</div>
				<div
					style={{
						display:"flex",
						flexDirection : "column",
					}}>
					<EntryPanel
						data = {sample}
						type = "basic"
					/>
				</div>
		</div>
	);
};

export default MainPage;
