import React, { Fragment } from 'react'
import Logo from '@/assets/images/logo_black.svg'
import LogoMain from '@/assets/images/logo_main.svg'
import IconWrapper from '@/components/baseComponents/IconWrapper'
import Typography from '@/components/baseComponents/Typography'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

interface IProps {
    open: boolean
    changeOpen: Function
}

const AdminSidebar = (props: IProps) => {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = React.useState<string>('')
    const [showListingSubmenu, setShowListingSubmenu] = React.useState<boolean>(false);
    const [showAllUsersSubmenu, setShowAllUsersSubmenu] = React.useState<boolean>(false);
    const goPage = (page: string) => {
      setCurrentPage(page);
      navigate("/admin/" + page);
    };

    return (
      <>
        <div className="py-3 pt-1 pb-8 shrink-0 hidden lg:block">
          <img src={Logo} alt="logo" className="scale-[80%]" />
          <div className="mt-16">
            <div
              className={`${
                currentPage === ""
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("")}
            >
              <Typography variant="left-menu">Dashboard</Typography>
            </div>
            <div
              className={`${
                currentPage === "advertisements"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("advertisements")}
            >
              <Typography variant="left-menu">Advertisements</Typography>
            </div>
            <div
              className={`${
                currentPage === "posts"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("posts")}
            >
              <Typography variant="left-menu">Posts</Typography>
            </div>
            <div
              className={`${
                currentPage === "announcements"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("annoucements")}
            >
              <Typography variant="left-menu">Annoucements</Typography>
            </div>
            <div
              className={`${
                currentPage === "affiliates"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("affiliates")}
            >
              <Typography variant="left-menu">Affiliates</Typography>
            </div>
            <div
              className={`${
                currentPage === "teams"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("teams")}
            >
              <Typography variant="left-menu">Teams</Typography>
            </div>
            <div
              className={`${
                currentPage === "companies"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("companies")}
            >
              <Typography variant="left-menu">Companies</Typography>
            </div>
            <div
              className={`${
                currentPage.includes("users")
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex justify-between p-2 px-5 rounded-lg mb-3 cursor-pointer`}
              onClick={() => setShowAllUsersSubmenu(!showAllUsersSubmenu)}
            >
              <div className="flex items-center gap-3">
                <Typography variant="left-menu">All Users</Typography>
              </div>
              <MdOutlineKeyboardArrowDown className="text-[#7D8E9F80] mt-1" />
            </div>
            {showAllUsersSubmenu && (
              <div className="sub-menu-area ml-[2rem] pl-3 ml-1 border-l-2 border-[#E6E6E6]">
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "users/agents"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("users/agents")}
                >
                  Agents
                </Typography>
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "users/leads"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("users/leads")}
                >
                  Leads
                </Typography>
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "users/clients"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("users/clients")}
                >
                  Clients
                </Typography>
              </div>
            )}
            <div
              className={`${
                currentPage.includes("listings")
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex justify-between p-2 px-5 rounded-lg mb-3 cursor-pointer`}
              onClick={() => setShowListingSubmenu(!showListingSubmenu)}
            >
              <div className="flex items-center gap-3">
                <Typography variant="left-menu">Listings</Typography>
              </div>
              <MdOutlineKeyboardArrowDown className="text-[#7D8E9F80] mt-1" />
            </div>
            {showListingSubmenu && (
              <div className="sub-menu-area  ml-[2rem] pl-3 ml-1 border-l-2 border-[#E6E6E6]">
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "listings/schemas"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("listings/schemas")}
                >
                  Schemas
                </Typography>
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "listings/amenities"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("listings/amenities")}
                >
                  Amenities
                </Typography>
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "listings/keywords"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("listings/keywords")}
                >
                  Keywords
                </Typography>
                <Typography
                  variant="left-menu"
                  className={`${
                    currentPage === "listings/school-districts"
                      ? "text-[#294661]"
                      : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
                  } cursor-pointer select-none p-2`}
                  onClick={() => goPage("listings/school-districts")}
                >
                  School Districts
                </Typography>
              </div>
            )}
            <div
              className={`${
                currentPage === "local-associations"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("local-associations")}
            >
              <Typography variant="left-menu">Local Associations</Typography>
            </div>
            <div
              className={`${
                currentPage === "state-associations"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("state-associations")}
            >
              <Typography variant="left-menu">State Associations</Typography>
            </div>
            <div
              className={`${
                currentPage === "mls-associations"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("mls-associations")}
            >
              <Typography variant="left-menu">MLS Associations</Typography>
            </div>
            <div
              className={`${
                currentPage === "us-states"
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex items-center gap-3 p-2 px-5 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("us-states")}
            >
              <Typography variant="left-menu">US States</Typography>
            </div>
          </div>
        </div>
        <div className="w-[60px] py-3 shrink-0 bg-[#F5F5F5] hidden md:flex lg:hidden justify-center">
          <div>
            <img
              src={LogoMain}
              alt="logoMain"
              className="w-[36px] h-[36px] mb-16"
            />
            <div
              className={`${
                currentPage === ""
                  ? "text-[#294661]"
                  : "text-[#7D8E9F] hover:text-[#294661] hover:stroke-[#294661]"
              } flex justify-center items-center p-1 rounded-lg cursor-pointer mb-3`}
              onClick={() => goPage("")}
            >
              <IconWrapper
                name="home"
                stroke={currentPage === "" ? "#294661" : "#7D8E9F"}
              />
            </div>
          </div>
        </div>
        {props.open && (
          <div className="bg-[#00000040] h-screen w-full fixed top-0 left-0 z-10"></div>
        )}
        <Transition.Root show={props.open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10 bg-[#FF0000]"
            onClose={() => props.changeOpen(false)}
          >
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 sm:pr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-300"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-300"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-[250px]">
                      <div className="flex h-full flex-col  bg-white py-6 shadow-xl">
                        <img src={Logo} alt="logo" className="scale-[80%]" />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
}

export default AdminSidebar