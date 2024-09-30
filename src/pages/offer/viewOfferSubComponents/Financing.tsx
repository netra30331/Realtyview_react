import Typography from "@/components/baseComponents/Typography"
import { formatSlashDate} from '@/shared/config/constants'

type IProps = {
    data?:any
}

const Financing = (props: IProps) => {

    return (
      <div>
        <Typography variant="h3" color="primary" className="py-2">
          Mortgage
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Held By
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.mortgageHeldBy}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Type
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.mortgageType}
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
              {props.data?.mortgagePeriod}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Payment Due Date
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {formatSlashDate(props.data?.paymentDate)}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Interest Rate
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.interestRate}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Monthly Payment
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.monthlyPayment}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Proposed Closing Date
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {formatSlashDate(props.data?.mortgageProposedClosingDate)}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Interest Rate
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.interestRate}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mortgage Due (days from formal contract)
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.mortgageDays}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" color="primary" className="py-2">
          Load Offer
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.loanFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.loanLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.loanPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.loanEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.loanCompany}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.loanCompanyAddress}
            </Typography>
          </div>
        </div>
      </div>
    );
}

export default Financing