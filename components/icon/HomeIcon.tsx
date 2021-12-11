interface IProps {
  color: string;
}

const HomeIcon = ({ color }: IProps) => (
  <svg
    className="active:fill-blue-sub"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z" />
  </svg>
);
export default HomeIcon;
