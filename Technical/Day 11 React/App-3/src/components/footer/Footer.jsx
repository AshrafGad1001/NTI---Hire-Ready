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
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
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