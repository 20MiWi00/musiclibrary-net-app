import { InputBase, Typography } from "@mui/material";

const CustomInputWithLabelExtra = ({ value, setFunction, label}) => {
	return (
        <div>
            <Typography style={{ color: "black", paddingBottom: 10 }} variant="h5">{label}</Typography>
            <InputBase
                style={{
                    paddingLeft : 10,
                    alignItems : "start",
                    background: "white",
                    borderRadius: "2px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
                sx={{
                    width: 1200,
                    height : 300,
                }}
                multiline = "true"
                value={value}
                onChange={(e) => {
                    setFunction(e.target.value);
                }}/>
        </div>
	);
};

export default CustomInputWithLabelExtra;
