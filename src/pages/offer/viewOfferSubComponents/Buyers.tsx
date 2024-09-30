import Typography from "@/components/baseComponents/Typography"

type IProps = {
    data?:any
}

const Buyers = (props: IProps) => {

    return (
      <div>
        <Typography variant="h3" color="primary" className="py-2">
          Primary Buyer Details
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              First Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.firstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.lastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Company Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.companyName}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.phoneNumber}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.email}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Current Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.address}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Mailing Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.emailAddress}
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
              {props.data?.client?.secondaryFirstName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Last Name
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.secondaryLastName}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Phone Number
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.secondaryPhoneNumber}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Email Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.client?.secondaryEmailAddress}
            </Typography>
          </div>
        </div>
      </div>
    );
}

export default Buyers