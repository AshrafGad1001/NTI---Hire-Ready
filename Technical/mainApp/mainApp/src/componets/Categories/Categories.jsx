
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';
export default function Categories() {
    return (
        <section className="py-5 bg-light min-vh-100">
            <div className="container">

                {/* Header */}
                <div className="text-center mb-5">
                    <p className="fw-bold text-uppercase text-primary mb-2 small">
                        Shop By
                    </p>
                    <h2 className="display-5 fw-bold text-dark">
                        Our <span className="text-primary">Categories</span>
                    </h2>
                </div>

                <div className="row g-4">

                    {/* Sidebar */}
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3">

                            <p className="fw-bold text-uppercase text-primary mb-3 small">
                                <FontAwesomeIcon icon={faShirt} className="me-2" />
                                Clothes
                            </p>

                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                <li>
                                    <Link
                                        to="Men"
                                        className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 rounded-3 text-dark bg-primary bg-opacity-10"
                                    >
                                        <FontAwesomeIcon icon={faPerson} className="text-primary" />
                                        Men
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="Women"
                                        className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 rounded-3 text-dark bg-primary bg-opacity-10"
                                    >
                                        <FontAwesomeIcon icon={faPersonDress} className="text-primary" />
                                        Women
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-md-9">
                        <div className="card border-0 shadow-sm rounded-4 p-4" style={{ minHeight: "400px" }}>
                            <Outlet />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
