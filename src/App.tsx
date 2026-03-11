import {Route, Routes} from "react-router-dom";
import {Employees} from "./pages/Employees.tsx";
import {Store} from "./pages/Store.tsx";
import {About} from "./pages/About.tsx";
import {Navbar} from "./pages/Navbar.tsx";
import {Login} from "./pages/Login.tsx";
import {UserRegister} from "./pages/UserRegister.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<UserRegister/>}/>
                <Route path="/employees" element={<Employees/>}/>
                <Route path="/store" element={<Store/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </>
    )
}

export default App
