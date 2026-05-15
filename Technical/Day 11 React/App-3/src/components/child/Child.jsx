export function Child(props) {

    let { id, name, price, category } = props.producItem;

    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card shadow border-0 h-100">
                <div className="card-body text-center">

                    <span className="badge bg-primary mb-3">{category}</span>
                    <h3 className="h5 mb-3">{name}</h3>
                    <h4 className="text-success mb-3">{price} EGP</h4>
                    <p className="text-muted">Product ID: {id}</p>

                    <button className="btn btn-dark w-100 mb-2">
                        Buy Now
                    </button>


                    <button
                        className="btn btn-danger w-100"
                        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "white" }}
                        onClick={() => props.onDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}