type Props = {
  width: number;
  height: number;
  stroke?: string;
  className?: string
};

const IconSearch = (props: Props) => {
  return (
    <svg
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 12L10.3333 9.55556M10.3333 5.27778C10.3333 7.64033 8.244 9.55556 5.66667 9.55556C3.08934 9.55556 1 7.64033 1 5.27778C1 2.91523 3.08934 1 5.66667 1C8.244 1 10.3333 2.91523 10.3333 5.27778Z"
        stroke={props.stroke?props.stroke:"#8E9CB2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSearch;
