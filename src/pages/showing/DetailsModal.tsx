import Typography from '@/components/baseComponents/Typography'
import { Dialog, Transition } from '@headlessui/react'
import { getUser } from "@/redux/user/userSlice"
import { Fragment } from 'react'
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import IconWrapper from '@/components/baseComponents/IconWrapper';
import { useAppSelector } from '@/redux/hooks';
import AddCompany from '@/assets/images/add_company.svg'
import AddProfile from '@/assets/images/add_profile.svg'
import { Button } from '@/components/baseComponents/Button'

interface IProps {
    open: boolean
    closeModal: Function
    updateStatus: Function
    onRescheduleShowing: Function
    data?: any
}

const DetailsModal = (props: IProps) => {

    const user = useAppSelector(getUser)

    return (
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => props.closeModal()}
        >
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-700"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-700"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="rounded-lg max-w-[512px] w-full bg-white p-5">
                <Typography variant="h4" color="primary" className="flex gap-5">
                  <IconWrapper name="check-list" /> Showing Details
                </Typography>
                <div className="flex flex-col gap-8 mt-10">
                  <div className="grid grid-cols-5 items-center gap-5">
                    <img
                      src={
                        (props.data?.listing?.propertyPhotos &&
                          props.data?.listing?.propertyPhotos[0]?.file) ||
                        ListingImagePlaceholder
                      }
                      className="aspect-square rounded-md"
                    />
                    <div className="col-span-4">
                      <Typography variant="h4">
                        {props.data?.listing?.listingAddress}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex">
                    <Typography
                      variant="body"
                      color="primary"
                      className="flex gap-5 items-center"
                    >
                      <IconWrapper name="check-plus-circle" /> Update the Next
                      Task Due to
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Typography variant="body" color="secondary">
                      The status of this listing is
                    </Typography>
                    <Typography
                      variant="medium-text"
                      color="secondary"
                      className={`uppercase font-bold ${
                        props.data?.listing?.status === "Active"
                          ? `!text-[#6DA172]`
                          : `!text-[#B32F43]`
                      }`}
                    >
                      {props.data?.listing?.status}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-10">
                    <div className="grid grid-cols-5 gap-5 items-center">
                      <div className="col-span-1">
                        <img
                          className="w-[145px] rounded-md"
                          src={user.agent.company?.businessLogo || AddCompany}
                        />
                      </div>
                      <div className="col-span-4 flex flex-col">
                        <Typography
                          variant="h4"
                          color="primary"
                          className="truncate"
                        >
                          {user.agent.company?.businessName || "Company Name"}
                        </Typography>
                        <div className="flex items-center gap-2">
                          <IconWrapper name="telephone" width={13} />
                          <Typography
                            variant="medium-text"
                            color="secondary"
                            className="flex items-center gap-2"
                          >
                            {user.agent.company?.principalBrokerPhone ||
                              "000-000-0000"}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconWrapper name="envelope" width={13} />
                          <Typography
                            variant="medium-text"
                            color="secondary"
                            className="flex items-center gap-2"
                          >
                            {user.agent.company?.principalBrokerEmail ||
                              "info@companyname.com"}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5 items-center">
                      <div className="col-span-1">
                        <img
                          className="w-[145px] rounded-md"
                          src={user.agent.avatarURL || AddProfile}
                        />
                      </div>
                      <div className="col-span-4 flex flex-col">
                        <Typography variant="h4" color="primary">
                          {user.agent.firstName + " " + user.agent.lastName}
                        </Typography>
                        <div className="flex items-center gap-2">
                          <IconWrapper name="telephone" width={13} />
                          <Typography
                            variant="medium-text"
                            color="secondary"
                            className="flex items-center gap-2"
                          >
                            {user.agent.mobileNumber || "000-000-0000"}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconWrapper name="envelope" width={13} />
                          <Typography
                            variant="medium-text"
                            color="secondary"
                            className="flex items-center gap-2"
                          >
                            {user.agent.contactEmail || "user@companyname.com"}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      color="danger"
                      onClick={() => props.updateStatus("Denied")}
                    >
                      <Typography variant="button1">Deny</Typography>
                    </Button>
                    <Button
                      color="warning"
                      onClick={() => props.onRescheduleShowing(props.data)}
                    >
                      <Typography variant="button1">Reschedule</Typography>
                    </Button>
                    <Button
                      color="success"
                      onClick={() => props.updateStatus("Confirmed")}
                    >
                      <Typography variant="button1">Confirm</Typography>
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
}
export default DetailsModal;