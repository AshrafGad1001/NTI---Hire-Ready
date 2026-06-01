'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { Box, Badge, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { logout } from '@/lib/authSlice'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const cartCount = useSelector((state: RootState) => state.cart.cartCount)

    function handleLogout() {
        dispatch(logout())
        router.push('/login')
    }

    return (
        <AppBar position="static" sx={{ bgcolor: '#7c3aed' }}>
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 0, mr: 2, fontWeight: 800 }}>
                    MyApp
                </Typography>

                {/* Nav Links */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button color="inherit" component={Link} href="/profile">Profile</Button>
                    <Button color="inherit" component={Link} href="/posts">Posts</Button>
                    <Button color="inherit" component={Link} href="/counter">Counter</Button>
                    <Button color="inherit" component={Link} href="/products">Products</Button>
                </Box>

                {/* Auth Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                    {/* Cart */}
                    {token && (
                        <IconButton color="inherit" component={Link} href="/cart">
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    )}

                    {token ? (
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} href="/login">
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                component={Link}
                                href="/register"
                                sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                </Box>

            </Toolbar>
        </AppBar>
    )
}