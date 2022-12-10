import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

export default function TrainingCalendar(props) {

    const events = [
        {
            title: "Big Meeting",
            allDay: true,
            start: new Date(2022, 12, 10),
            end: new Date(2022, 12, 10),
        },
        {
            title: "Vacation",
            start: new Date(2021, 6, 7),
            end: new Date(2021, 6, 10),
        },
        {
            title: "Conference",
            start: new Date(2021, 6, 20),
            end: new Date(2021, 6, 23),
        },
    ];
    // console.log(props.trainings)
    return (
        <div className="ag-theme-material">

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={style}
            />
    
        </div>
    )
}