type Props = {
  width: number;
  height: number;
  stroke?: string;
  className?: string
};

const IconShowings = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path d="M1.5 18.3145C1.1 18.3145 0.75 18.1795 0.45 17.9095C0.15 17.6395 0 17.3245 0 16.9645V3.01445C0 2.65445 0.15 2.33945 0.45 2.06945C0.75 1.79945 1.1 1.66445 1.5 1.66445H3.125V0.314453H4.75V1.66445H13.25V0.314453H14.875V1.66445H16.5C16.9 1.66445 17.25 1.79945 17.55 2.06945C17.85 2.33945 18 2.65445 18 3.01445V16.9645C18 17.3245 17.85 17.6395 17.55 17.9095C17.25 18.1795 16.9 18.3145 16.5 18.3145H1.5ZM1.5 16.9645H16.5V7.28945H1.5V16.9645ZM1.5 5.93945H16.5V3.01445H1.5V5.93945Z" strokeWidth={0} fill={props.stroke ? props.stroke : "#3C3C3C"} />    </svg>
  );
};

export default IconShowings;
