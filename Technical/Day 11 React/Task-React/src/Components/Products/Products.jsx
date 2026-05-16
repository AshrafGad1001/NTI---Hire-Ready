import { Fragment, useState } from "react";
import Product from './../Product/Product';

export default function Products() {
    const [products, setProducts] = useState([
        { id: 1, name: "Samsung Galaxy S24 Ultra", price: 1199.99, count: 50, hasSale: true, description: "Flagship Samsung smartphone with Snapdragon processor and 200MP camera." },
        { id: 2, name: "Samsung Galaxy A55", price: 449.99, count: 120, hasSale: false, description: "Mid-range Samsung phone with AMOLED display and excellent battery life." },
        { id: 3, name: "Samsung Galaxy Buds2 Pro", price: 229.99, count: 80, hasSale: true, description: "Wireless earbuds with active noise cancellation and premium sound." },
        { id: 4, name: "Samsung Galaxy Watch6", price: 299.99, count: 70, hasSale: false, description: "Smartwatch with fitness tracking and health monitoring features." },
        { id: 5, name: "Samsung 55-Inch Crystal UHD TV", price: 699.99, count: 35, hasSale: true, description: "4K Smart TV with vivid colors and built-in streaming apps." },
        { id: 6, name: "Samsung T7 Portable SSD 1TB", price: 109.99, count: 150, hasSale: false, description: "High-speed portable SSD with USB-C connectivity and compact design." },
        { id: 7, name: "Samsung Galaxy Tab S9", price: 799.99, count: 60, hasSale: true, description: "Premium Android tablet with AMOLED display and S Pen support." },
        { id: 8, name: "Samsung Odyssey G5 Gaming Monitor", price: 349.99, count: 40, hasSale: false, description: "Curved gaming monitor with 144Hz refresh rate and QHD resolution." },
        { id: 9, name: "Samsung 980 PRO 2TB SSD", price: 189.99, count: 90, hasSale: true, description: "High-performance NVMe SSD designed for gaming and professional workloads." },
        { id: 10, name: "Samsung Galaxy Book4 Pro", price: 1299.99, count: 25, hasSale: false, description: "Lightweight Samsung laptop with Intel Core Ultra processor and AMOLED display." }
    ]);

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };
    const handleUpdate = (id, updatedData) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, ...updatedData } : p
        ));
    };

    return (
        <Fragment>
            <h1 className="text-center py-4">Products</h1>

            <div className="container-fluid bg-primary bg-opacity-10 py-5">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {
                        products.map((p) => (
                            <div
                                key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <Product product={p} onDelete={handleDelete} onUpdate={handleUpdate} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}