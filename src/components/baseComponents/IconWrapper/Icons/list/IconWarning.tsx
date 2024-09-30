type Props = {
    width: number;
    height: number;
    stroke?: string;
    className?: string
  };
  
  const IconWarning = (props: Props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 21"
        fill="none"
        {...props}
      >
        <path d="M4.68715 18.7569C4.80545 18.8087 4.92865 18.8339 5.05045 18.8339C5.26955 18.8339 5.48375 18.752 5.65455 18.5938L8.79825 15.2996H13.1852C14.9079 15.2996 16.31 13.8982 16.31 12.1748V3.29039C16.31 1.56839 14.9086 0.166992 13.1852 0.166992H3.81425C2.09155 0.166992 0.689453 1.56839 0.689453 3.29039V12.1748C0.689453 13.8975 2.09085 15.2996 3.81425 15.2996H4.15025V17.9351C4.15025 18.2963 4.35605 18.6113 4.68715 18.7562V18.7569ZM3.81425 14.4148C2.57945 14.4148 1.57495 13.4103 1.57495 12.1755V3.29109C1.57495 2.05699 2.57945 1.05319 3.81425 1.05319H13.1859C14.4207 1.05319 15.4252 2.05699 15.4252 3.29109V12.1755C15.4252 13.4103 14.4207 14.4148 13.1859 14.4148H8.41955L5.04905 17.9477C5.04485 17.9477 5.03785 17.9442 5.03575 17.9358V14.4148H3.81425Z" fill="#969696"/>
        <path d="M9.31578 9.38184H8.22168V10.8119H9.31578V9.38184Z" fill="#969696"/>
        <path d="M9.23778 8.54565L9.37498 5.49085V4.36035H8.18848V5.48455L8.33268 8.54565H9.23778Z" fill="#969696"/>
      </svg>
    );
  };
  
  export default IconWarning;
  