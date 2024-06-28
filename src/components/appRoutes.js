import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Auth/signIn';
import SignUp from './Auth/signUp';
import Logout from './Auth/logout';
import Home from '../pages/home';


const AppRoutes = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRoutes;