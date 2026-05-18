// src/componets/Login/Login.jsx

export function Login() {
    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h2 className="text-center fw-bold mb-4">Login</h2>

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

                <button className="btn btn-primary w-100 mt-2">
                    Login
                </button>

                <p className="text-center text-muted mt-3">
                    Don't have an account? <a href="#">Register</a>
                </p>

            </div>

        </section>
    )
}