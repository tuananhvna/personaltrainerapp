import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddCustomer(props) {
    //states
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })
    const [open, setOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenSnackBar(false);
    };

    const handleInputChange = event => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
        setOpenSnackBar(true);
    }

    //snackbar
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return (
        <div>
        
        <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>
            Add customer
        </Button>
        <Snackbar
            open={openSnackBar}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Added customer"
            action={action}
        />
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label="First name"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label="Last name"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label="Street address"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label="Postcode"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label="City"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label="Email"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label="Phone"
                        onChange={event => handleInputChange(event)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addCustomer}>Save</Button>
            </DialogActions>
        </Dialog>
    
        </div>
    )
}