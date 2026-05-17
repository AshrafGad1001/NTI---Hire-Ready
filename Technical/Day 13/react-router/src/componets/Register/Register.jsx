// src/componets/Register/Register.jsx
import { Link } from 'react-router-dom';

export function Register() {
    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h2 className="text-center fw-bold mb-4">Register</h2>

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm your password"
                    />
                </div>

                <button className="btn btn-success w-100 mt-2">
                    Register
                </button>

                <p className="text-center text-muted mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>

        </section>
    )
}