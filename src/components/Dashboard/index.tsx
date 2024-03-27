
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useStateContext } from '../../context';
import './index.css';

const italicStyle = {
    color: '#343a40',
    fontSize: '3em',
};


const Dashboard = () => {
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const navigate = useNavigate();

    const handleLink = (link: string) => {
        navigate(link);
    }

    return (
        <>
        <Header />
        <div className="main-content">
            {/* content */}
            <div className="container-fluid content-top-gap">
                <div className="welcome-msg pt-3 pb-4">
                    <h1>Hi <span className="text-dark">{user?.name}</span>, Welcome back</h1>
                    <p>'You logged in as {user?.role}'</p>
                </div>

            {/* -- User data -- */}
            <div className="statistics">
                <div className="row">
                <div className="col-xl-6 pr-xl-2">
                    <div className="row">
                    <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={() => handleLink('/account')}>
                        <div className="card card_border border-primary-top p-4">
                        <i style={italicStyle} className="fa fa-user-circle-o"> </i>
                        <h3 className="text-dark number">Account</h3>
                        <p className="stat-text">View account details</p>
                        </div>
                    </div>
                    <div className="col-sm-6 pl-sm-2 statistics-grid" onClick={() => handleLink('/balance')}>
                        <div className="card card_border border-primary-top p-4">
                        <i style={italicStyle} className="fa fa-usd"> </i>
                        <h3 className="text-dark number">Balance</h3>
                        <p className="stat-text">View total available balance</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-6 pl-xl-2">
                    <div className="row">
                    <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={() => handleLink('/loans')}>
                        <div className="card card_border border-primary-top p-4">
                        <i style={italicStyle} className="fa fa-money"> </i>
                        <h3 className="text-dark number">Loans</h3>
                        <p className="stat-text">View Loan Details</p>
                        </div>
                    </div>
                    <div className="col-sm-6 pl-sm-2 statistics-grid">
                        <div className="card card_border border-primary-top p-4" onClick={() => handleLink('/cards')}>
                        
                        <i style={italicStyle} className="fa fa-credit-card"> </i>
                        <h3 className="text-dark number">Cards</h3>
                        <p className="stat-text">View credit card details</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>


            </div>
            {/* -- //content -- */}
        </div>
        {/* -- main content end -- */}
        </>
    )
}

/*


            
            
*/

export default Dashboard;