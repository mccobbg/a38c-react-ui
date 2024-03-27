import Header from '../Header';
import './index.css';

const Home = () => {

    return (
        <>
        <Header />
        <div className="welcome py-1">
            <div className="container py-xl-1 py-lg-1" id="services">
                <div className="row">
                    <div className="col-lg-5 welcome-left">
                        <h3 className="title-w3ls mt-2 mb-3">Services provided by EazyBank</h3>

                        <p className="mt-4 pr-lg-5">
                            Eazy Bank offers a diverse range of financial products and banking services to customers through a growing branch and ATM network and digital channels such as Netbanking, Phonebanking and MobileBanking.
                        </p>
                    </div>
                    <div className="col-lg-7 welcome-right text-center mt-lg-0 mt-5">
                        <div className="row">
                            <div className="col-sm-4 service-1-w3pvt serve-gd1">
                                <div className="serve-grid mt-4">
                                    <span className="fa fa-users s1"></span>
                                    <p className="mt-2">Personal Loan </p>
                                </div>
                            </div>
                            <div className="col-sm-4 service-1-w3pvt serve-gd2">
                                <div className="serve-grid mt-4">
                                    <span className="fa fa-handshake-o s2"></span>
                                    <p className="mt-2">Business Loan </p>
                                </div>
                                <div className="serve-grid mt-4">
                                    <span className="fa fa-home s3"></span>
                                    <p className="mt-2">Home Loan </p>
                                </div>
                            </div>
                            <div className="col-sm-4 service-1-w3pvt serve-gd3">
                                <div className="serve-grid mt-4">
                                    <span className="fa fa-car s4"></span>
                                    <p className="mt-2">Auto Loan </p>
                                </div>
                                <div className="serve-grid mt-4">
                                    <span className="fa fa-stethoscope s5"></span>
                                    <p className="text-li mt-2">Health Loan </p>
                                </div>
                                <div className="serve-grid mt-4">
                                    <span className="fa fa-graduation-cap s6"></span>
                                    <p className="mt-2">Education Loan </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Home;