import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddEntry from "./pages/addEntry";
import Login from "./pages/login";
import MainPage from "./pages/main";
import Register from "./pages/register";
import InfoEntry from "./pages/infoEntry";
import UserPanel from "./pages/userPanel";
import Settings from "./pages/settings";

const App = () => {

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
			}}>
			<NavBar />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register/>}/>
				<Route path="/addEntry/:userID" element={<AddEntry/>}/>
				<Route path="/infoEntry/:ID" element={<InfoEntry/>}/>
				<Route path = "/userPanel/:userID" element={<UserPanel />}/>
				<Route path ="/settings/:userID" element={<Settings/>}/>
			</Routes>
		</div>
	);
};

export default App;
