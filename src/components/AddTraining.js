import React, {useEffect, useState, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from'@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddTraining(props) {
    //states
    const [training, setTraining] = useState({
        date: '', duration: '', activity: ''
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
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
        setOpenSnackBar(true);
    }

    //update datepicker
    const dateChange = (newValue) => {
        setTraining({...training, date: newValue});
    };

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
            Add training
        </Button>
        <Snackbar
            open={openSnackBar}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Added training"
            action={action}
        />
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <DialogContent>
                                    <DateTimePicker
                                        autoFocus
                                        margin="dense"
                                        name="date"
                                        value={training.date}
                                        label="Date"
                                        onChange={dateChange}
                                        fullWidth
                                        variant="standard"
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                </DialogContent>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        name="duration"
                                        value={training.duration}
                                        label="Duration"
                                        onChange={event => handleInputChange(event)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        name="activity"
                                        value={training.activity}
                                        label="Activity"
                                        onChange={event => handleInputChange(event)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                        </Stack> 
                    </LocalizationProvider>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addTraining}>Save</Button>
            </DialogActions>
        </Dialog>
    
        </div>
    )
}