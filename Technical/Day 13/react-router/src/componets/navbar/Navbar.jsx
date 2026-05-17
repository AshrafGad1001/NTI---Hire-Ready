import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

                <div className="navbar-brand fw-bold">MyLogo</div>

                <ul className="navbar-nav me-auto d-flex flex-row gap-3">
                    <li className="nav-item"><Link to="" className="nav-link">Home</Link></li>
                    <li className="nav-item"><Link to="about" className="nav-link">About</Link></li>
                    <li className="nav-item"><Link to="gallery" className="nav-link">Gallery</Link></li>
                </ul>

                <div className="d-flex gap-2">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                    <Link to="/register" className="btn btn-success">Register</Link>
                </div>

            </nav>
        </>
    )
}