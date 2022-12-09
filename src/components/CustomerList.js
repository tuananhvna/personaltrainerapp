import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomerList() {
    //states
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    
    //fetch data from customers api
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    //columns definition
    const columns = [
        {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true},
        {headerName: '', cellRenderer: (params) => {
            return <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteCustomer}>Delete</Button>;
        }},
        {headerName: '', cellRenderer: (params) => {
            return <EditCustomer updateCustomer={updateCustomer} customer={params.data} />;
        }}
    ]

    //delete customer
    const deleteCustomer = event => {
        if(window.confirm("Are you sure that you want to delete this customer?")) {
            fetch(gridRef.current.getSelectedNodes()[0].data.links[0].href, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setOpenSnackBar(true);
        }
    }

    //add customer
    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    
    //edit customer
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
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

            <AddCustomer saveCustomer={saveCustomer} />

            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Deleted customer"
                action={action}
            />

            <AgGridReact
                animateRows={true}
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={customers}>
            </AgGridReact>
    
        </div>
    )
}