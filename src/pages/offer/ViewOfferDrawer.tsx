import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
//import { IOffer } from '@/shared/interfaces/interfaces'
import Typography from "@/components/baseComponents/Typography"
import Button from "@/components/baseComponents/Button/Button"
import ViewDocumentModal from "./ViewDocumentModal";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Listing from "./viewOfferSubComponents/Listing"
import Buyers from "./viewOfferSubComponents/Buyers"
import Terms from './viewOfferSubComponents/Terms'
import Financing from './viewOfferSubComponents/Financing'
import Legal from './viewOfferSubComponents/Legal'
import { FormatFileSize, formatSlashDate, formatTime } from '@/shared/config/constants'
import { XMarkIcon } from '@heroicons/react/24/outline'

type IProps = {
    open: boolean
    changeViewDrawer: Function
    data?: any
}

const tabs = [
    { name: 'Overview' },
    { name: 'Listing' },
    { name: 'Buyers' },
    { name: 'Financing' },
    { name: 'Terms' },
    { name: 'Legal/Title' }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ViewOfferDrawer = (props: IProps) => {
  // const [viewValues, setViewValues] = React.useState<IOffer>(initialOffer)
  const [currentTab, setCurrentTab] = React.useState<string>("Overview");
  const [openDocModal, setOpenDocModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      const main_body = document.getElementById("view_offer_drawer");
      if (main_body) {
        main_body.scrollTop = 0;
      }
    }, 500);
  }, [props.open]);

  const closeViewDocModal = () => {
    setOpenDocModal(false);
    props.changeViewDrawer(true);
  };

  return (
    <>
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => props.changeViewDrawer(false)}
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
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-[650px]">
                    <div
                      className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl px-2"
                      id="view_offer_drawer"
                    >
                      {/* head bar */}
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between pr-6">
                          <div className="flex h-3 items-center">
                            <Typography
                              variant="h2"
                              className="mt-[12px] text-sm sm:text-[1rem]"
                            >
                              {props.data?.listing?.listingAddress}
                            </Typography>
                          </div>
                          <div className="flex h-3 items-center gap-x-5">
                            <Typography
                              variant="button2"
                              className="cursor-pointer text-[#6DA172]"
                              onClick={() => setOpenDocModal(true)}
                            >
                              View Document
                            </Typography>
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-[#C84156] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => props.changeViewDrawer(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-b mt-5"></div>
                      <div className="flex justify-center w-full mt-4">
                        <nav
                          className="-mb-px flex justify-center mx-10 w-full border-b"
                          aria-label="Tabs"
                        >
                          <div className="flex justify-between items-end w-full overflow-y-auto">
                            {tabs.map((tab) => (
                              <div
                                key={tab.name}
                                className={classNames(
                                  tab.name === currentTab
                                    ? "border-indigo-500 text-indigo-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer"
                                )}
                                aria-current={
                                  tab.name === currentTab ? "page" : undefined
                                }
                                onClick={() => setCurrentTab(tab.name)}
                              >
                                <Typography variant="h4">{tab.name}</Typography>
                              </div>
                            ))}
                          </div>
                        </nav>
                      </div>
                      <div className="px-4 sm:px-[2.5rem] pt-6">
                        {(currentTab === "Overview" ||
                          currentTab === "Listing") && (
                          <Listing data={props.data} />
                        )}
                        {(currentTab === "Overview" ||
                          currentTab === "Buyers") && (
                          <Buyers data={props.data} />
                        )}
                        {(currentTab === "Overview" ||
                          currentTab === "Terms") && (
                          <Terms data={props.data} />
                        )}
                        {(currentTab === "Overview" ||
                          currentTab === "Financing") && (
                          <Financing data={props.data} />
                        )}
                        {(currentTab === "Overview" ||
                          currentTab === "Legal/Title") && (
                          <Legal data={props.data} />
                        )}
                        {(currentTab === "Overview" ||
                          currentTab === "Docs") && (
                          <>
                            <Typography
                              variant="h3"
                              color="primary"
                              className="py-2"
                            >
                              Documents
                            </Typography>
                            {props.data?.documents?.map(
                              (document_item: any, index: number) => {
                                return (
                                  <div
                                    className="flex justify-between"
                                    key={index}
                                  >
                                    <div className="w-1/4 mr-2">
                                      <Typography
                                        variant="caption"
                                        className="text-[13px]"
                                      >
                                        {document_item.doc_type}
                                      </Typography>
                                    </div>
                                    <div className="w-1/4 mr-2">
                                      <Typography
                                        variant="body"
                                        className="break-all text-[13px] text-[#4C42D7]"
                                      >
                                        {document_item.file &&
                                          document_item.file.name}
                                      </Typography>
                                    </div>
                                    {document_item.file && (
                                      <div className="w-1/2">
                                        <Typography
                                          variant="body"
                                          className="text-[13px]"
                                        >
                                          {FormatFileSize(
                                            document_item.file.size
                                          )}{" "}
                                          | Uploaded on{" "}
                                          {formatSlashDate(
                                            document_item.upload_at
                                          ) +
                                            " " +
                                            formatTime(document_item.upload_at)}
                                        </Typography>
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                        {currentTab === "Overview" && (
                          <>
                            <div className="mt-6">
                              <div className="flex">
                                <input
                                  type="checkbox"
                                  className="mt-1 h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  value={"send_flag"}
                                  // checked={companyOnlyFlag===true}
                                  // onChange={(e) => {
                                  //     setCompanyOnlyFlag(e.target.checked);
                                  //     if (e.target.checked){
                                  //         setTeamOnlyFlag(false);
                                  //     }
                                  // }}
                                />
                                <Typography
                                  className="ml-3 mt-1"
                                  variant="body"
                                  color="secondary"
                                >
                                  Send to client for signature
                                </Typography>
                              </div>
                              <div className="w-full py-2">
                                <Typography
                                  variant="body"
                                  color="secondary"
                                  className="pb-2"
                                >
                                  If checked, the generated offer document will
                                  be sent to the Buyer Client for review and
                                  signatures before being submitted to the
                                  Listing Agent. Signed offers are of higher
                                  quality and have a greater chance of being
                                  selected.
                                </Typography>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Button
                                className="w-[200px] !text-[#4C42D7] !border-[#4C42D7]"
                                variant="outlined"
                              >
                                Send to Client
                              </Button>
                              <Button
                                className="w-[200px] ml-6"
                                onClick={() => props.changeViewDrawer(false)}
                              >
                                Respond to Offer
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ViewDocumentModal
        open={openDocModal}
        pdf_data={props.data?.documents}
        closeModal={() => closeViewDocModal()}
      />
    </>
  );
};

export default ViewOfferDrawer
