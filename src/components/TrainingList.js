import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function TrainingList() {
    //states
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();
    const [openSnackBar, setOpenSnackBar] = useState(false);

    //fetch data from trainings api
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    //columns definition
    const columns = [
        {headerName: 'Date', field: 'date', valueFormatter: (params) => {
            return dayjs(params.data.date).format('DD-MM-YYYY HH:mm');
        }, sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Duration in minutes', field: 'duration', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true},
        {headerName: '', cellRenderer: (params) => {
            return <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteTraining}>Delete</Button>;
        }},
        {headerName: '', cellRenderer: (params) => {
            return <EditTraining updateTraining={updateTraining} training={params.data} />;
        }}
    ]
    
    //delete training
    const deleteTraining = event => {
        if(window.confirm("Are you sure that you want to delete this training?")) {
            fetch(gridRef.current.getSelectedNodes()[0].data.links[0].href, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setOpenSnackBar(true);
        }
    }

    //add training
    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    //update training
    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    //snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

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
        <div className="ag-theme-material"
        style={{height: '700px'}} >
            <AddTraining saveTraining={saveTraining} />

            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Deleted training"
                action={action}
            />

            <AgGridReact
                animateRows={true}
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={trainings}>
            </AgGridReact>
    
        </div>
    )
}