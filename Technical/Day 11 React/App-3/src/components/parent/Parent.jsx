import { useState } from "react";
import { Child } from "../child/Child";

export function Parent() {

    let [Products, setProducts] = useState([
        { id: 1, name: "iphone13promax", price: 30000, category: "electronics" },
        { id: 2, name: "iphone14promax", price: 40000, category: "electronics" },
        { id: 3, name: "iphone15promax", price: 50000, category: "electronics" },
        { id: 4, name: "iphone16promax", price: 60000, category: "electronics" },
        { id: 5, name: "iphone17promax", price: 70000, category: "electronics" }
    ]);

    
    function handleDelete(productId) {
        setProducts(Products.filter(product => product.id !== productId));
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5 fw-bold">Product List</h1>
            <div className="row g-4">
                {Products.map(product => (
                    <Child
                        key={product.id}
                        producItem={product}
                        onDelete={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
}