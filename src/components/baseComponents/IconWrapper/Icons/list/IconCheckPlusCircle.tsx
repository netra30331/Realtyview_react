type Props = {
    width: number;
    height: number;
    stroke?: string;
    className?: string
};

const IconCheckPlusCircle = (props: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none" {...props}>
            <path d="M17.2727 2.862L7.41864 13.14L3.75682 9.324L4.97455 8.055L7.41864 10.602L16.055 1.602L17.2727 2.862ZM8.63636 16.2C4.82773 16.2 1.72727 12.969 1.72727 9C1.72727 5.031 4.82773 1.8 8.63636 1.8C9.99227 1.8 11.2618 2.214 12.3327 2.925L13.585 1.62C12.1332 0.565392 10.4061 -1.44541e-05 8.63636 2.77135e-10C3.86909 2.77134e-10 0 4.032 0 9C0 13.968 3.86909 18 8.63636 18C10.1305 18 11.5382 17.604 12.7645 16.902L11.4691 15.552C10.6055 15.966 9.64682 16.2 8.63636 16.2ZM14.6818 11.7H12.0909V13.5H14.6818V16.2H16.4091V13.5H19V11.7H16.4091V9H14.6818V11.7Z" fill="black" />
        </svg>
    );
};

export default IconCheckPlusCircle;
