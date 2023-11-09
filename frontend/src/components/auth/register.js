import { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    //function for the signup button
    const handleSignUp = () => {

        fetch('api/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Registration successful")   
            } else {
                console.log("Registration Error")                    
            }
        })
        .catch(error => console.log(error))

    }

    
    return (
        <div>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder='username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <span> Already a student? </span>
            <Link to="/login">
            Login 
            </Link>
        </div>
    )
}

export default Register