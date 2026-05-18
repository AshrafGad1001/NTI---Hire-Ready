export default function Product({ p }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 h-100">


            <div style={{ height: "220px", overflow: "hidden" }} className="rounded-top-4">
                <img
                    src={p.imageCover}
                    alt={p.title}
                    className="img-fluid"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            <div className="card-body d-flex flex-column gap-2 p-3">


                <span
                    className="badge bg-primary bg-opacity-10 text-primary"
                    style={{ width: "fit-content" }}
                >
                    {p.category?.name}
                </span>


                <h6 className="fw-bold text-dark mb-0">
                    {p.title.split(' ').slice(0, 4).join(' ')}
                </h6>


                <div className="d-flex align-items-center gap-1">
                    <span className="text-warning">★</span>
                    <span className="small text-secondary">{p.ratingsAverage}</span>
                </div>


                <div className="d-flex align-items-center justify-content-between mt-auto">
                    <span className="fw-bold text-primary fs-5">
                        {p.price} EGP
                    </span>
                    <button className="btn btn-primary btn-sm rounded-3">
                        Add To Cart
                    </button>
                </div>

            </div>

        </div>
    )
}