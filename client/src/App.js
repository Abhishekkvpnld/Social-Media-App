import {BrowserRouter,Route,Routes} from "react-router-dom";
import HomePage from "pages/homePage/HomePage";
import LoginPage from "pages/loginPage/LoginPage";
import ProfilePage from "pages/profilePage/ProfilePage";
// import Navbar from "pages/navbar/Navbar";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
