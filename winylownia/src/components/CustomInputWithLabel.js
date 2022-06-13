import { InputBase, Typography } from "@mui/material";

const CustomInputWithLabel = ({ value, setFunction, label, type }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 10,
			}}>
			<Typography style={{ color: "black" }} variant="h5">
				{label}
			</Typography>
			<InputBase
				style={{
					background: "white",
					paddingLeft: "0.5rem",
					paddingRight: "0.5rem",
					paddingTop: "0.25rem",
					paddingBottom: "0.25rem",
					borderRadius: "2px",
					filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
				}}
				sx={{
					width: 450,
				}}
				label={label}
				value={value}
				type={type}
				onChange={(e) => {
					setFunction(e.target.value);
				}}
			/>
		</div>
	);
};

export default CustomInputWithLabel;
