import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStateContext } from '../../context';
import logo from '../../assets/images/a38c-logo.png';
import './index.css';

const Header = () => {
    const stateContext = useStateContext()
    const user = stateContext.state.authUser;
    const prevLink = useRef<string>('');
    let { state } = useLocation();

    useEffect(() => {
        if (!state || !state.link) {
            document.getElementById('H01')?.classList.add('active');
            prevLink.current = 'H01';
        }
        else if (state.link !== prevLink.current) {
            document.getElementById(prevLink.current)?.classList.remove('active');
            document.getElementById(state.link)?.classList.add('active');
            prevLink.current = state.link;
        } 
    }, [state]);

    return (
        <div data-navigation="container" className="i-top-header">
            <div className="wrapper top-section">
                <div className="hleft">
                    <Link className="logo selfLogo" to={user && user.authStatus === 'AUTH' ? '/dashboard' : '/'}>
                        <img alt="logo" src={logo} height={54}/>
                    </Link>
                </div>
                <div className="mnav_hb hide">
                    <div className="hamburger">
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
                <nav className="hright dnav">
                    { !user || user.authStatus !== 'AUTH' ? (
                        <ul>
                    <li id='H01'><Link to='/' state={{ link: 'H01'}}>Home</Link></li>
                    <li id='H02'><Link to='/login' state={{ link: 'H02'}}>Login</Link></li>
                    <li id='H03'><Link to='/contact' state={{ link: 'H03'}}>Contact Us</Link></li>
                    <li id='H04'><Link to='/notices' state={{ link: 'H04'}}>Notices</Link></li>
                    </ul>
                    ) : (
                        <ul>
                    <li id='H01'><Link to='/dashboard' state={{ link: 'H05'}}>Dashboard</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                    </ul>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Header;