
// import classNames from 'classnames';
interface ToggleProps {
    value : boolean
    onChange: () => void;
}


const ToggleButton = ({
    value = false,
    onChange,
    // className,
}:ToggleProps) => {

  return (
    <div 
        onClick={onChange}
        className={`md:w-12 md:h-6 w-12 h-6 flex border-[3px] border-gray-200 items-center ${value===true?"bg-[#727CF5]":"bg-gray-300"} rounded-full p-1 cursor-pointer`}
    >
        <div className={`${value===false?"bg-[#727CF5]":"bg-white"} md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transition transform ${value===true? "transform translate-x-4":""}`}></div>

    </div>
  )};

export default ToggleButton;
