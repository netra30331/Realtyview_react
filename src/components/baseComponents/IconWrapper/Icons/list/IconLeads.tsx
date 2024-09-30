type Props = {
  width: number;
  height: number;
  stroke?: string;
  className?: string
};

const IconLeads = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path d="M7.75 9.18945C9.92462 9.18945 11.6875 7.42657 11.6875 5.25195C11.6875 3.07733 9.92462 1.31445 7.75 1.31445C5.57538 1.31445 3.8125 3.07733 3.8125 5.25195C3.8125 7.42657 5.57538 9.18945 7.75 9.18945Z" stroke={props.stroke?props.stroke.toString():'#3C3C3C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 12.5645H10C11.1935 12.5645 12.3381 13.0386 13.182 13.8825C14.0259 14.7264 14.5 15.871 14.5 17.0645V19.3145H1V17.0645C1 15.871 1.47411 14.7264 2.31802 13.8825C3.16193 13.0386 4.30653 12.5645 5.5 12.5645Z" stroke={props.stroke?props.stroke:'#3C3C3C'}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default IconLeads;
