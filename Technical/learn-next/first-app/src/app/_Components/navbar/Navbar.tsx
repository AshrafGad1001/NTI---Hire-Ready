import Link from "next/link";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
            <div className="container">


                <Link href="/" className="navbar-brand">
                    <FontAwesomeIcon icon={faCartShopping} size="xl" className="text-secondary" />
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse align-items-center" id="navbarNav">


                    <ul className="navbar-nav mx-auto gap-2">
                        <li className="nav-item">
                            <Link href="/home" className="nav-link text-secondary">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className="nav-link text-secondary">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/services" className="nav-link text-secondary">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className="nav-link text-secondary">Contact</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav gap-2 align-items-center">
                        <li className="nav-item">
                            <Link href="/login" className="nav-link text-secondary">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/register" className="btn btn-outline-secondary btn-sm px-3">Register</Link>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>
    )
}