import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useStateContext } from './context';
import Home from './components/Home';
import Cards from './components/Cards';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import Balance from './components/Balance';
import Loans from './components/Loans';
import Notices from './components/Notices';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';

function App() {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  return (
    <Router>
        <Routes>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/account" element={user && user.authStatus === 'AUTH' ? <Account/> : <Login/>}/>
          <Route path="/dashboard" element={user && user.authStatus === 'AUTH' ? <Dashboard/> : <Login/>}/>
          <Route path="/balance" element={user && user.authStatus === 'AUTH' ? <Balance/> : <Login/>}/>
          <Route path="/loans" element={user && user.authStatus === 'AUTH' ? <Loans/> : <Login/>}/>
          <Route path="/cards" element={user && user.authStatus === 'AUTH' ? <Cards/> : <Login/>}/>
          <Route path="/notices" element={<Notices/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={user && user.authStatus === 'AUTH' ? <Logout/> : <Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
  )
}

export default App;
