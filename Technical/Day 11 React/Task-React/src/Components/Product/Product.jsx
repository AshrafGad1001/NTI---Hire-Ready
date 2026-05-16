import { Fragment, useState } from "react";

export default function Product({ product, onDelete, onUpdate }) {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        count: product.count,
        description: product.description,
        hasSale: product.hasSale,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSave = () => {
        onUpdate(product.id, {
            ...formData,
            price: parseFloat(formData.price),
            count: parseInt(formData.count),
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: product.name,
            price: product.price,
            count: product.count,
            description: product.description,
            hasSale: product.hasSale,
        });
        setIsEditing(false);
    };

    return (
        <div className="card h-100 shadow-sm rounded-4 border-0 position-relative">
            <div className="card-body d-flex flex-column p-4">

                {
                    !isEditing ? (

                        <Fragment>
                            {product.hasSale && (
                                <div className="position-absolute top-0 end-0 m-2 px-2 py-1
                                                bg-danger text-white rounded-pill
                                                fw-bold small shadow-sm
                                                d-flex align-items-center gap-1">
                                    Sale
                                </div>
                            )}

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

                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary w-100">
                                        Add
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => setIsEditing(true)}
                                        title="Edit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDelete(product.id)}
                                        title="Delete"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Fragment>

                    ) : (

                        <Fragment>
                            <h2 className="fs-6 fw-bold text-warning mb-3">Edit Product</h2>

                            <div className="mb-2">
                                <label className="form-label small fw-bold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control form-control-sm"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-bold">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control form-control-sm"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-bold">Stock</label>
                                <input
                                    type="number"
                                    name="count"
                                    className="form-control form-control-sm"
                                    value={formData.count}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-bold">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control form-control-sm"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    name="hasSale"
                                    className="form-check-input"
                                    id={`sale-${product.id}`}
                                    checked={formData.hasSale}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label small" htmlFor={`sale-${product.id}`}>
                                    Has Sale
                                </label>
                            </div>

                            <div className="d-flex gap-2 mt-auto">
                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleSave}
                                >
                                     Save
                                </button>
                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Fragment>
                    )
                }

            </div>
        </div>
    );
}