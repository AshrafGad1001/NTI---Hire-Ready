'use client'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { addToCart } from '@/lib/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStar, faEye } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Product.module.css'

export default function Product({ p }: { p: any }) {
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)
    const [added, setAdded] = useState(false)

    async function handleAddToCart() {
        setIsLoading(true)
        await dispatch(addToCart(p._id))
        setIsLoading(false)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className={`card h-100 ${styles.card}`}>
            <div className={styles.imgWrap}>
                <Link href={`/products/${p._id}`}>
                    <img src={p.imageCover} alt={p.title} className={styles.img} />
                </Link>
                <div className={styles.shimmer} />
                <span className={styles.badge}>{p.category?.name}</span>
                <Link href={`/products/${p._id}`} className={styles.viewBtn}>
                    <FontAwesomeIcon icon={faEye} />
                    {' '}View
                </Link>
            </div>
            <div className={`card-body d-flex flex-column gap-2 p-3 ${styles.body}`}>
                <h6 className={styles.title}>
                    {p.title.split(' ').slice(0, 5).join(' ')}
                </h6>
                <div className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <span className={styles.ratingVal}>{p.ratingsAverage}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-auto">
                    <span className={styles.price}>
                        {p.price} <span className={styles.currency}>EGP</span>
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isLoading}
                        className={`btn ${styles.cartBtn} ${added ? styles.added : ''} ${isLoading ? styles.loading : ''}`}
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                        {' '}{isLoading ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}