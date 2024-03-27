
import { Link } from 'react-router-dom';
import Header from '../Header';
import { Notice } from '../../types';
import { useFetchNotices } from '../../api';
import Spinner from '../Spinner';
import './index.css';


const Notices = () => {
    const {
        isLoading,
        isError,
        error,
        data: notices
    } = useFetchNotices();

    const noticeList = !!notices && (notices as Notice[]).map((notice, index) => {
        return (
        <div className="row" key={index}>
            <div className="col-md-4 cardheader">
                <div className="card">
                    <div className="icon-wrap px-4 pt-4">
                        <div className="icon d-flex justify-content-center align-items-center bg-success rounded-circle fa fa-envelope-open">
                            <span className="ion-logo-ionic text-light"></span>
                        </div>
                    </div>
                    <div className="card-body pb-5 px-4">
                        <h5 className="card-title">{(notice as Notice).noticeSummary}</h5>
                        <p className="card-text">{(notice as Notice).noticeDetails}</p>
                        <Link className="btn btn-success" to='/contact'>Contact Us</Link>
                     </div>
                </div>
            </div>
        </div>)
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
        <section className="ftco-section" id="cards">
            <div className="container">
                {noticeList}
            </div>
        </section>
        </>
    )

}

export default Notices;