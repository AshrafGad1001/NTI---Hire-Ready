import Link from 'next/link'

export default function nti() {
    return (
        <div className="container mt-5">
            <h1>NTI Courses</h1>

            <div className="d-flex gap-3 mt-4">

                <Link href="/nti/technical" className="btn btn-outline-secondary">
                    Technical
                </Link>

                <Link href="/nti/nonTechnical" className="btn btn-outline-secondary">
                    Non Technical
                </Link>

            </div>
        </div>
    )
}