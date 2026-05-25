'use client'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{ bgcolor: 'primary.main', color: 'white', mt: 'auto' }}
        >
            <Toolbar>

                {/* Brand */}
                <Typography variant="h6" sx={{ flexGrow: 0, mr: 2 }}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </Typography>

                {/* Quick Links - Center */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button color="inherit" component={Link} href="/">Home</Button>
                    <Button color="inherit" component={Link} href="/about">About</Button>
                    <Button color="inherit" component={Link} href="/services">Services</Button>
                    <Button color="inherit" component={Link} href="/contact">Contact</Button>
                </Box>

                {/* Social Icons - Right */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button color="inherit" component={Link} href="#">
                        <FontAwesomeIcon icon={faFacebook} />
                    </Button>
                    <Button color="inherit" component={Link} href="#">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                    <Button color="inherit" component={Link} href="#">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Button>
                </Box>

            </Toolbar>

            {/* Bottom Bar */}
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <Typography
                variant="body2"
                suppressHydrationWarning
                sx={{ textAlign: 'center', py: 1, opacity: 0.7 }}
            >
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </Typography>

        </Box>
    )
}