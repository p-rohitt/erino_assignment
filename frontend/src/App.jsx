import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TablePagination,
  TableSortLabel,
  Typography,
  Box,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          fontWeight: 'bold',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const initialFormState = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  company: '',
  jobTitle: '',
};

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('lastName');
  const [order, setOrder] = useState('asc');

  const API_URL = 'http://localhost:5001/api/contacts';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(API_URL);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && formData._id) {
        await axios.put(`${API_URL}/${formData._id}`, formData);
        setContacts((prevContacts) =>
          prevContacts.map((contact) => (contact._id === formData._id ? formData : contact))
        );
      } else {
        const response = await axios.post(API_URL, formData);
        setContacts([...contacts, response.data]);
      }
      setIsDialogOpen(false);
      setFormData(initialFormState);
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedContacts = React.useMemo(() => {
    return [...contacts].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [contacts, order, orderBy]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Contact Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
          >
            Add New Contact
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((column) => (
                  <TableCell key={column}>
                    <TableSortLabel
                      active={orderBy === column}
                      direction={orderBy === column ? order : 'asc'}
                      onClick={() => handleSort(column)}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.jobTitle}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEdit(contact)} size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(contact._id)} size="small" color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          sx={{color:"#fff"}}
        />

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{isEditing ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="company"
                label="Company"
                value={formData.company}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="jobTitle"
                label="Job Title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}