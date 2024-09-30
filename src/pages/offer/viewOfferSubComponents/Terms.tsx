import Typography from "@/components/baseComponents/Typography"
import { formatSlashDate } from "@/shared/config/constants"

type IProps = {
    data?:any
}

const Terms = (props: IProps) => {

    return (
      <div>
        <Typography variant="h3" color="primary" className="py-2">
          Terms and Conditions
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Offer Amount
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.offerAmount}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Earnest Money Deposit
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.earnestMoneyDeposit}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Downpayment Inc. EMD
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.downPayment}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Subject to Mortgage
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.subjectToMortgage}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Seller Concession
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.sellerConcession}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Cash on Closing
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.cashOnClosing}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Proposed Closing Location
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.proposedClosingLocation}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Proposed Closing Date
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {formatSlashDate(props.data?.proposedClosingDate)}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Personal Property Inclusions
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.personalPropertyInclusions}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Personal Property Exclusions
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.personalPropertyExclusions}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Note
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.noteToListingAgent}
            </Typography>
          </div>
        </div>
      </div>
    );
}

export default Terms