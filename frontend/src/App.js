//import packages
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//importing pages and components
import CourseList from "./components/course/CourseList";
import Navbar from "./components/Navbar";
import Register from './components/auth/register';
import Login from './components/auth/login';
import CourseForm from './components/course/courseForm';
import CourseDetails from './components/course/CourseDetails';

const getToken = () => {
  return localStorage.getItem('token');
}

function App() {

  const token = getToken();

  return <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route
          path='/'
          element={token ? <CourseList/> : <Navigate to = "/login"/>}
        />
        <Route path="/courselist" element={<CourseList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courseform" element={<CourseForm />} />
        <Route path="/coursedetails" element={<CourseDetails />} />
      </Routes>
    </Router>
  </div>;
}

export default App;
