import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function CustomerList() {
    //states
    const [customers, setCustomers] = useState([]);
    
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
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true}
    ]

    return (
        <div className="ag-theme-material"
        style={{height: '700px'}} >

        <AgGridReact
            animateRows={true}
            columnDefs={columns}
            rowData={customers}>
        </AgGridReact>
      </div>
    
    )
}