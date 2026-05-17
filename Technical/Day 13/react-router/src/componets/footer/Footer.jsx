import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <>
            <footer className="footer">

                <div className="footer-container">

                    <div className="footer-logo">
                        <h2>MyWebsite</h2>
                        <p>Learn React Step By Step</p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>

                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact</h3>

                        <p>Email: test@gmail.com</p>
                        <p>Phone: 0123456789</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© 2026 All Rights Reserved</p>
                </div>

            </footer>
        </>
    )
}