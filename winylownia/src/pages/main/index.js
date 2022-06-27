import { Typography,Button, Divider, Pagination } from "@mui/material";
import sample from "./sample.json";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import CustomSelect from "../../components/CustomSelect";
import EntryPanel from "../../components/EntryPanel";
import usePagination from "@mui/material/usePagination/usePagination";

const MainPage = () => {

	const [entries,setEntries] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [searchedEntries,setSearchedEntries] = useState([]);

	useEffect(() => {
		const fetchData = async() => {
			await fetch('http://localhost:8080/getEntries')
			.then(response => response.json().then(data =>({
				data : data
			})))
			.then(res => setEntries(res.data.data))
			.catch(error => console.log("Error detected: " + error))
		}
		if(entries == null)
			fetchData()
	},[]);

	useEffect(() => {
		if(searchText){
			const reg = new RegExp(searchText,"gi");
			setSearchedEntries(entries.filter((entry) => entry.title.match(reg)));
		} else {
			setSearchedEntries(entries);
		}
	},[searchText])
	
	if(entries == null){
		return( <div>Loading</div> )
	}
	else {
		return (
			<div
				style = {{
					display:"flex",
					flexDirection:"column",
				}}>
					<div
						style={{
							display:"flex",
							flexDirection : "column",
							width : "100%",
							height: 150,
							backgroundColor :"#C4C4C4",
							filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
							alignItems:"center",
							justifyContent:"center",
						}}>
						<Typography style = {{paddingBottom: 5, paddingRight: 650}} variant = "h5">Wyszukaj po tytule</Typography>
						<SearchBar
							value={searchText}
							setFunction={setSearchText}
						/>			
					</div>
					<div
						style={{
							display:"flex",
							flexDirection : "column",
						}}>
						<EntryPanel
							data = {searchedEntries == null ? entries : searchedEntries}
							type = "basic"
						/> 		
					</div>
			</div>
		);
	}

};

export default MainPage;
