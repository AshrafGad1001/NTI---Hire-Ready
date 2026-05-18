
export function Men() {
    return (
        <div>
            <h4 className="fw-bold text-dark mb-4">
                Men's Clothes
            </h4>
            <div className="row g-3">
                {["T-Shirts", "Jeans", "Jackets", "Shoes"].map((item) => (
                    <div key={item} className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-3 text-center">
                            <p className="fw-bold text-primary mb-0">{item}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}