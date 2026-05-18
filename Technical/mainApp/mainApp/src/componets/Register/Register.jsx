import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

export default function Register() {


    function handelRegister() {
        console.log("-------------Ashraf------------✅");

    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: ''
        },
        onSubmit: handelRegister

    });

    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "450px" }}>

                <h2 className="text-center fw-bold mb-4">Register</h2>

                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter your first name"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter your last name"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="repassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            onChange={formik.handleChange}
                            value={formik.values.repassword}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 mt-2">
                        Register
                    </button>

                </form>

                <p className="text-center text-muted mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>

        </section>
    )
}