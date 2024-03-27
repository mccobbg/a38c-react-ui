
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Header from '../Header';
import { useStateContext } from '../../context';
import { useFetchData } from '../../api';
import { AccountTransaction, User } from '../../types';
import { currencyFormat } from '../../utils';
import Spinner from '../Spinner';
import './index.css';

const Balance = () => {
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const {
        isLoading,
        isError,
        error,
        data: transactions
    } = useFetchData('myBalance', user as User);

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <span>Error: {(error as Error).message}</span>
    }

    const transactionList = !!transactions && (transactions as AccountTransaction[]).map((transaction, index) => {
        return <tr key={index}>
            <th>{((transaction as AccountTransaction).transactionDt).toString()}</th>
            <td>{(transaction as AccountTransaction).transactionSummary}</td>
            <td>{(transaction as AccountTransaction).transactionType==='Withdrawal' ? (currencyFormat(transaction.transactionAmt)) : ' '}</td>
            <td>{(transaction as AccountTransaction).transactionType==='Deposit' ? (currencyFormat(transaction.transactionAmt)) : ' '}</td>
            <td>{currencyFormat((transaction as AccountTransaction).closingBalance)}</td>
        </tr>
      });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <Header />
        <div className="site-section">
            <div className="table-responsive-md">
                <div className="row mb-4">
                <div className="col-md-7">
                    <h3 className="heading-21921">Current Balance</h3>
                </div>
                </div>
                <div className="row text-white align-items-center text-center h-100">
                <div className="col-md-4 bg-dark p-5 " style={{height:'130px'}}>
                    <h1 className="text-white">{(transactions && (transactions as AccountTransaction[]).length>0) ? (currencyFormat((transactions as AccountTransaction[])[0].closingBalance)) : ' '}</h1>
                </div>
                </div>
            </div>
            <div className="table-responsive-md">
                <div className="row mb-4">
                <div className="col-md-7">
                    <h3 className="heading-21921">Transaction Details</h3>
                </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Summary</th>
                        <th scope="col">Withdrawal</th>
                        <th scope="col">Deposit</th>
                        <th scope="col">Closing Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList}
                    </tbody>
                </table>
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

export default Balance;