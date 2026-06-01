'use client'

import React from 'react'
import type { RootState } from '../../lib/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../lib/counterSlice'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f8f7ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Paper elevation={0} sx={{
                p: 6,
                borderRadius: 4,
                border: '1px solid #ede9fe',
                bgcolor: '#fff',
                textAlign: 'center',
                minWidth: 280,
            }}>

                <Typography variant="h6" sx={{ fontWeight: 700, color: '#7c3aed', mb: 4 }}>
                    Counter
                </Typography>

                <Typography variant="h2" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 4 }}>
                    {count}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                    <IconButton
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                        sx={{
                            bgcolor: '#ede9fe',
                            color: '#7c3aed',
                            width: 52,
                            height: 52,
                            '&:hover': { bgcolor: '#ddd6fe' },
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>

                    <IconButton
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                        sx={{
                            bgcolor: '#7c3aed',
                            color: '#fff',
                            width: 52,
                            height: 52,
                            '&:hover': { bgcolor: '#6d28d9' },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>

            </Paper>
        </Box>
    )
}