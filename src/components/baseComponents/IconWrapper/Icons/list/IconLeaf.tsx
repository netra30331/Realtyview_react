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
        <path d="M2.51685 9.80016C3.21965 10.3623 4.08485 10.6437 5.10265 10.6437C5.76555 10.6437 6.49355 10.5233 7.28315 10.2846L8.95265 11.6636V15.7075C8.95265 15.9518 9.15075 16.1506 9.39575 16.1506C9.64075 16.1506 9.83885 15.9525 9.83885 15.7075V11.6174L11.5686 9.57967C12.3147 9.98147 13.0539 10.1852 13.7721 10.1852C13.8043 10.1852 13.8372 10.1852 13.8694 10.1838C15.2155 10.1495 16.3957 9.40397 17.3771 7.96827C19.4974 4.86727 19.3427 0.685466 19.335 0.509066L19.3161 0.0722656L18.8794 0.0855658C18.6259 0.0932658 12.65 0.307465 10.6137 3.32167C9.51195 4.95197 9.70305 6.49127 10.0572 7.49577C10.3029 8.19227 10.6557 8.72567 10.8804 9.02176L9.34045 10.8362L7.91245 9.65667C7.97335 9.44457 8.19105 8.60247 8.13645 7.61897C8.05035 6.07897 7.34335 4.94217 6.09105 4.33107C3.31765 2.97867 1.09515 3.21177 1.00205 3.22227L0.646449 3.26287L0.611449 3.61847C0.593949 3.79487 0.209649 7.95636 2.51615 9.80016H2.51685ZM11.3473 3.81727C12.8334 1.61787 17.0544 1.10897 18.4509 0.999066C18.4285 2.13377 18.2143 5.17457 16.6456 7.46847C15.4129 9.27097 13.9135 9.75047 12.1817 8.90067L16.6477 3.82287C16.8095 3.63947 16.7912 3.35947 16.6078 3.19777C16.4244 3.03607 16.1444 3.05427 15.9827 3.23767L11.4873 8.34977C10.9812 7.62387 10.0124 5.79267 11.3473 3.81657V3.81727ZM1.47175 4.08817C1.47525 4.08817 1.47875 4.08817 1.48225 4.08817C2.19205 4.08817 3.81535 4.20647 5.70325 5.12697C6.65735 5.59247 7.17815 6.43947 7.25165 7.64487C7.28455 8.18667 7.21735 8.68787 7.15225 9.02247L3.89025 6.13777C3.70685 5.97607 3.42755 5.99287 3.26515 6.17627C3.10345 6.35967 3.12025 6.63897 3.30365 6.80137L6.45785 9.59087C5.02285 9.92127 3.88605 9.76167 3.07125 9.11137C1.50255 7.85907 1.43815 5.10177 1.47175 4.08957V4.08817Z" fill="#969696"/>
      </svg>
    );
  };
  
  export default IconLeaf;
  