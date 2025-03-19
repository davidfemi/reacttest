import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className='navbar'>
            <div className="navContainer">
                <span className="logo" onClick={() => navigate('/')}>Stay Book</span>
                <div className="navItems">
                    {user ? (
                        <>
                            <span className="userName">Welcome, {user.name}</span>
                            <button className="navButton" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="navButton" onClick={() => navigate('/register')}>Register</button>
                            <button className="navButton" onClick={() => navigate('/login')}>Login</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar