import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-auto py-4">
            <div className="container">
                <div className="row">


                    <div className="col-md-4 mb-3">
                        <Link href="/" className="navbar-brand">
                            <FontAwesomeIcon icon={faCartShopping} size="xl" className="text-secondary" />
                        </Link>
                        <div>
                            <p className="text-secondary mt-2">
                                Shopping made easy.
                            </p>
                        </div>
                    </div>


                    <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><Link href="/home" className="text-secondary text-decoration-none">Home</Link></li>
                            <li><Link href="/about" className="text-secondary text-decoration-none">About</Link></li>
                            <li><Link href="/services" className="text-secondary text-decoration-none">Services</Link></li>
                            <li><Link href="/contact" className="text-secondary text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>


                    <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Follow Us</h6>
                        <div className="d-flex gap-3">
                            <Link href="#" className="text-secondary">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </Link>

                            <Link href="#" className="text-secondary">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </Link>

                            <Link href="#" className="text-secondary">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </Link>
                        </div>
                    </div>

                </div>


                <div className="border-top border-secondary pt-3 text-center text-secondary">
                    <small>© {new Date().getFullYear()} MyApp. All rights reserved.</small>
                </div>
            </div>
        </footer>
    )
}