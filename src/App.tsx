import {Route, Routes} from "react-router-dom";
import {Employees} from "./pages/Employees.tsx";
import {Store} from "./pages/Store.tsx";
import {About} from "./pages/About.tsx";
import {Navbar} from "./pages/Navbar.tsx";
import {Login} from "./pages/Login.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/employees" element={<Employees/>}/>
                <Route path="/store" element={<Store/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </>
    )
}

export default App
