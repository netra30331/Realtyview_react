type Props = {
  width: number;
  height: number;
  stroke?: string;
  className?: string
};

const IconNext = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path d="M18.78 8.70711C19.1705 8.31658 19.1705 7.68342 18.78 7.29289L12.416 0.928932C12.0255 0.538408 11.3923 0.538408 11.0018 0.928932C10.6113 1.31946 10.6113 1.95262 11.0018 2.34315L16.6587 8L11.0018 13.6569C10.6113 14.0474 10.6113 14.6805 11.0018 15.0711C11.3923 15.4616 12.0255 15.4616 12.416 15.0711L18.78 8.70711ZM0 9H18.0729V7H0L0 9Z" fill="#878A99"/>    </svg>
  );
};

export default IconNext;
