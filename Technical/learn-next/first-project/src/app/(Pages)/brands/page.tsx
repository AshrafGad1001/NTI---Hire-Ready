import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

interface Brand {
    _id: string
    name: string
    image: string
}

interface Product {
    brand: Brand
}

async function getBrands(): Promise<Brand[]> {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')

    
    const brandsMap = new Map<string, Brand>()
    data.data.forEach((product: Product) => {
        if (product.brand && !brandsMap.has(product.brand._id)) {
            brandsMap.set(product.brand._id, product.brand)
        }
    })

    return Array.from(brandsMap.values())
}

export default async function Brands() {
    const brands = await getBrands()

    return (
        <Container sx={{ py: 4 }}>

            {/* Title */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    mb: 4,
                    textAlign: 'center',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        display: 'block',
                        width: '60px',
                        height: '4px',
                        bgcolor: 'primary.main',
                        borderRadius: '2px',
                        mx: 'auto',
                        mt: 1,
                    }
                }}
            >
                All Brands
            </Typography>

            {/* Brands */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'center',
            }}>
                {brands.map((brand: Brand) => (
                    <Box key={brand._id} sx={{
                        width: { xs: 'calc(50% - 12px)', sm: 'calc(33% - 16px)', md: 'calc(20% - 19px)' },
                    }}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 4,
                            }
                        }}>

                            {/* Brand Image */}
                            <CardMedia
                                component="img"
                                image={brand.image}
                                alt={brand.name}
                                sx={{
                                    objectFit: 'contain',
                                    p: 2,
                                    height: 120,
                                }}
                            />

                            {/* Brand Name */}
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {brand.name}
                                </Typography>
                            </CardContent>

                        </Card>
                    </Box>
                ))}
            </Box>

        </Container>
    )
}