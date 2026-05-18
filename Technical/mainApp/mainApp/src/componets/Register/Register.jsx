import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

export default function Register() {

    async function handelRegister(values) {
        try {
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/signup',
                values
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        onSubmit: handelRegister
    });

    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "450px" }}>

                <h2 className="text-center fw-bold mb-4">Register</h2>

                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
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
                            name="rePassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
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