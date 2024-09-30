type Props = {
  width: number;
  height: number;
  stroke?: string;
  className?: string;
};

const IconHome = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path d="M1 8.99878H19M13 8.99878V19.9988" stroke={props.stroke?props.stroke:"#4C42D7"} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 1.99878H2C1.44772 1.99878 1 2.44649 1 2.99878V18.9988C1 19.5511 1.44772 19.9988 2 19.9988H18C18.5523 19.9988 19 19.5511 19 18.9988V2.99878C19 2.44649 18.5523 1.99878 18 1.99878Z" stroke={props.stroke?props.stroke:"#191E3B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default IconHome;
