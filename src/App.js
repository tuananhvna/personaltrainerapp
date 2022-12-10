import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import {  BrowserRouter,  Routes,  Route,  Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/customers">Customers</Link>{' '}
              <Link to="/trainings">Trainings</Link>{' '}
            </Typography>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
