import { Link } from 'react-router-dom';
import '../index.css'
import '../Navbar.css'

const Navbar = () => {
    return (
        <nav id='navContainer'>
            <div id='title'> Course Booking App</div>
            <ul id='navBar'>
                <Link to ="/">
                    <li>Home</li>
                </Link>
                <Link to ="/courseform">
                    <li>Create Course</li>
                </Link>
                <Link to ="/">
                    <li>Enroll</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar