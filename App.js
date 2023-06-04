import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
import HomePage from './components/HomePage';
import BorderCountry from './components/BorderCountry';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} ></Route>
        <Route exact path='/country-details/name/:id' element={<CountryDetails/>}></Route>
        <Route exact path='/country-details/alpha/:border' element={<BorderCountry/>} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
