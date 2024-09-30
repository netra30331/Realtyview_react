import { Button } from '@/components/baseComponents/Button';
import Container from '@/components/baseComponents/Container';
import Icon from '@/components/baseComponents/IconWrapper';
import AccountPopover from '@/components/mainComponents/AccountPopover';
import LogoMain from '@/assets/images/logo_main.svg';
import React from 'react';
import NotificationDrawer from './Components/NotificationDrawer';

interface IProps {
  changeOpen: Function
}

const Header = (props: IProps) => {
  const [openNotificationModal, setOpenNotificaitonModal] = React.useState<boolean>(false);

  const changeSideBar = (value: boolean) => {
    props.changeOpen(value)
  }

  return (
    <>
      {(openNotificationModal) &&
        <div className='!bg-[#00000075] h-screen w-full fixed top-0 left-0 z-10'></div>
      }
      <header
        className="flex border-b-1 border-b-divider w-full h-[3.75rem] items-center bg-white"
      >
        <Container className="flex items-center">
          <div className="flex gap-3 items-center">
            <img src={LogoMain} alt="logoMain" className='w-[36px] h-[36px] block md:hidden' />
            <Button variant="icon" color="inherit" className="block md:hidden" onClick={() => changeSideBar(true)}>
              <Icon name="menu" />
            </Button>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className='flex relative'>
              <Button variant='icon' color='inherit' className='pt-[5px]' onClick={() => setOpenNotificaitonModal(true)}>
                <Icon name='alert' width={24} height={28} className='cursor-pointer' />
              </Button>
              <div className='absolute font-sans bg-[#C84156] text-[white] w-[10px] h-[10px] text-[8px] text-center rounded-[5px] right-[8px] top-[10px]'>3</div>
            </div>
            <div className="w-[2px] h-8 w-2 bg-gray-200"></div>
            <AccountPopover />
          </div>
        </Container>
      </header>
      
      <NotificationDrawer open={openNotificationModal} closeModal={() => setOpenNotificaitonModal(false)} />
    </>
  );
};

export default Header;
