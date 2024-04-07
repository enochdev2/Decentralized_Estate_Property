import { Link } from 'react-router-dom';
// import { ConnectBtn } from './'

const ButtonGroup = () => {
  return (
    <div
      className="md:flex hidden items-center justify-center 
       overflow-hidden gap-3  cursor-pointer mr-20"
    >
      {/* <div className="inline-flex" role="group"> */}
      <Link to="/">
        <button
          className="
       h-auto min-w-[74px] text-body-medium rounded-lg text-[12px] text-light-1 
          "
        >
          Home
        </button>
      </Link>

      <Link to="/add">
        <button
          type="button"
          className="
            h-auto min-w-[74px] text-body-medium rounded-lg text-[12px] text-light-1 
            "
        >
          Add
        </button>
      </Link>
      <Link to="/about">
        <button
          className="
           h-auto min-w-[74px] text-body-medium rounded-lg text-[12px] text-white 
          "
        >
          <p className="flex items-center">About</p>
        </button>
      </Link>

      <button
        className="
           h-auto min-w-[74px] text-body-medium rounded-lg text-[12px] text-white 
          "
      >
        <p className="flex items-center">Help</p>
      </button>
    </div>
    // </div>
  );
};

export default ButtonGroup;
