import { RotatingLines } from 'react-loader-spinner';

const Spinner = () => {
    return (
      <div style={{ height: '95vh' }}>
        <div
          style={{display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60%' }}
        >
          <RotatingLines
                strokeColor="#4fa94d"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
      </div>
    );
  };
  
  export default Spinner;