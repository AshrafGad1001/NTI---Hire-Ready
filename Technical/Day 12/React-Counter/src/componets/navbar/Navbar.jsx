import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    MyLogo
                </div>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="about">About</Link></li>
                    <li><Link to="gallery">Gallery</Link></li>
                    {/* <li><Link to="contact">Contact</Link></li> */}
                </ul>

                <button className="btn">
                    Login
                </button>
            </nav>
        </>
    )
}