import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DotsVertical from '@/assets/icons/dot_vertical.png'
import Star from '@/assets/icons/star.png'
import XMark from '@/assets/icons/XMark.png'
import Typography from "@/components/baseComponents/Typography"
import Button from "@/components/baseComponents/Button/Button"
import { Slide } from 'react-slideshow-image'
import IconWrapper from '@/components/baseComponents/IconWrapper'
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import ListingDrawerFooter from '../myListings/common/ListingDrawerFooter'
import { formatSlashDate, getDay, getTime} from '@/shared/config/constants'

type IProps = {
    open: boolean
    changeState: Function
    updateStatus: Function
    onRescheduleShowing: Function
    data?: any
}

const STATUSBG: any = {
    'Active': 'confirm-btn',
    'Pending': 'reschedule-btn',
    'Denied': 'deny-btn',
};

const STATUSSTRING: any = {
    'Active': 'Showing Confirmed',
    'Pending': 'Showing is Pending',
    'Denied': 'Showing Denied',
};

const View = (props: IProps) => {

    return (
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => props.changeState(false)}
        >
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-[600px]">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      {/* head bar */}
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between pr-6">
                          <div className="flex h-3 items-center">
                            <h5 className="text-blue-700 font-bold text-sm sm:text-[1rem] ">
                              {props.data?.listing?.listingAddress ||
                                "View Showing"}
                            </h5>
                          </div>
                          <div className="flex h-3 items-center gap-x-5">
                            <img src={Star} alt="Star" />
                            <img src={DotsVertical} alt="DotsVertical" />
                            <img
                              src={XMark}
                              alt="XMark"
                              onClick={() => props.changeState(false)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="border-b mt-5"></div>

                      <div className="px-8 mt-[30px]">
                        <Slide
                          autoplay={false}
                          slidesToShow={3}
                          slidesToScroll={1}
                          transitionDuration={500}
                          prevArrow={
                            <Button className="bg-transparent hover:bg-transparent">
                              <IconWrapper
                                className="bg-white bg-opacity-40 hover:bg-opacity-90 rounded-full p-1"
                                name="arrow-backward"
                                width={24}
                                height={23}
                              />
                            </Button>
                          }
                          nextArrow={
                            <Button className="bg-transparent hover:bg-transparent">
                              <IconWrapper
                                className="bg-white bg-opacity-40 hover:bg-opacity-90 rounded-full p-1"
                                name="arrow-forward"
                                width={24}
                                height={23}
                              />
                            </Button>
                          }
                        >
                          {props.data?.listing?.propertyPhotos &&
                          props.data?.listing?.propertyPhotos.length > 0
                            ? [...props.data?.listing?.propertyPhotos]
                                .sort((a, b) => a.order - b.order)
                                .map((propertyPhoto, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center h-full mx-1"
                                  >
                                    <img
                                      key={index}
                                      src={
                                        propertyPhoto.isFile
                                          ? URL.createObjectURL(
                                              propertyPhoto.file
                                            )
                                          : propertyPhoto.file
                                      }
                                      className="rounded-md aspect-auto"
                                    />
                                  </div>
                                ))
                            : [...Array(3)].map((placeholder) => (
                                <div
                                  key={placeholder}
                                  className="flex items-center h-[200px] w-[160px]"
                                >
                                  <img
                                    key={placeholder}
                                    src={ListingImagePlaceholder}
                                    className="rounded-md aspect-auto"
                                  />
                                </div>
                              ))}
                        </Slide>

                        <div className="w-full text-right pr-2 mt-[25px]">
                          <Button
                            variant="text"
                            size="medium"
                            className={`${STATUSBG[props.data?.status]} mr-0`}
                          >
                            <Typography variant="button2">
                              {STATUSSTRING[props.data?.status]}
                            </Typography>
                          </Button>
                        </div>
                      </div>
                      <div className="mt-[50px] px-9">
                        <Typography
                          variant="h3"
                          color="primary"
                          className="mb-5"
                        >
                          Address
                        </Typography>
                        <div className="grid grid-cols-3 gap-16">
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Address 1
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.listingAddress ||
                                    "None"}
                                </Typography>
                              </div>
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Neighborhood
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.listingNeigborhood ||
                                    "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Address 2
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.listingAddress ||
                                    "None"}
                                </Typography>
                              </div>
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  State
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.listingAddress ||
                                    "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  City
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.listingAddress ||
                                    "None"}
                                </Typography>
                              </div>
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Zip Code
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.listingAddress ||
                                    "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[50px] px-9">
                        <Typography
                          variant="h3"
                          color="primary"
                          className="mb-5"
                        >
                          Showing Details
                        </Typography>
                        <div className="grid grid-cols-3 gap-16">
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Day
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {getDay(props.data?.dateTime) || "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Date
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {formatSlashDate(props.data?.dateTime) ||
                                    "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Time
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {getTime(props.data?.dateTime) || "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[25px] px-9">
                        <div className="grid grid-cols-3 gap-[10px]">
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <Button
                                variant="text"
                                size="medium"
                                className="deny-btn"
                                onClick={() => props.updateStatus("Denied")}
                              >
                                <Typography variant="button2">
                                  Deny|Cancel
                                </Typography>
                              </Button>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <Button
                                variant="text"
                                size="medium"
                                className="reschedule-btn"
                                onClick={() =>
                                  props.onRescheduleShowing(props.data)
                                }
                              >
                                <Typography variant="button2">
                                  Reschedule
                                </Typography>
                              </Button>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <Button
                                variant="text"
                                size="medium"
                                className="confirm-btn"
                                onClick={() => props.updateStatus("Confirmed")}
                              >
                                <Typography variant="button2">
                                  Confirm
                                </Typography>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[25px] px-9 text-justify">
                        <div className="flex flex-col gap-1 mt-[25px]">
                          <Typography variant="caption" color="secondary">
                            Showing Instructions
                          </Typography>
                          <Typography variant="body" color="primary">
                            {props.data?.listing?.showingInstuction || "None"}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-1 mt-[25px]">
                          <Typography variant="caption" color="secondary">
                            Showing Remarks
                          </Typography>
                          <Typography variant="body" color="primary">
                            {props.data?.listing?.showingRemarks || "None"}
                          </Typography>
                        </div>
                      </div>
                      <div className="mt-[25px] px-9">
                        <div className="grid grid-cols-3 gap-16">
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Lockbox or Keypad
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing
                                    ?.showingLockboxOrKeypad || "None"}
                                </Typography>
                              </div>
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Occupancy Status
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing
                                    ?.listingOccupancyStatus || "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-1">
                                <Typography variant="caption" color="secondary">
                                  Access Code
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing?.showingAccessCode ||
                                    "None"}
                                </Typography>
                              </div>
                              <div className="flex flex-col gap-1">
                                <Typography
                                  variant="caption"
                                  color="secondary"
                                  className="whitespace-nowrap"
                                >
                                  Require Agency Disclosure
                                </Typography>
                                <Typography variant="body" color="primary">
                                  {props.data?.listing
                                    ?.showingRequireAgencyDisclosure || "None"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ListingDrawerFooter />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
}

export default View
