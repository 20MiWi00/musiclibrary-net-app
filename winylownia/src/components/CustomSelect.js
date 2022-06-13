import { Typography,MenuItem,FormControl,Select} from "@mui/material";

const CustomSelect = ({categories,valueItem,setFunction}) => {

    return(
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}>
            <Typography style={{ color: "black" }} variant="h5">
				Wybierz kategorię
			</Typography>
            <FormControl 
                style = {{
                    background : "white",
                    borderRadius: "2px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    width : 450,
                }}>
                <Select
                    style = {{height : 40}}
                    value = {valueItem}
                    onChange={(e) => { setFunction(e.target.value)}}
                    displayEmpty >
                    {categories?.map(categoryItem => {
                        return(
                            <MenuItem key={categoryItem.value} value={categoryItem.value}>
                                {categoryItem.label ?? categoryItem.value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default CustomSelect;