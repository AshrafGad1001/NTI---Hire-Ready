'use client'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <Box sx={{
            bgcolor: '#f5f5f5',
            color: 'text.primary',
            textAlign: 'center',
            minHeight: 'calc(100vh - 128px)',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container maxWidth="sm">

                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Contact Us
                </Typography>

                <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
                    We would love to hear from you
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Send Message
                    </Button>
                </Box>

            </Container>
        </Box>
    )
}