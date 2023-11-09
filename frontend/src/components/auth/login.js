import { useState } from 'react'
import { Link } from 'react-router-dom';


const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    //function for the signup button
    const handleLogin = () => {

        fetch('api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Login Error")
            })
            .then(data => {
                localStorage.setItem("username", data.username)
                localStorage.setItem("token", data.token)
                console.log("Login successful")
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h2>Log In</h2>
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
            <Link to="/courselist" onClick={handleLogin}>
            <button>Log In</button>
            </Link>
            <span> New student? </span>
            <Link to="/register">
            Register as a new student
            </Link>
        </div>
    )
}


export default Login