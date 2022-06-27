import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button,InputBase,Typography,Divider, Box} from "@mui/material";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomSelect from "../../components/CustomSelect";
import PhotoSelectItem from "../../components/PhotoSelectItem";
import CustomInputWithLabelExtra from "../../components/CustomInputWithLabelExtra";

const EditEntry = () => {

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

    useEffect(() => {
        const fetchData = async() => {
            await fetch('http://localhost:8080/getEntry',
            {
                method: "POST",
                body: params.ID
            })
            .then(response => response.json().then(data =>({
                data : data
            })))
            .then(res => setData(res))
            .catch(error => console.log("Error detected: " + error))
        }
        fetchData()
    },[]);

    function setData(response){
        setTitle(response.data.data.title);
        setArtist(response.data.data.singer);
        setCategory(response.data.data.category)
        setProductionYear(response.data.data.yearofproduction);
        setDescription(response.data.data.description);
        setFirstDisc(response.data.data.songtrack);
        setVersions(response.data.data.vinylversions);
        setPhoto(response.data.data.filename);
    }

    function setDisc(){
        if(song.length > 0){
            setFirstDisc(firstDisc => [...firstDisc,song + "\n"]);
            setSong("");
        }
    }

    async function sendData(){

        const formData = new FormData();
        formData.append('entryID',params.ID.toString());
        formData.append('title',title.toString());
        formData.append('singer',artist.toString());
        formData.append('category',category.toString());
        formData.append('yearOfProduction',productionYear.toString());
        formData.append('description',description.toString());
        formData.append('songTrack',firstDisc.toString());
        formData.append('vinylVersions',versions.toString());
        formData.append('file',photo);
        
        await fetch('http://localhost:8080/editEntry',
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
            alert("Zaktualizowano wpis")
			navigate(-1);
        }
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
                        <div style = {{paddingRight:300, paddingTop : 30}}>
                            <img alt="Image" style = {{ width : 400, height : 380, borderRadius: "2px",}} src={`http://localhost:8080/files/${photo}`} />
                        </div>
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
                            <Typography style={{color:"black", whiteSpace: "pre-wrap"}}>{firstDisc}</Typography>
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
                                        onClick={() => {setDisc()}}>
                                        +
                                    </Typography>
                                </Button>
                            </div>
                            <div style = {{paddingTop : 10, paddindLeft : 10,}}>
                                <Button
                                    style={{
                                        variant: "contained",
                                        background: "#994343",
                                        color: "white",
                                        borderRadius: "2px",
                                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                                        height : 40,
                                    }}>
                                    <Typography
                                        style = {{fontSize : 20,}}
                                        variant="button"
                                        onClick={() => {setFirstDisc("")}}>
                                        Wyczyść
                                    </Typography>
                                </Button>
                            </div>                            
                        </div>
                        <CustomInputWithLabelExtra
                            value = {versions}
                            setFunction = {setVersions}
                            label= "Dodatkowe informacje"
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
                                    style = {{fontSize : 18,}}
                                    variant="button"
                                    onClick={() => {sendData()}}
                                >
                                    Zaktualizuj wpis
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

export default EditEntry;