'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { Box } from '@mui/material'

export default function Navbar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 0, mr: 2 }}>
                    MyApp
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button color="inherit" component={Link} href="/home">Home</Button>
                    <Button color="inherit" component={Link} href="/about">About</Button>
                    <Button color="inherit" component={Link} href="/services">Services</Button>
                    <Button color="inherit" component={Link} href="/contact">Contact</Button>
                    <Button color="inherit" component={Link} href="/products">Products</Button>
                    <Button color="inherit" component={Link} href="/brands">Brands</Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button color="inherit" component={Link} href="/login">Login</Button>
                    <Button variant="outlined" color="inherit" component={Link} href="/register">Register</Button>
                </Box>

            </Toolbar>
        </AppBar>
    )
}