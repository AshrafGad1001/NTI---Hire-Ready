'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { addToCart } from '@/lib/cartSlice'
import {
    Box,
    Container,
    Typography,
    Chip,
    Button,
    CircularProgress,
    Rating,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function ProductDetails() {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get(
                    `https://ecommerce.routemisr.com/api/v1/products/${id}`
                )
                setProduct(data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    async function handleAddToCart() {
        setIsLoading(true)
        await dispatch(addToCart(product._id))
        setIsLoading(false)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress sx={{ color: '#7c3aed' }} />
        </Box>
    )

    if (!product) return null

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'center' }}>

                    {/* Image */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: 400,
                            height: 420,
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(124,58,237,0.15)',
                        }}>
                            <Image
                                src={product.imageCover}
                                alt={product.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </Box>
                    </Box>

                    {/* Info */}
                    <Box sx={{ flex: 1 }}>
                        <Chip
                            label={product.category?.name}
                            sx={{
                                mb: 2,
                                bgcolor: '#ede9fe',
                                color: '#7c3aed',
                                fontWeight: 600,
                                fontSize: '12px',
                            }}
                        />

                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 2 }}>
                            {product.title}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                            {product.description}
                        </Typography>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <Rating
                                value={product.ratingsAverage}
                                precision={0.1}
                                readOnly
                                size="small"
                            />
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                                {product.ratingsAverage}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                ({product.ratingsQuantity} reviews)
                            </Typography>
                        </Box>

                        {/* Price */}
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#7c3aed', mb: 4 }}>
                            {product.price}{' '}
                            <Typography component="span" variant="body1" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                                EGP
                            </Typography>
                        </Typography>

                        {/* Button */}
                        <Button
                            onClick={handleAddToCart}
                            disabled={isLoading}
                            variant="contained"
                            size="large"
                            startIcon={
                                isLoading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> :
                                added ? <CheckCircleIcon /> :
                                <ShoppingCartIcon />
                            }
                            sx={{
                                bgcolor: added ? '#10b981' : '#7c3aed',
                                borderRadius: 3,
                                px: 5,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: '15px',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: added ? '#059669' : '#6d28d9',
                                },
                                '&:disabled': {
                                    bgcolor: '#9ca3af',
                                    color: '#fff',
                                },
                            }}
                        >
                            {isLoading ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
                        </Button>

                    </Box>
                </Box>
            </Container>
        </Box>
    )
}