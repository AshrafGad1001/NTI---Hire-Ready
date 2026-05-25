import axios from 'axios'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface Product {
    _id: string
    title: string
    price: number
    imageCover: string
    ratingsAverage: number
    category: {
        name: string
    }
}

async function getProducts(): Promise<Product[]> {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data.data
}

export default async function Products() {
    const products = await getProducts()

    return (
        <Container sx={{ py: 4 }}>

            {/* Title */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    mb: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                All Products
            </Typography>

            {/* Products */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
            }}>
                {products.map((product: Product) => (
                    <Box key={product._id} sx={{
                        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                    }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                            {/* Image */}
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imageCover}
                                alt={product.title}
                                sx={{ objectFit: 'contain', p: 2 }}
                            />

                            <CardContent sx={{ flexGrow: 1 }}>

                                {/* Category */}
                                <Typography variant="caption" sx={{ color: 'primary.main' }}>
                                    {product.category?.name}
                                </Typography>

                                {/* Title */}
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', my: 1 }}>
                                    {product.title.split(' ').slice(0, 4).join(' ')}
                                </Typography>

                                {/* Price & Rating */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                        {product.price} EGP
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'gray' }}>
                                        ⭐ {product.ratingsAverage}
                                    </Typography>
                                </Box>

                            </CardContent>

                            <CardActions sx={{ p: 2 }}>
                                <Button variant="contained" fullWidth>
                                    Add To Cart
                                </Button>
                            </CardActions>

                        </Card>
                    </Box>
                ))}
            </Box>

        </Container>
    )
}