type Props = {
    width: number;
    height: number;
    stroke?: string;
    className?: string
};

const IconPlus = (props: Props) => {
    return (
        <svg
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M9 3V15M3 9H15" stroke="#182952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default IconPlus;
