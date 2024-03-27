
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Header from '../Header';
import { Card, User } from '../../types';
import { useFetchData } from '../../api';
import { useStateContext } from '../../context';
import { currencyFormat } from '../../utils';
import Spinner from '../Spinner';
import './index.css';

const Cards = () => {
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const {
        isLoading,
        isError,
        error,
        data: cards
    } = useFetchData('myCards', user as User);
    const currOutstandingAmt = useRef<number>(0);

    const cardList = !!cards && (cards as Card[]).map((card, index) => {
        currOutstandingAmt.current += (card as Card).amountUsed;
        return (<tr key={index}>
            <th>{card.cardNumber}</th>
            <td>{card.cardType}</td>
            <td>{currencyFormat(card.totalLimit)}</td>
            <td>{currencyFormat(card.amountUsed)}</td>
            <td>{currencyFormat(card.availableAmount)}</td>
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
                <h3 className="heading-21921">Total Due Amount</h3>
            </div>
            </div>
            <div className="row text-white align-items-center text-center h-100">
            <div className="col-md-4 bg-dark p-5 " style={{height:'130px'}}>
                <h1 className="text-white">{currencyFormat(currOutstandingAmt.current)}</h1>
            </div>
            </div>
        </div>
        <div className="table-responsive-md">
            <div className="row mb-4">
            <div className="col-md-7">
                <h3 className="heading-21921">Card Details</h3>
            </div>
            </div>
            <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                <th scope="col">Card Number</th>
                <th scope="col">Type</th>
                <th scope="col">Total limit</th>
                <th scope="col">Amount used</th>
                <th scope="col">Avaiable Amt</th>
                </tr>
            </thead>
            <tbody>
                {currOutstandingAmt.current = 0}
                {cardList}
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

export default Cards;