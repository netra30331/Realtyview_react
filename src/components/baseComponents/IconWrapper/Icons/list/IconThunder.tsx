type Props = {
    width: number;
    height: number;
    stroke?: string;
    className?: string
  };
  
  const IconLeaf = (props: Props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 21"
        fill="none"
        {...props}
      >
        <path d="M13.5625 5.51758H9.25981L13.1289 0.628906C13.209 0.525391 13.1368 0.375 13.0059 0.375H5.51567C5.46098 0.375 5.40825 0.404297 5.3809 0.453125L0.320355 9.19336C0.259808 9.29688 0.334027 9.42773 0.455121 9.42773H3.86137L2.11528 16.4121C2.07817 16.5645 2.26176 16.6719 2.37504 16.5625L13.67 5.78516C13.7715 5.68945 13.7032 5.51758 13.5625 5.51758ZM4.38676 12.8066L5.5645 8.09961H2.49028L6.1934 1.70508H10.5801L6.51176 6.84766H10.6329L4.38676 12.8066Z" fill="#969696" stroke="white" strokeWidth="0.4"/>
      </svg>
    );
  };
  
  export default IconLeaf;
  
