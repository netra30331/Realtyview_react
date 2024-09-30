import Typography from '@/components/baseComponents/Typography'
import { Button } from '@/components/baseComponents/Button';
import {Dialog, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { IDocumentObject } from "@/shared/interfaces/interfaces";
import XMark from "@/assets/icons/XMark.png";

interface IProps {
  open: boolean;
  closeModal: Function;
  pdf_data: Array<IDocumentObject>;
}

const ViewDocumentModal = (props: IProps) => {
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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
            <Dialog.Panel className="w-full h-full bg-black lg:flex overflow-y-auto">
              <div className="fixed right-10 top-10 cursor-pointer">
                <img
                  src={XMark}
                  alt="XMark"
                  onClick={() => props.closeModal()}
                />
              </div>
              <div className="lg:flex items-center justify-center w-full h-full">
                <div className="lg:w-[800px] w-full h-[94%]">
                  {props.pdf_data &&
                    props.pdf_data.length > 0 &&
                    props.pdf_data.map((item: any, index: number) => {
                      if (item.view_pdf_data) {
                        return (
                          <iframe
                            key={index}
                            title="PDF Viewer"
                            src={item.view_pdf_data}
                            width="100%"
                            height="100%"
                            className="mb-8"
                          />
                        );
                      } else if (item.file && !item.isFile) {
                        return (
                          <iframe
                            key={index}
                            title="PDF Viewer"
                            src={item.file}
                            width="100%"
                            height="100%"
                            className="mb-8"
                          />
                        );
                      }
                    })}
                  ;
                </div>
                <div className="w-[250px] text-left lg:ml-10 ml-[25%] mt-8">
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                      color="white"
                    >
                      Send to client for signature
                    </Typography>
                  </div>
                  <div className="w-full py-2">
                    <Typography
                      variant="body"
                      color="white"
                      className="pb-2 leading-[25px]"
                    >
                      If checked, the generated offer document will be sent to
                      the Buyer Client for review and signatures before being
                      submitted to the Listing Agent. Signed offers are of
                      higher quality and have a greater chance of being
                      selected.
                    </Typography>
                  </div>
                  <div className="w-full mt-4">
                    <Button
                      variant="outlined"
                      onClick={() => props.closeModal()}
                      className="w-[200px] bg-white !text-[#4C42D7] !border-[#4C42D7]"
                    >
                      Revise Offer
                    </Button>
                  </div>
                  <div className="w-full mt-4">
                    <Button
                      className="w-[200px]"
                      onClick={() => props.closeModal()}
                    >
                      Send Offer
                    </Button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ViewDocumentModal;