'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import api from '@/utils/axios';

interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Dialog State
  const [open, setOpen] = useState(false);
  const [dialogError, setDialogError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get('/employees');
      setEmployees(res.data.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        // Interceptor might have failed to refresh, so redirect
        router.push('/login');
      } else {
        setError('Failed to fetch employees');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      fetchEmployees();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('access_token');
      router.push('/login');
    }
  };

  const handleOpenDialog = (employee?: Employee) => {
    setDialogError('');
    if (employee) {
      setEditingId(employee._id);
      setFormData({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        salary: employee.salary.toString()
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', position: '', department: '', salary: '' });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDialogError('');
    try {
      const payload = {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        salary: Number(formData.salary)
      };

      if (editingId) {
        await api.patch(`/employees/${editingId}`, payload);
      } else {
        await api.post('/employees', payload);
      }
      
      handleCloseDialog();
      fetchEmployees();
    } catch (err: any) {
      setDialogError(err.response?.data?.message || 'Failed to save employee');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Employee Dashboard
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />} 
            onClick={() => handleOpenDialog()}
            sx={{ mr: 2 }}
          >
            Add Employee
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ backgroundColor: '#0A192F' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No employees found. Add one!
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp._id} hover>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>${emp.salary.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenDialog(emp)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {editingId ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            {dialogError && <Alert severity="error" sx={{ mb: 2 }}>{dialogError}</Alert>}
            
            <TextField
              label="Name"
              fullWidth
              required
              margin="dense"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Position"
              fullWidth
              required
              margin="dense"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
            <TextField
              label="Department"
              fullWidth
              required
              margin="dense"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <TextField
              label="Salary"
              type="number"
              fullWidth
              required
              margin="dense"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingId ? 'Save Changes' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
