import { Button, Typography,Box } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomSelect from "../../components/CustomSelect";
import PhotoSelectItem from "../../components/PhotoSelectItem";
import CustomInputWithLabelExtra from "../../components/CustomInputWithLabelExtra";

const AddEntry = () =>{

    const token = window.sessionStorage.getItem("token");
    const params = useParams();
    const navigate = useNavigate();

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
    
    const [title,setTitle] = useState("");
    const [artist,setArtist] = useState("");
    const [category,setCategory] = useState("");
    const [productionYear,setProductionYear]=useState("");
    const [description,setDescription]= useState("");
    const [photo,setPhoto]= useState(null);
    const [song,setSong] = useState("Dodaj utwór");
    const [firstDisc,setFirstDisc] = useState("");
    const [versions,setVersions] = useState("");

    function setDisc(){
        if(song.length > 0){
            setFirstDisc(firstDisc => [...firstDisc,song + "\n"]);
            setSong("");
        }

    }

    async function sendData(){

        
        const formData = new FormData();
        formData.append('login',params.userID.toString());
        formData.append('title',title.toString());
        formData.append('singer',artist.toString());
        formData.append('category',category.toString());
        formData.append('yearOfProduction',productionYear.toString());
        formData.append('description',description.toString());
        formData.append('songTrack',firstDisc.toString());
        formData.append('vinylVersions',versions.toString());
        formData.append('file',photo);
        
        await fetch('http://localhost:8080/addEntry',
        {
            method: "POST",
            body: formData
        })
        .then(response => response.json().then(data =>({
			data : data
		})))
		.then(res => checkStatus(res))  
        .catch(error => console.log("Error detected: " + error))
    }

	function checkStatus(response){
        var mode = response.data.status;
        if(mode === "OK"){
            alert("Dodano wpis")
			navigate(`/userPanel/${params.userID}`);
        }
        return;
    }

    if(token){
        return(
            <div style={{flexWrap:"wrap"}}>
                <div
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                    <div
                        style ={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            paddingLeft:140,
                            paddingTop : 40,
                            gap : 20,
                        }}>
                        {photo != null ?(
                            <div style = {{paddingRight:300}}>
                                <img alt="Image" style = {{ width : 400, height : 380, borderRadius: "2px",}} src={URL.createObjectURL(photo)} />
                            </div>
                        ):(
                            <div style = {{paddingRight:300}}>
                                <Box sx = {{ width : 400, height : 380, backgroundColor : "#994343", borderRadius: "2px", textAlign :"center",}}>
                                            <Typography style = {{ color: "white",paddingTop:160,fontSize:50 }} variant="h5">+</Typography>
                                </Box>	
                            </div>
                        )}
                        <label>
                            <PhotoSelectItem setFunction={setPhoto}></PhotoSelectItem>
                        </label>
                    </div>
                    <div
                        style ={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            paddingTop:30,
                            paddingRight:150,
                            gap : 20,
                        }}>
                        <CustomInputWithLabel
                            value={title}
                            setFunction={setTitle}
                            label="Tytuł"
                            type="text"
                        />
                        <CustomInputWithLabel
                            value={artist}
                            setFunction={setArtist}
                            label="Wykonawca"
                            type="text"
                        />
                        <CustomSelect
                            categories={categories}
                            valueItem={category}
                            setFunction={setCategory}
                        />
                        <CustomInputWithLabel
                            value={productionYear}
                            setFunction={setProductionYear}
                            label="Rok produkcji"
                            type="text"
                        />
                    </div>
                </div>
                <div
                    style = {{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        gap:20,
                        paddingTop:40,
                    }}>
                    <CustomInputWithLabelExtra
                        value={description}
                        setFunction={setDescription}
                        label="Opis"
                    />
                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:20,
                    }}>
                        <Typography style={{color:"black"}} variant="h5">Dodaj utwory</Typography>
                        <Box
                            sx = {{ width : 1200, 
                                    height : 400, 
                                    backgroundColor : "white", 
                                    borderRadius: "2px", 
                                    textAlign :"start",
                                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                            }}>
                            <Typography style={{color:"black", whiteSpace: "pre-wrap"}} variant="h6">{firstDisc}</Typography>
                        </Box>
                        <div
                            style={{
                                display:"flex",
                                flexDirection:"row",
                            }}>
                            <CustomInputWithLabel
                                    value = {song}
                                    setFunction = {setSong}
                                    label = ""
                                    type = "text"
                            />
                            <div style = {{paddingTop : 10,paddingRight : 10}}>
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
                                        style = {{fontSize : 40,}}
                                        variant="button"
                                        onClick={(e) => {setDisc()}}>
                                        +
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                        <CustomInputWithLabelExtra
                            value = {versions}
                            setFunction = {setVersions}
                            label= "Wersje wydań"
                        />
                    </div>
                    <div
                        style ={{
                            padding:20,
                            justifyContent : "center",
                            alignItems:"center",
                        }}>
                            <Button
                                style={{
                                    variant: "contained",
                                    background: "#706D69",
                                    color: "white",
                                    borderRadius: "2px",
                                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                                    width : 200,
                                }}>
                                <Typography
                                    style = {{fontSize : 25,}}
                                    variant="button"
                                    onClick={() => {sendData()}}
                                >
                                    Dodaj wpis
                                </Typography>
                            </Button>
                        </div>
                </div>
            </div>
        );
    }
    else{
        navigate("/login");
    }
}

export default AddEntry;