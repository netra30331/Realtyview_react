import { Fragment } from 'react';
import Avatar from '@/components/baseComponents/Avatar';
import { Transition, Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Typography from '@/components/baseComponents/Typography';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logOut, getUser } from '@/redux/user/userSlice';
import MyProfile from '@/assets/images/myprofile .svg'
import TeamInfo from '@/assets/images/companyinfo.svg'
import Credentials from '@/assets/images/credential_profile.svg'
//import Verify from '@/assets/images/verify.svg'
import LogOut from '@/assets/images/logout.svg'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const AccountPopover = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const goProfile = (id: string) => {
    navigate('/app/profile/' + id)
  }
  const logOutFunc = () => {
    dispatch(logOut()).then(() => {
      navigate('/')
    })
  }
  return (
    <>
      <div className="relative text-right z-20">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex gap-3 mt-2 ml-2 items-center">
              <div className="relative">
                <Avatar src={user.agent.avatarURL ?? ''} />
                <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-white absolute bottom-0 right-0"></span>
              </div>
              <div className='flex flex-col items-start'>
                <Typography variant='body' color="primary">{user.agent.firstName + ' ' + user.agent.lastName}</Typography>
                <Typography variant='medium-text' color='secondary'>Member {'#' + user.agent.memberID}</Typography>
              </div>
              <MdOutlineKeyboardArrowDown className="text-primary text-20 ml-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-0 py-0 ">
                <Menu.Item>
                  <div className='py-3 px-5 flex gap-3 items-center cursor-pointer group justify-between'>
                    <Typography variant='caption'>{user.agent.firstName + ' ' + user.agent.lastName}</Typography>
                    <Typography variant='caption'>{'#' + user.agent.memberID}</Typography>
                  </div>
                </Menu.Item>
              </div>
              <div className="px-0 py-0">

                <Menu.Item>
                  <div className='px-4 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => goProfile('info')} >
                    <img src={MyProfile} alt="MyProfile" className='pl-[2px]' />
                    <Typography variant='caption'>My Profile</Typography>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className='px-4 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' >
                    <img src={TeamInfo} alt="TeamInfo" />
                    <Typography variant='caption' onClick={() => goProfile('company')}>Company/Team Info</Typography>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className='px-4 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => goProfile('credentials')}>
                    <img src={Credentials} alt="Credentials" />
                    <Typography variant='caption'>Credentials</Typography>
                  </div>
                </Menu.Item>
                {/* <Menu.Item>
                  <div className='px-4 py-2 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => goProfile('verify')}>
                    <img src={Verify} alt="Verify" />
                    <Typography variant='caption'>Verify My License</Typography>
                  </div>
                </Menu.Item> */}
              </div>
              <div className="px-0 py-0">
                <Menu.Item>
                  <div className='px-4 py-3 flex gap-3 items-center cursor-pointer hover:bg-gray-300' onClick={() => logOutFunc()}>
                    <img src={LogOut} alt="LogOut" />
                    <Typography variant='caption'>Log Out</Typography>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};
export default AccountPopover;
