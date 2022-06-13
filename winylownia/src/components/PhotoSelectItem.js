import { Button, Input} from "@mui/material";

const PhotoSelectItem = ({setFunction}) => {
    return(
        <div>
            <Input
				accept = "image/*"
				multiple type = "file"
				style = {{ visibility : "hidden" }}
				onChange = {(event) => {
					setFunction(event.target.files[0]);
			    }}/>
			<Button 
				variant = "contained"
				component = "span"
				style={{
					width : 400,
					background: "#706D69",
					color: "white",
					borderRadius: "2px",
					filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
				}}>
			    Wybierz zdjęcie okładki
			</Button>
        </div>
    )
}

export default PhotoSelectItem;