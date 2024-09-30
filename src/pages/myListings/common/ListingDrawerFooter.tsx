import AddCompany from '@/assets/images/add_company.svg'
import AddProfile from '@/assets/images/add_profile.svg'
import IconWrapper from "@/components/baseComponents/IconWrapper"
import Typography from "@/components/baseComponents/Typography"

type IProps = {
    data?: any
}

const ListingDrawerFooter = (props: IProps) => {

    return (
        <>
            <div className="mt-[50px] px-9">
                <div className="flex gap-10">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <img
                                className="w-[145px] rounded-md"
                                src={props.data?.company?.businessLogo || AddCompany}
                            />
                        </div>
                        <div className="col-span-2 flex flex-col">
                            <Typography variant="h4" color="primary" className="truncate">{props.data?.company?.businessName || "Company Name"}</Typography>
                            <div className="flex items-center gap-2">
                                <IconWrapper name="telephone" width={13} />
                                <Typography variant="medium-text" color="secondary" className="flex items-center gap-2">{props.data?.company?.principalBrokerPhone || "000-000-0000"}</Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconWrapper name="envelope" width={13} />
                                <Typography variant="medium-text" color="secondary" className="flex items-center gap-2">{props.data?.company?.principalBrokerEmail || "info@companyname.com"}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <img className="w-[145px] rounded-md" src={props.data?.avatarURL || AddProfile} />
                        </div>
                        <div className="col-span-2 flex flex-col">
                            <Typography variant="h4" color="primary">{props.data?.firstName + " " + props.data?.lastName}</Typography>
                            <div className="flex items-center gap-2">
                                <IconWrapper name="telephone" width={13} />
                                <Typography variant="medium-text" color="secondary" className="flex items-center gap-2">{props.data?.mobileNumber || "000-000-0000"}</Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconWrapper name="envelope" width={13} />
                                <Typography variant="medium-text" color="secondary" className="flex items-center gap-2">{props.data?.contactEmail || "user@companyname.com"}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[50px] px-8">
                <Typography variant="medium-text" color="primary" className="text-center">
                    Source's Property ID: A11470191 ©2023 Miami Association of REALTORS®. All rights reserved.
                </Typography>
            </div>
        </>
    )
}

export default ListingDrawerFooter