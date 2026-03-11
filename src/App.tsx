import {Route, Routes} from "react-router-dom";
import {Employees} from "./pages/Employees.tsx";
import {Store} from "./pages/Store.tsx";
import {About} from "./pages/About.tsx";
import {Navbar} from "./pages/Navbar.tsx";
import {Login} from "./pages/Login.tsx";
import {UserRegister} from "./pages/UserRegister.tsx";
import {Profile} from "./pages/Profile.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";

function App() {
    return (
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<UserRegister/>}/>
                <Route path="/employees" element={<Employees/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/store" element={<Store/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </AuthProvider>
    )
}

export default App
