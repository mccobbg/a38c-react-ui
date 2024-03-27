
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useStateContext } from '../../context';
import './index.css';

const Logout = () => {
    const stateContext = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        stateContext.dispatch({ type: 'SET_USER', payload: null });
        navigate('/');
    });

    return (
        <Header />
    )

}

export default Logout;