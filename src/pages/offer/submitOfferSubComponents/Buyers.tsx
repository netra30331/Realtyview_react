import Typography from "@/components/baseComponents/Typography"
import TextField from '@/components/baseComponents/TextField'
import {HiOutlineUserCircle} from 'react-icons/hi'
import ToggleButton from "@/components/baseComponents/ToggleButton"
import { ILead, IOffer } from '@/shared/interfaces/interfaces'
import {MdOutlineSearch } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAllClientsByUserId, getClients } from "@/redux/lead/leadSlice"
import { getUser } from "@/redux/user/userSlice"
import DefaultAvatar from "@/assets/images/default_avatar.jpg"
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'

type IProps = {
    existRelationFlag?:boolean
    selectedBuyer: string
    setExistRelationFlag:Function
    setBuyer: Function
    handleTextChange:Function
    values:IOffer
    errorPrimaryBuyerFirstName:boolean
    errorPrimaryBuyerLastName:boolean
    errorPrimaryBuyerPhoneNumber:boolean
    errorPrimaryBuyerEmailAddress:boolean
    errorSecondaryBuyerPhoneNumber:boolean
    errorSecondaryBuyerEmailAddress:boolean
    addresses: Array<any>
    onChangeAddressAutoComplete: Function
    onSelectAddressAutoComplete: Function
}

const Buyers = (props: IProps) => {
    const dispatch = useAppDispatch()
    const clients = useAppSelector(getClients);
    const user = useAppSelector(getUser);
    const onSearchClient = (value: any) => {
        dispatch(fetchAllClientsByUserId({ query: value ,type: "Buyer",  userId: user._id, }))
    }
    const setBuyer = (item: ILead) => {
        props.setBuyer(item);
    }
    return (
      <div>
        <div className="flex py-2 pt-6">
          <HiOutlineUserCircle className="mr-2 mt-1 text-[#38AFD1]" />
          <Typography variant="h3" color="secondary">
            Relationship
          </Typography>
        </div>
        <div className="flex w-full ">
          <div className="gap-y-4 mr-2 w-1/2">
            <Typography
              variant="body"
              color="secondary"
              className="pb-2 text-[13px]"
            >
              Is this Buyer an existing Relationship?
            </Typography>
          </div>
          <div className="gap-y-4 w-1/2 flex">
            <Typography
              variant="body"
              color="secondary"
              className="mr-4 text-[13px]"
            >
              Existing
            </Typography>
            <ToggleButton
              value={props.existRelationFlag === false}
              onChange={() =>
                props.setExistRelationFlag(!props.existRelationFlag)
              }
            />
            <Typography
              variant="body"
              color="secondary"
              className="ml-4 text-[13px]"
            >
              New
            </Typography>
          </div>
        </div>
        {props.existRelationFlag && !props.selectedBuyer && (
          <>
            <div className="flex py-2 pt-6">
              <div className="w-1/2">
                <Typography variant="h3" color="primary">
                  Existing Relationship
                </Typography>
              </div>
              <div className="w-1/2 relative">
                <TextField
                  inputClassName={
                    "font-montserrat !border-gray-200 bg-transparent pl-8"
                  }
                  //value={props.searchRelationParameter}
                  onChange={(e) => onSearchClient(e.target.value)}
                  placeholder="Search name, phone, email..."
                />
                <MdOutlineSearch className="absolute top-3.5 left-2 text-[#8E9CB2]" />
              </div>
            </div>
            <table className="my-6 w-full">
              <thead className="bg-[#f0f4fa]">
                <tr>
                  <th className="w-1/3 px-2 py-1 text-left">
                    <Typography variant="h4">Primary Client</Typography>
                  </th>
                  <th className="w-1/3 px-2 py-1 text-left">
                    <Typography variant="h4">Secondary Client</Typography>
                  </th>
                  <th className="w-1/3 px-2 py-1 text-left">
                    <Typography variant="h4">RELATIONSHIP</Typography>
                  </th>

                </tr>
              </thead>
              <tbody>
                {clients &&
                  clients.length > 0 &&
                  clients.map((item: any, index: number) => {
                    return (
                      <tr
                        className=""
                        onClick={() => setBuyer(item)}
                        key={index}
                      >
                        <td className="px-2 py-6">
                          <div className="flex">
                            <img
                              width="20px"
                              src={item.agent?.avatarURL ?? DefaultAvatar}
                            />{" "}
                            <Typography
                              variant="body"
                              className="text-[13px] ml-2"
                            >
                              {item.firstName + " " + item.lastName}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-2 py-6">
                          <div className="flex">
                            <img
                              width="20px"
                              src={item.agent?.avatarURL ?? DefaultAvatar}
                            />{" "}
                            <Typography
                              variant="body"
                              className="text-[13px] ml-2"
                            >
                              {item.firstName + " " + item.lastName}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-2 py-6">
                          <div className="flex">
                            <div className="w-[7px] h-[7px] bg-[#38AFD1] rounded-full mt-[8px]"></div>
                            <Typography
                              variant="body"
                              className="text-[14px] ml-1"
                            >
                              Buyer
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
        {(!props.existRelationFlag || props.selectedBuyer) && (
          <>
            <div className="mt-6">
              <Typography variant="h3" color="primary">
                Primary Buyer Details
              </Typography>
              <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    First Name *
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "primaryBuyerFirstName")
                    }
                    value={props.values.primaryBuyerFirstName}
                    className={`w-full ${
                      props.errorPrimaryBuyerFirstName
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                  />
                  {props.errorPrimaryBuyerFirstName && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      This field is required
                    </Typography>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    Last Name *
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "primaryBuyerLastName")
                    }
                    value={props.values.primaryBuyerLastName}
                    className={`w-full ${
                      props.errorPrimaryBuyerLastName
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                  />
                  {props.errorPrimaryBuyerLastName && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      This field is required
                    </Typography>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 mt-[15px]">
                <div className="col-span-1">
                  <Typography variant="caption" color="secondary">
                    Company Name
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "primaryBuyerCompanyName")
                    }
                    value={props.values.primaryBuyerCompanyName}
                    className={`w-full`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    Phone Number
                  </Typography>
                  <TextField
                    maxLength={12}
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "primaryBuyerPhoneNumber")
                    }
                    value={props.values.primaryBuyerPhoneNumber}
                    placeholder=""
                    className={`w-full ${
                      props.errorPrimaryBuyerPhoneNumber
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                  />
                  {props.errorPrimaryBuyerPhoneNumber && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      Please enter a valid phone number
                    </Typography>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    Email Address
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "primaryBuyerEmailAddress")
                    }
                    value={props.values.primaryBuyerEmailAddress}
                    className={`w-full ${
                      props.errorPrimaryBuyerEmailAddress
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                  />
                  {props.errorPrimaryBuyerEmailAddress && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      Invalid Email Address
                    </Typography>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 mt-[15px]">
                <div className="col-span-1">
                  <Typography variant="caption" color="secondary">
                    Current Address
                  </Typography>
                  <AddressAutoComplete
                    options={props.addresses}
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    placeholder="Enter Lead’s Current Address"
                    filterKey="streetLine"
                    value={props.values.primaryBuyerCurrentAddress}
                    onChange={(e) =>
                      props.onChangeAddressAutoComplete(
                        e,
                        "primaryBuyerCurrentAddress"
                      )
                    }
                    onAllChange={(e) =>
                      props.onSelectAddressAutoComplete(
                        e,
                        "primaryBuyerCurrentAddress"
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 mt-[15px]">
                <div className="col-span-1">
                  <Typography variant="caption" color="secondary">
                    Mailing Address
                  </Typography>
                  <AddressAutoComplete
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    options={props.addresses}
                    placeholder="Enter Lead’s Mailing Address"
                    filterKey="streetLine"
                    value={props.values.primaryBuyerMailingAddress}
                    onChange={(e) =>
                      props.onChangeAddressAutoComplete(
                        e,
                        "primaryBuyerMailingAddress"
                      )
                    }
                    onAllChange={(e) =>
                      props.onSelectAddressAutoComplete(
                        e,
                        "primaryBuyerMailingAddress"
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Typography variant="h3" color="primary">
                Secondary Buyer Details
              </Typography>
              <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    First Name
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "secondaryBuyerFirstName")
                    }
                    value={props.values.secondaryBuyerFirstName}
                    className={`w-full`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    Last Name
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "secondaryBuyerLastName")
                    }
                    value={props.values.secondaryBuyerLastName}
                    className={`w-full`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-[15px]">
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    Phone Number
                  </Typography>
                  <TextField
                    maxLength={12}
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    placeholder=""
                    onChange={(e) =>
                      props.handleTextChange(e, "secondaryBuyerPhoneNumber")
                    }
                    value={props.values.secondaryBuyerPhoneNumber}
                    className={`w-full ${
                      props.errorSecondaryBuyerPhoneNumber
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                  />
                  {props.errorSecondaryBuyerPhoneNumber && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      Please enter a valid phone number
                    </Typography>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Typography variant="caption" color="secondary" className="">
                    Email Address
                  </Typography>
                  <TextField
                    placeholder=""
                    disabled={
                      props.selectedBuyer && props.existRelationFlag
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      props.handleTextChange(e, "secondaryBuyerEmailAddress")
                    }
                    value={props.values.secondaryBuyerEmailAddress}
                    className={`w-full ${
                      props.errorSecondaryBuyerEmailAddress
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                  />
                  {props.errorSecondaryBuyerEmailAddress && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      Invalid Email Address
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
}

export default Buyers