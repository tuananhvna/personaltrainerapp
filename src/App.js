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

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div>
                <Link style={{color: "white"}} to="/customers">Customers</Link>
              </div>
              <div>
                <Link style={{color: "white"}} to="/trainings">Trainings</Link>
              </div>
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
