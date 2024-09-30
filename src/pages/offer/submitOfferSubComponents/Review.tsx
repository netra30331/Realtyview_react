import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import Slider from 'react-slick';
import { IOffer, IMyListing } from '@/shared/interfaces/interfaces'
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import {FormatFileSize, formatSlashDate, formatTime} from '@/shared/config/constants'
import Button from "@/components/baseComponents/Button/Button"

type IProps = {
    selectedlisting?: IMyListing
    setOpenDocModal:Function
    sendOffer:Function
    values:IOffer
}

const Review = (props: IProps) => {
    const CustomArrow: React.FC<any> = (props) => {
        const { onClick, direction } = props;
        return (
            <div className={`custom-arrow ${direction}`} onClick={onClick}>
                {direction === "left" ? "<" : ">"}
            </div>
        );
    }

    const slider_settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        prevArrow: <CustomArrow direction="left"/>,
        nextArrow: <CustomArrow direction="right"/>
    };

    return (
      <div>
        {props.selectedlisting && (
          <>
            <Slider {...slider_settings}>
              {props.selectedlisting?.propertyPhotos &&
                props.selectedlisting?.propertyPhotos.map(
                  (item: any, image_index: number) => {
                    return (
                      <div key={image_index} className="px-2 w-1/3]">
                        <img
                          className="w-full"
                          src={item.file || ListingImagePlaceholder}
                        />
                      </div>
                    );
                  }
                )}
            </Slider>

            <Typography variant="h3" color="primary" className="py-2 mt-6">
              Address
            </Typography>
            <div className="flex w-full ">
              <div className="w-1/3 sm:w-full gap-y-4">
                <Typography
                  variant="caption"
                  color="secondary"
                  className="py-2"
                >
                  Address 1
                </Typography>
                <Typography variant="body" color="primary" className="pb-2">
                  {props.selectedlisting.listingAddress}
                </Typography>
              </div>
              {/* <div className='w-1/3 sm:w-full gap-y-4'>
                    <Typography variant='caption' color='secondary' className='py-2'>Address 2</Typography>
                    <Typography variant='body' color='primary' className='pb-2'>{props.selectedlisting.address2}</Typography>
                </div>
                <div className='w-1/3 sm:w-full gap-y-4'>
                    <Typography variant='caption' color='secondary' className='py-2'>City</Typography>
                    <Typography variant='body' color='primary' className='pb-2'>{props.selectedlisting.city}</Typography>
                </div> */}
            </div>
            <div className="flex w-full ">
              <div className="w-1/3 sm:w-full gap-y-4">
                <Typography
                  variant="caption"
                  color="secondary"
                  className="py-2"
                >
                  Neighborhood
                </Typography>
                <Typography variant="body" color="primary" className="pb-2">
                  {props.selectedlisting.listingNeigborhood}
                </Typography>
              </div>
              <div className="w-1/3 sm:w-full gap-y-4">
                <Typography
                  variant="caption"
                  color="secondary"
                  className="py-2"
                >
                  Unit
                </Typography>
                <Typography variant="body" color="primary" className="pb-2">
                  {props.selectedlisting.listingUnit}
                </Typography>
              </div>
              {/* <div className='w-1/3 sm:w-full gap-y-4'>
                    <Typography variant='caption' color='secondary' className='py-2'>Zip Code</Typography>
                    <Typography variant='body' color='primary' className='pb-2'>{props.selectedlisting.zip_code}</Typography>
                </div> */}
            </div>
          </>
        )}

        <Typography variant="h3" color="primary" className="py-2">
          Primary Buyer Details
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerCompanyName}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerPhoneNumber}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Current Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerCurrentAddress}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mailing Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.primaryBuyerMailingAddress}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Secondary Buyer Details
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.secondaryBuyerFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.secondaryBuyerLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.secondaryBuyerPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.secondaryBuyerEmailAddress}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Terms and Conditions
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Offer Amount
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.offerAmount}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Earnest Money Deposit
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.earnestMoneyDeposit}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Downpayment Inc. EMD
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.downPayment}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Subject to Mortgage
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.subjectToMortgage}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Seller Concession
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerConcession}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Cash on Closing
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.cashOnClosing}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Proposed Closing Location
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.proposedClosingLocation}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Proposed Closing Date
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {formatSlashDate(props.values.proposedClosingDate)}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Personal Property Inclusions
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.personalPropertyInclusions}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Personal Property Exclusions
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.personalPropertyExclusions}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Note
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.noteToListingAgent}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Mortgage
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Held By
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.mortgageHeldBy}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Type
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.mortgageType}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              City
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {""}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Period
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.mortgagePeriod}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Payment Due Date
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {formatSlashDate(props.values.paymentDate)}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Interest Rate
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.interestRate}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Monthly Payment
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.monthlyPayment}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Proposed Closing Date
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {formatSlashDate(props.values.mortgageProposedClosingDate)}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Interest Rate
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.interestRate}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Due (days from formal contract)
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.mortgageDays}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Loan Offer
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.loanFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.loanLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.loanPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.loanEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.loanCompany}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.loanCompanyAddress}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Buyer’s Attorney
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.buyeraAttorneyFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.buyerAttorneyLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.buyerAttorneyPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.buyerAttorneyEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.buyerAttorneyCompany}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.buyerAttorneyAddress}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Seller’s Attorney
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerAttorneyFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerAttorneyLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerAttorneyPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerAttorneyEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerAttorneyCompany}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.values.sellerAttorneyAddress}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Documents
        </Typography>
        {props.values.documents.map((document_item: any, index: number) => {
          return (
            <div className="flex justify-between" key={index}>
              <div className="w-1/4 mr-2">
                <Typography variant="caption" className="text-[13px]">
                  {document_item.doc_type}
                </Typography>
              </div>
              <div className="w-1/4 mr-2">
                <Typography
                  variant="body"
                  className="break-all text-[13px] text-[#4C42D7]"
                >
                  {document_item.file && document_item.file.name}
                </Typography>
              </div>
              {document_item.file && (
                <div className="w-1/2">
                  <Typography variant="body" className="text-[13px]">
                    {FormatFileSize(document_item.file.size)} | Uploaded on{" "}
                    {formatSlashDate(document_item.upload_at) +
                      " " +
                      formatTime(document_item.upload_at)}
                  </Typography>
                </div>
              )}
            </div>
          );
        })}

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
            <Typography className="ml-3 mt-1" variant="body" color="secondary">
              Send to client for signature
            </Typography>
          </div>
          <div className="w-full py-2">
            <Typography variant="body" color="secondary" className="pb-2">
              If checked, the generated offer document will be sent to the Buyer
              Client for review and signatures before being submitted to the
              Listing Agent. Signed offers are of higher quality and have a
              greater chance of being selected.
            </Typography>
          </div>
        </div>
        <div className="mt-4">
          <Button
            className="w-[200px] !text-[#4C42D7] !border-[#4C42D7]"
            variant="outlined"
            onClick={() => props.setOpenDocModal(true)}
          >
            View Offer Document
          </Button>
          <Button className="w-[200px] ml-6" onClick={() => props.sendOffer()}>
            Send Offer
          </Button>
        </div>
      </div>
    );
}

export default Review