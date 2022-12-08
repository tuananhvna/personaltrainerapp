import React, {useEffect, useState} from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs, { Dayjs } from 'dayjs';

export default function TrainingList() {
    //states
    const [trainings, setTrainings] = useState([]);

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
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true}
    ]

    return (
        <div className="ag-theme-material"
        style={{height: '700px'}} >
        <AgGridReact
            animateRows={true}
            rowSelection="single"
            columnDefs={columns}
            rowData={trainings}>
        </AgGridReact>
      </div>
    
    )
}