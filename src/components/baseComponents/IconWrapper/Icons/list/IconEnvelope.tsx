type Props = {
    width: number;
    height: number;
    stroke?: string;
    className?: string
};

const IconEnvelope = (props: Props) => {
    return (
        <svg
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M10.2762 1.73214L5.93134 5.13125C5.84181 5.19384 5.73291 5.22768 5.62099 5.22768C5.50908 5.22768 5.40018 5.19384 5.31065 5.13125L0.96582 1.73214M10.2762 1.73214C10.2762 1.46586 10.0446 1.25 9.75892 1.25H1.48306C1.1974 1.25 0.96582 1.46586 0.96582 1.73214M10.2762 1.73214V7.51786C10.2762 7.78414 10.0446 8 9.75892 8H1.48306C1.1974 8 0.96582 7.78414 0.96582 7.51786V1.73214" stroke="#4C42D7" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default IconEnvelope;
