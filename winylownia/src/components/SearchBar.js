import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";

const SearchBar = ({ value, setFunction }) => {
	return (
		<div
			style={{
				display: "flex",
				background: "white",
				borderRadius: "2px",
				alignItems: "center",
				margin: "auto",
				width: 450,
				height: 40,
				filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
			}}>
			<Search
				fontSize="large"
				sx={{
					width: "50px",
				}}
			/>
			<InputBase
				placeholder="Szukaj..."
				value={value}
				onChange={(e) => {
					setFunction(e.target.value);
				}}
				style={{
					paddingLeft: "0.5rem",
					paddingRight: "0.5rem",
					paddingTop: "0.25rem",
					paddingBottom: "0.25rem",
					borderTopRightRadius: "inherit",
					borderBottomRightRadius: "inherit",
				}}
				sx={{
					width: "100%",
				}}
			/>
		</div>
	);
};

export default SearchBar;
