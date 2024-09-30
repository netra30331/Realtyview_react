import { useAppSelector } from '@/redux/hooks'
import { getUser } from '@/redux/user/userSlice'
import UserSidebar from './UserSidebar'
import AdminSidebar from './AdminSidebar'
import Scrollbars from 'react-custom-scrollbars'
import { AUTH } from "@/shared/config/constants";

interface IProps {
  open: boolean;
  changeOpen: Function;
}
const Sidebar = (props: IProps) => {
  const user = useAppSelector(getUser);

  return (
    <div className="md:w-[60px] lg:w-[215px] border-r-1 border-[#E6E6E6] h-screen fixed bg-white">
      <Scrollbars autoHide className="min-h-screen">
        {user && user.userType === AUTH.ADMIN && (
          <AdminSidebar open={props.open} changeOpen={props.changeOpen} />
        )}
        {user && user.userType === AUTH.USER && (
          <UserSidebar open={props.open} changeOpen={props.changeOpen} />
        )}
      </Scrollbars>
    </div>
  );
};

export default Sidebar