import Header from '../Header';
import './index.css';

const NotFound = () => {

    return (
        <>
        <Header />
        <div className="welcome py-1">
            <div className="container py-xl-1 py-lg-1" id="services">
                <div className="row">
                    <div className="col-lg-5 welcome-left">
                        <h3 className="title-w3ls mt-2 mb-3">Page Not Found</h3>

                        <p className="mt-4 pr-lg-5">
                            The page you were looking for was not found. Please try again with a different request.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default NotFound;