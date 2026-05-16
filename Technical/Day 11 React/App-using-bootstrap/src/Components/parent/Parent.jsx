import Child from "../Child/Child";


export default function Parent() {
    return (
        <>
            <div>parent</div>

            <div className="p-3 shadow border border-danger rounded mt-3">
                <Child />
            </div>
        </>
    )
}
