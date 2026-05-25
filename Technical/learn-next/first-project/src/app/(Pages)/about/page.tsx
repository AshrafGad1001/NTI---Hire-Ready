'use client'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function About() {
    return (
        <Box sx={{
            bgcolor: '#f5f5f5',
            color: 'text.primary',
            textAlign: 'center',
            minHeight: 'calc(100vh - 128px)',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    About Us
                </Typography>

                <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
                    We are passionate about delivering the best shopping experience
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        href="/products"
                    >
                        View Products
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        component={Link}
                        href="/contact"
                    >
                        Contact Us
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}