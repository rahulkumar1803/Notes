import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token2');
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbarStyle">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {
                        !localStorage.getItem('token') ?
                            <form className="d-flex gap-3">
                                <Link className="btn btn-outline-primary" to='/signup' role="button">SignUp</Link>
                                <Link className="btn btn-outline-primary" to='/login' role="button">Login</Link>
                            </form> :
                            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', gap:'20px'}}>
                                <p className='mt-2'>{localStorage.getItem('token2')}</p>
                                <button onClick={handleLogout} className="btn btn-outline-primary" role="button">Logout</button>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
