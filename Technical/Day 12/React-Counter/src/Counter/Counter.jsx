import { useState, useEffect } from "react";

export default function Counter() {

    const [count, setCount] = useState(0);

    // useffect(() => {

    //     console.log("Component Div");

    // }, []);  

    useEffect(() => {
        console.log(`Update......Count : ${count}`);
    }, [count]);

    useEffect(() => {

        console.log("Component Mounted");

        return () => {
            console.log("******************Component Unmounted******************");
        };
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">

            <h1 className="display-1 fw-bold text-primary mb-4">
                {count}
            </h1>

            <div className="d-flex gap-3">

                <button
                    className="btn btn-danger btn-lg px-4"
                    onClick={() => setCount(prev => prev - 1)}
                >
                    minus
                </button>

                <button
                    className="btn btn-secondary btn-lg px-4"
                    onClick={() => setCount(0)}
                >
                    Reset
                </button>

                <button
                    className="btn btn-success btn-lg px-4"
                    onClick={() => setCount(prev => prev + 1)}
                >
                    Add
                </button>

            </div>

        </div>
    );
}