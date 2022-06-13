import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
	return (
		<AppBar position="static" style={{ padding: 5, background: "#706D69" }}>
			<Toolbar>
				<Link
					to={"/"}
					style={{ flexGrow: 1, textDecoration: "none", color: "#E5E5E5",fontWeight: "bolder",}}>
					<Typography variant="h3">WINYL<br></br>OTEKA</Typography>
				</Link>
				<div
					style={{
						display: "flex",
						gap: 15,
						paddingRight : 10,
					}}>
					<Link
						to={"/login"}
						style={{ flexGrow: 1, textDecoration: "none", color: "#E5E5E5",fontWeight: "bold", }}>
						<Typography variant="h4">Zaloguj się</Typography>
					</Link>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
