import {Typography,} from "@mui/material";
import sample from "./sample.json";
import { useParams } from "react-router-dom";

const InfoEntry = () => {

    const data = useParams();
    const info = sample[0];

    return(
        <div
            style = {{
                display : "flex",
                flexDirection:"column",
            }}>
            <Typography variant = "h6" fontWeight="bold" style = {{paddingBottom : 20,}}>Autor: {info.user}</Typography>
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
                        <img alt="Image" style = {{ width : 400, height : 380, borderRadius: "2px",}} src={info.image}/>
                </div>
                <div
                    style = {{
                        display:"flex",
                        flexDirection: "column",
                        justifyContent : "center",
                        textAlign : "start",
                        width : "55%",
                        paddingTop : 150,
                        paddingRight : 150,
                        gap: 30,
                    }}>
                    <Typography variant = "h5" fontWeight="bold">Rok produkcji: {info.yearOfProduction}</Typography>
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
                <Typography variant = "h5" fontWeight="bold">{info.songTrack}</Typography>
                <br></br>
                <Typography variant = "h4" fontWeight="bold">Wersje winyli: </Typography>
                <Typography variant = "h5" fontWeight="bold">{info.vinylWersions}</Typography>
            </div>
        </div>
    );
}

export default InfoEntry;

