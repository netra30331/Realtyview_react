import Typography from "@/components/baseComponents/Typography"

type IProps = {
    data?:any
}

const Legal = (props: IProps) => {

    return (
      <div>
        <Typography variant="h3" color="primary" className="py-2">
          Buyer’s Attorney
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.buyeraAttorneyFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.buyerAttorneyLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.buyerAttorneyPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.buyerAttorneyEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.buyerAttorneyCompany}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.buyerAttorneyAddress}
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
              {props.data?.sellerAttorneyFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.sellerAttorneyLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.sellerAttorneyPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.sellerAttorneyEmailAddress}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.sellerAttorneyCompany}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.sellerAttorneyAddress}
            </Typography>
          </div>
        </div>
      </div>
    );
}

export default Legal