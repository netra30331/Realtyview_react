type Props = {
  width: number;
  height: number;
  stroke?: string;
  className?: string
};

const IconArrowForward = (props: Props) => {
  return (
    <svg
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 11L6 6L1 1"
        stroke="#3C3C3C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrowForward;
