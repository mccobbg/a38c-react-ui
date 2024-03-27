import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import Header from '../Header';
import { useFetchData } from '../../api';
import { AccountInfo, User } from '../../types';
import { useStateContext } from '../../context';
import Spinner from '../Spinner';
import './index.css';

const Account = () => {
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const {
        isLoading,
        isError,
        error,
        data: account
    } = useFetchData('myAccount', user as User);

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <span>Error: {(error as Error).message}</span>
    }

    return (
        <>
        <Header />
        <div className="site-section">
        <div className="container">
            <div className="row mb-4">
            <div className="col-md-7">
                <h2 className="heading-21921">Account Information</h2>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className=" mb-4">
                <div className="form-group">
                    <Label for="customerName">Name</Label>
                    <input type="text" className="form-control" id='customerName' value={user?.name} disabled/>
                </div>
                <div className="form-group">
                    <Label for="customerEmail">Email</Label>
                    <input type="email" className="form-control" id='customerEmail' value={user?.email} disabled />
                </div>
                <div className="form-group">
                    <Label for="customerMobileNum">Mobile Number</Label>
                    <input type="text" className="form-control " id="customerMobileNum" value={user?.mobileNumber} disabled/>
                </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className=" mb-4">
                <div className="form-group">
                    <Label for="customerAccNo">Account Number</Label>
                    <input type="text" className="form-control" id='customerAccNo' value={(account as AccountInfo)?.accountNumber} disabled/>
                </div>
                <div className="form-group">
                    <Label for="customerAccountType">Account Type</Label>
                    <input type="email" className="form-control" id='customerAccountType' value={(account as AccountInfo)?.accountType} disabled />
                </div>
                <div className="form-group">
                    <Label for="branchAddress">Branch Address</Label>
                    <input type="text" className="form-control " id="branchAddress" value={(account as AccountInfo)?.branchAddress} disabled/>
                </div>
                </div>
            </div>
        </div>
            </div>
                <div className="row mb-5">
                    <div className="col">
                        <div className="">
                        <Button className="btn btn-eazybank" tag={Link} to="/dashboard">
                            BACK
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Account;