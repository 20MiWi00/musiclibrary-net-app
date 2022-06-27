import {Typography,} from "@mui/material";
import sample from "./sample.json";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



const InfoEntry = () => {

    const params = useParams();
    const [info,setInfo] = useState(null);

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
            .then(res => setInfo(res.data.data))
            .catch(error => console.log("Error detected: " + error))
        }
        if(info == null)
            fetchData()
    },[]);

    if(info == null){
        return( <div>Loading</div> )
    }
    else {
        return(
            <div
                style = {{
                    display : "flex",
                    flexDirection:"column",
                }}>
                <div
                    style={{
                        display : "flex",
                        flexDirection:"row",
                        paddingTop : 50,
                    }}>
                    <div
                        style = {{
                            display:"flex",
                            flexDirection : "column",
                            alignItems : "center",
                            justifyContent : "center",
                            textAlign : "center",
                            width : "45%",
                            paddingLeft : 150,
                            gap: 30,
                        }}>
                            <Typography variant = "h4" fontWeight="bold">{info.title}</Typography>
                            <Typography variant = "h4" fontWeight="bold">{info.singer}</Typography>
                            <img alt="Image" style = {{ width : 400, height : 380, borderRadius: "2px",}} src={`http://localhost:8080/files/${info.filename}`}/>
                    </div>
                    <div
                        style = {{
                            display:"flex",
                            flexDirection: "column",
                            justifyContent : "center",
                            textAlign : "start",
                            width : "55%",
                            paddingTop : 150,
                            paddingLeft : 150,
                            paddingRight : 20,
                            gap: 30,
                        }}>
                        <Typography variant = "h5" fontWeight="bold">Rok produkcji: {info.yearofproduction}</Typography>
                        <Typography variant = "h5" fontWeight="bold">Gatunek: {info.category}</Typography>
                        <Typography variant = "h5" fontWeight="bold">Opis:</Typography>
                        <Typography variant = "h5" fontWeight="bold">{info.description}</Typography>
                    </div>
                </div>
                <div
                    style={{
                        display : "flex",
                        flexDirection:"row",
                        paddingTop : 50,
                    }}>
    
                </div>
                <div
                    style = {{
                        display:"flex",
                        flexDirection : "column",
                        textAlign : "start",
                        paddingTop : 10,
                        paddingBottom : 20,
                        paddingLeft : 30,
                        gap : 20,      
                        whiteSpace: "pre-wrap"              
                    }}>
                    <Typography variant = "h4" fontWeight="bold">Spis utworów: </Typography>
                    <Typography variant = "h5" fontWeight="bold">{info.songtrack}</Typography>
                    <br></br>
                    <Typography variant = "h4" fontWeight="bold">Dodatkowe informacje: </Typography>
                    <Typography variant = "h5" fontWeight="bold">{info.vinylversions}</Typography>
                </div>
            </div>
        );
    }
}

export default InfoEntry;

