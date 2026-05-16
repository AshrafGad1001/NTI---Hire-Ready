import { Fragment } from "react";

export default function Product({ product, onDelete }) {
    return (
        <Fragment>
            <div className="card h-100 shadow-sm rounded-4 border-0">
                <div className="card-body d-flex flex-column p-4">

                    {product.hasSale ? <div
                        className="position-absolute top-0 end-0 m-2 px-2 py-1 bg-danger text-white rounded fw-bold  shadow-sm d-flex align-items-center gap-1"
                    >
                        Sale
                    </div> : null}

                    <h2 className="card-title fs-5 fw-bold text-primary mb-2">
                        {product.name}
                    </h2>

                    <p className="card-text text-muted flex-grow-1">
                        {product.description}
                    </p>

                    <div className="mt-3">
                        <p className="fw-bold fs-5 mb-2">
                            <span className="text-success">${product.price}</span>
                        </p>

                        <p className="mb-2">
                            In Stock:
                            <span className="badge bg-dark ms-2">{product.count}</span>
                        </p>

                        <p className="mb-3">
                            {product.hasSale
                                ? <span className="badge bg-success">On Sale</span>
                                : <span className="badge bg-secondary">Regular Price</span>
                            }
                        </p>

                        {/* <button className="btn btn-primary w-100">
                            Add to Cart
                        </button> */}
                        <button
                            className="btn btn-danger opacity-80 w-100"
                            onClick={() => onDelete(product.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}