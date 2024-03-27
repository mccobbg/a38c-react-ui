import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useStateContext } from '../../context';
import { useFetchData } from '../../api';
import { Loan, User } from '../../types';
import { currencyFormat } from '../../utils';
import Spinner from '../Spinner';
import './index.css';


const Loans = () => {
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const {
        isLoading,
        isError,
        error,
        data: loans
    } = useFetchData('myLoans', user as User);
    const navigate = useNavigate();
    const currOutstandingBalance = useRef<number>(0);

    const handleLink = (link: string) => {
        navigate(link);
    }

    const loanList = !!loans && (loans as Loan[]).map((loan, index) => {
        currOutstandingBalance.current += (loan as Loan).outstandingAmount;
        return (<tr key={index}>
            <th>{((loan as Loan).startDt).toString()}</th>
            <td>{(loan as Loan).loanType}</td>
            <td>{currencyFormat((loan as Loan).totalLoan)}</td>
            <td>{currencyFormat((loan as Loan).amountPaid)}</td>
            <td>{currencyFormat((loan as Loan).outstandingAmount)}</td>
        </tr>)
    });

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
            <div className="table-responsive-md">
                <div className="row mb-4">
                    <div className="col-md-7">
                        <h3 className="heading-21921">Current Outstanding Balance</h3>
                    </div>
                </div>
                <div className="row text-white align-items-center text-center h-100">
                    <div className="col-md-4 bg-dark p-5 " style={{height: '130px'}}>
                        <h1 className="text-white">{currencyFormat(currOutstandingBalance.current)}</h1>
                    </div>
                </div>
            </div>
            <div className="table-responsive-md">
                <div className="row mb-4">
                    <div className="col-md-7">
                        <h3 className="heading-21921">Loan Details</h3>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">Start Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Total Loan</th>
                    <th scope="col">Amount Paid</th>
                    <th scope="col">Outstanding Amt</th>
                    </tr>
                </thead>
                <tbody>
                    {currOutstandingBalance.current = 0}
                    {loanList}
                </tbody>
                </table>
                </div>
                <div className="row mb-5">
                <div className="col">
                    <div className="">
                    <button className="btn btn-eazybank" onClick={() => handleLink('/dashboard')}>
                        BACK
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Loans;