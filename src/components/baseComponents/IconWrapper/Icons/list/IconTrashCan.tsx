type Props = {
    width: number;
    height: number;
    stroke?: string;
    className?: string
};

const IconTrashCan = (props: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <path d="M2 4.375H14M6.5 6.25V11.25M9.5 6.25V11.25M6.5 1.875H9.5C9.69891 1.875 9.88968 1.94085 10.0303 2.05806C10.171 2.17527 10.25 2.33424 10.25 2.5V4.375H5.75V2.5C5.75 2.33424 5.82902 2.17527 5.96967 2.05806C6.11032 1.94085 6.30109 1.875 6.5 1.875ZM3.5 4.375H12.5V12.5C12.5 12.6658 12.421 12.8247 12.2803 12.9419C12.1397 13.0592 11.9489 13.125 11.75 13.125H4.25C4.05109 13.125 3.86032 13.0592 3.71967 12.9419C3.57902 12.8247 3.5 12.6658 3.5 12.5V4.375Z" stroke="#182952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default IconTrashCan;
