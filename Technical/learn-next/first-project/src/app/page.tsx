'use client'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <Box sx={{
      bgcolor: '#f5f5f5',
      color: 'text.primary',
      textAlign: 'center',
      minHeight: 'calc(100vh - 128px)', // 64px Navbar + 64px Footer
      display: 'flex',
      alignItems: 'center',
    }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to MyApp
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
          Discover the best products at the best prices
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            component={Link}
            href="/products"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Shop Now
          </Button>

        </Box>
      </Container>
    </Box>
  )
}