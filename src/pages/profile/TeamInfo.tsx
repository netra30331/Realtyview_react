import React from 'react'
import TextField from "@/components/baseComponents/TextField"
import Typography from "@/components/baseComponents/Typography"
import { Button } from "@/components/baseComponents/Button"
import AddCompany from '@/assets/images/add_company.svg'
import AddTeam from '@/assets/images/add_team.svg'
import { ICompanyTeamInfo } from '@/shared/interfaces/interfaces'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { getUser, updateCompanyTeamInfo, getCompanies, fetchRelevantCompanies, getAddresses, fetchAddressAutocomplete } from '@/redux/user/userSlice'
import { notify } from '@/shared/services/notify'
import validation from '@/shared/services/validation'
import AutoComplete from '@/components/baseComponents/AutoComplete'
import AddressAutoComplete from '@/components/baseComponents/AddressAutoComplete'
import { myBucket } from '@/shared/services/s3Bucket'
//import SmartyStreetsSDK from 'smartystreets-javascript-sdk'

type IProps = {
    isCompanyDetailsHidden?: boolean
    isTeamDetailsHidden?: boolean
}

const TeamInfo = (props: IProps) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)
    const companies = useAppSelector(getCompanies)
    const addresses = useAppSelector(getAddresses)

    const company = user.agent.company ?? '';
    const team = user.agent.team ?? "";
    const initialInfo: ICompanyTeamInfo = {
      companyId: company?._id,
      businessName: company?.businessName ?? "",
      businessAddress1: company?.businessAddress1 ?? "",
      businessAddress2: company?.businessAddress2 ?? "",
      businessCity: company?.businessCity ?? "",
      state: company?.state ?? "",
      businessZip: company?.businessZip ?? "",
      county: company?.county ?? "",
      businessLogo: company?.businessLogo ?? "",
      isProfile: company?.isProfile ?? "",
      principalBrokerFirstName: company?.principalBrokerFirstName ?? "",
      principalBrokerLastName: company?.principalBrokerLastName ?? "",
      principalBrokerEmail: company?.principalBrokerEmail ?? "",
      principalBrokerPhone: company?.principalBrokerPhone ?? "",
      teamLogo: team?.teamLogo ?? "",
      teamName: team?.teamName ?? "",
      teamLeaderFirstName: team?.teamLeaderFirstName ?? "",
      teamLeaderLastName: team?.teamLeaderLastName ?? "",
      teamLeaderBrokerEmail: team?.teamLeaderBrokerEmail ?? "",
      teamLeaderPhone: team?.teamLeaderPhone ?? "",
    };
    const [avatarURL, setAvatarURL] = React.useState<string>("");
    const avatarRef = React.useRef(null);
    const [avatarTeamURL, setAvatarTeamURL] = React.useState<string>("");
    const avatarTeamRef = React.useRef(null);
    const [values, setValues] = React.useState<ICompanyTeamInfo>(initialInfo);
    const [errorBrokerPhone, setErrorBrokerPhone] =
      React.useState<boolean>(false);
    const [errorLeaderPhone, setErrorLeaderPhone] =
      React.useState<boolean>(false);
    const [errorTeamLeaderBrokerEmail, setErrorTeamLeaderBrokerEmail] =
      React.useState<boolean>(false);
    const [errorPrincipalBrokerEmail, setErrorPrincipalBrokerEmail] =
      React.useState<boolean>(false);
    const [isLeader, setIsLeader] = React.useState<boolean>(
      team.teamLeaderBrokerEmail === user.email ? true : false
    );
    const [teamDisable, setTeamDisable] = React.useState<boolean>(false);
    const [companyDisable, setCompanyDisable] = React.useState<boolean>(false); //company?.isProfile === 1?true:false
    const [submitDisable, setSubmitDisable] = React.useState<boolean>(false);

    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      let tempValue = value;
      if (name.includes("Name")) {
        tempValue = value.replace(/[^a-z]/gi, "");
      }
      setValues({
        ...values,
        [name]: tempValue,
      });
      if (name === "principalBrokerPhone" || name === "teamLeaderPhone") {
        const formattedPhoneNumber = validation.phoneNumberAutoFormat(value);
        if (
          name === "principalBrokerPhone" &&
          formattedPhoneNumber.length > 0 &&
          formattedPhoneNumber.length < 12
        )
          setErrorBrokerPhone(true);
        else setErrorBrokerPhone(false);
        if (
          name === "teamLeaderPhone" &&
          formattedPhoneNumber.length > 0 &&
          formattedPhoneNumber.length < 12
        )
          setErrorLeaderPhone(true);
        else setErrorLeaderPhone(false);
        setValues({
          ...values,
          [name]: formattedPhoneNumber,
        });
      }
      switch (name) {
        case "principalBrokerEmail":
          setErrorPrincipalBrokerEmail(
            validation.IsInvalidEmail(value) && value.length > 0
          );
          break;
        case "teamLeaderBrokerEmail":
          setErrorTeamLeaderBrokerEmail(
            validation.IsInvalidEmail(value) && value.length > 0
          );
          break;
      }
    };

    const changeFile = (files: Array<any>) => {
      setAvatarURL(URL.createObjectURL(files[0]));
      updateAvatar(files[0], true);
    };
    const changeFileTeam = (files: Array<any>) => {
      setAvatarTeamURL(URL.createObjectURL(files[0]));
      updateAvatar(files[0], false);
    };
    const updateAvatar = (file: any, isCompany: boolean) => {
      if (file === "") return;
      setSubmitDisable(true);
      const timestamp = new Date().getTime();
      const newFile = new File([file], timestamp + "_" + file.name);
      const fileParams: any = {
        ACL: "public-read",
        Body: newFile,
        Bucket: import.meta.env.VITE_BUCKET_NAME,
        Key: newFile.name,
      };

      myBucket.upload(fileParams, (err: any, data: any) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          if (isCompany) {
            setAvatarURL(data.Location);
            setValues({
              ...values,
              businessLogo: data.Location,
            });
          } else {
            setAvatarTeamURL(data.Location);
            setValues({
              ...values,
              teamLogo: data.Location,
            });
          }

          setSubmitDisable(false);
        }
      });
    };
    const openDialog = () => {
      (avatarRef.current as any).click();
    };

    const openDialogTeam = () => {
      (avatarTeamRef.current as any).click();
    };

    const updateCompanyTeam = () => {
      if (
        !errorBrokerPhone &&
        !errorLeaderPhone &&
        !errorPrincipalBrokerEmail &&
        !errorTeamLeaderBrokerEmail
      ) {
        dispatch(
          updateCompanyTeamInfo({
            email: user.email,
            data: values,
          })
        ).then((res) => {
          if (res.payload.user?.agent?.company?.isProfile) {
            setCompanyDisable(true);
          }
          notify(res.payload.success, res.payload.message);
        });
      }
    };

    const onChangeAutoComplete = (value: any) => {
      setValues({
        ...values,
        businessName: value,
      });
      dispatch(fetchRelevantCompanies({ query: value }));
    };

    const onChangeAddressAutoComplete = (value: any) => {
      setValues({
        ...values,
        businessAddress1: value,
      });
      dispatch(fetchAddressAutocomplete({ address: value }));
    };

    const onSelectAddressAutoComplete = (value: any) => {
      setValues({
        ...values,
        businessAddress1: value.streetLine, //+' '+value.city+', '+value.state+' '+value.zipcode+' '+value.secondary,
        businessCity: value.city,
        state: value.state,
        businessZip: value.zipcode,
      });
    };

    const onAllChangeAutoComplete = (value: any) => {
      console.log(value, "=================");
      if (value.isProfile === 1) {
        setCompanyDisable(true);
      } else {
        setCompanyDisable(false);
      }

      setValues({
        ...values,
        companyId: value._id,
        businessName: value.businessName,
        businessLogo: value.businessLogo,
        businessAddress1: value.businessAddress1,
        businessAddress2: value.businessAddress2,
        businessCity: value.businessCity,
        state: value.state,
        businessZip: value.businessZip,
        county: value.county,
        principalBrokerEmail: value.principalBrokerEmail ?? "",
        principalBrokerFirstName: value.principalBrokerFirstName ?? "",
        principalBrokerLastName: value.principalBrokerLastName ?? "",
        principalBrokerPhone: value.principalBrokerPhone ?? "",
      });
      dispatch(fetchRelevantCompanies({ query: value.businessName }));
    };

    const handleIsLeader = (isLeader: boolean) => {
      setIsLeader(isLeader);
      if (isLeader) {
        setValues({
          ...values,
          teamLeaderFirstName: user.agent.firstName,
          teamLeaderLastName: user.agent.lastName,
          teamLeaderBrokerEmail: user.agent.contactEmail,
          teamLeaderPhone: user.agent.mobileNumber,
        });
      }
    };
    React.useEffect(() => {
      if (values.businessName.length > 0) {
        setTeamDisable(false);
      } else setTeamDisable(true);
    }, [values.businessName]);

    return (
      <div className="px-5 py-8">
        {!props.isCompanyDetailsHidden && (
          <div className="lg2:flex items-start justify-between">
            <div>
              <Typography variant="h2" color="primary">
                Company Details
              </Typography>
              <Typography
                variant="body"
                color="secondary"
                className="text-[11px] leading-[15px] mt-2 w-[200px]"
              >
                Add the company or brokerage that you are associated with.
              </Typography>
              <div className="flex items-center gap-5 mt-5">
                <img
                  src={
                    avatarURL !== ""
                      ? avatarURL
                      : values.businessLogo
                      ? values.businessLogo
                      : AddCompany
                  }
                  alt="addProfile"
                  className="cursor-pointer w-[75px] h-[75px] rounded"
                  onClick={() => openDialog()}
                />
                <input
                  type="file"
                  ref={avatarRef}
                  hidden
                  onChange={(e) => changeFile((e.target as any).files)}
                  disabled={companyDisable}
                />
              </div>
            </div>
            <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
              <div className="grid grid-cols-1 mb-[25px]">
                <div className="col-span-1">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Company Name
                  </Typography>
                  {/* <TextField className='w-full' placeholder='Search by typing your Brokerage’s name or add a new one' name='companyName' value={values.companyName} onChange={(e)=>handleInputChange(e)} /> */}
                  <AutoComplete
                    options={companies}
                    filterKey="businessName"
                    placeholder="Search by typing your Brokerage’s name or continue typing to add a new company"
                    value={values.businessName}
                    onChange={onChangeAutoComplete}
                    onAllChange={onAllChangeAutoComplete}
                  />
                </div>
              </div>
              <div
                className={`grid grid-cols-2 md:gap-3 mb-[25px] ${
                  companyDisable ? "opacity-40" : ""
                }`}
              >
                <div className="col-span-5 md:col-span-3">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Address
                  </Typography>
                  {/* <TextField className='w-full' name='businessAddress1' value={values.businessAddress1} onChange={(e) => handleInputChange(e)}  disabled={companyDisable}/> */}
                  <AddressAutoComplete
                    options={addresses}
                    filterKey="streetLine"
                    value={values.businessAddress1}
                    onChange={onChangeAddressAutoComplete}
                    onAllChange={onSelectAddressAutoComplete}
                    disabled={companyDisable}
                  />
                </div>
                <div className="col-span-5 md:col-span-2 mt-[25px] md:mt-[0px]">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Unit
                  </Typography>
                  <TextField
                    className="w-full"
                    name="businessAddress2"
                    value={values.businessAddress2}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
              </div>
              <div
                className={`grid grid-cols-2 md:gap-3 mb-[25px] ${
                  companyDisable ? "opacity-40" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    City
                  </Typography>
                  <TextField
                    className="w-full"
                    name="businessCity"
                    value={values.businessCity}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
                <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px]">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    State
                  </Typography>
                  <TextField
                    className="w-full"
                    name="state"
                    value={values.state}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
              </div>
              <div
                className={`grid grid-cols-2 md:gap-3 mb-[25px] ${
                  companyDisable ? "opacity-40" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Zip Code
                  </Typography>
                  <TextField
                    className="w-full"
                    name="businessZip"
                    value={values.businessZip}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
                <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px]">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    County
                  </Typography>
                  <TextField
                    className="w-full"
                    name="county"
                    value={values.county}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
              </div>
              <div
                className={`grid grid-cols-2 md:gap-3 mb-[25px] ${
                  companyDisable ? "opacity-40" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Principal Broker First Name
                  </Typography>
                  <TextField
                    className="w-full"
                    name="principalBrokerFirstName"
                    value={values.principalBrokerFirstName}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
                <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px]">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Principal Broker Last Name
                  </Typography>
                  <TextField
                    className="w-full"
                    name="principalBrokerLastName"
                    value={values.principalBrokerLastName}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                </div>
              </div>
              <div
                className={`grid grid-cols-2 md:gap-3 mb-[25px] ${
                  companyDisable ? "opacity-40" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Principal Broker Email
                  </Typography>
                  <TextField
                    className={`w-full ${
                      errorPrincipalBrokerEmail
                        ? "outline outline-1 rounded outline-[#E01010]"
                        : ""
                    }`}
                    name="principalBrokerEmail"
                    value={values.principalBrokerEmail}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                  {errorPrincipalBrokerEmail && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      Invalid Email Address
                    </Typography>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px] relative">
                  <Typography
                    variant="caption"
                    className="text-secondary mb-[10px]"
                  >
                    Principal Broker Phone
                  </Typography>
                  <TextField
                    className={`w-full`}
                    maxLength={12}
                    name="principalBrokerPhone"
                    value={values.principalBrokerPhone}
                    onChange={(e) => handleInputChange(e)}
                    disabled={companyDisable}
                  />
                  {errorBrokerPhone && (
                    <Typography
                      variant="caption"
                      className="text-[#E01010] absolute mt-[2px]"
                    >
                      Please enter a valid phone number
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {!props.isCompanyDetailsHidden && !props.isTeamDetailsHidden && (
          <div className="border-b border-gray-200 w-full mt-[25px]"></div>
        )}
        {!props.isTeamDetailsHidden && (
          <>
            <div
              className={` lg2:flex items-start justify-between ${
                !props.isCompanyDetailsHidden && `mt-[50px]`
              }`}
            >
              <div className={`${teamDisable ? "opacity-40" : ""}`}>
                <Typography variant="h2" color="primary">
                  Team Details
                </Typography>
                <Typography
                  variant="body"
                  color="secondary"
                  className="text-[11px] leading-[15px] mt-2 "
                >
                  If you are a member of a team, add it here.
                </Typography>
                <div className="flex items-center gap-5 mt-5">
                  <img
                    src={
                      avatarTeamURL !== ""
                        ? avatarTeamURL
                        : values.teamLogo
                        ? values.teamLogo
                        : AddTeam
                    }
                    alt="addProfile"
                    className="cursor-pointer w-[75px] h-[75px] rounded"
                    onClick={() => openDialogTeam()}
                  />
                  <input
                    type="file"
                    ref={avatarTeamRef}
                    hidden
                    onChange={(e) => changeFileTeam((e.target as any).files)}
                    disabled={teamDisable}
                  />
                </div>
              </div>
              <div className="w-full lg2:max-w-[670px] mt-[25px] lg2:mt-[0px]">
                <div className={`${teamDisable ? "opacity-40" : ""}`}>
                  <div className="grid grid-cols-1 mb-[25px]">
                    <div className="col-span-1">
                      <Typography
                        variant="caption"
                        className="text-secondary mb-[10px]"
                      >
                        Team Name
                      </Typography>
                      <TextField
                        className="w-full"
                        placeholder="Search by typing your Team's name or add a new one"
                        disabled={teamDisable}
                        name="teamName"
                        value={values.teamName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="mb-[25px] flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      disabled={teamDisable}
                      checked={isLeader}
                      onChange={(e) => handleIsLeader(e.target.checked)}
                    />
                    <Typography variant="body">
                      I am the team leader.
                    </Typography>
                  </div>
                  <div className="grid grid-cols-2 md:gap-3 mb-[25px]">
                    <div className="col-span-2 md:col-span-1">
                      <Typography
                        variant="caption"
                        className="text-secondary mb-[10px]"
                      >
                        Team Leader First Name
                      </Typography>
                      <TextField
                        className="w-full"
                        disabled={teamDisable}
                        name="teamLeaderFirstName"
                        value={values.teamLeaderFirstName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px]">
                      <Typography
                        variant="caption"
                        className="text-secondary mb-[10px]"
                      >
                        Team Leader Last Name
                      </Typography>
                      <TextField
                        className="w-full"
                        disabled={teamDisable}
                        name="teamLeaderLastName"
                        value={values.teamLeaderLastName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:gap-3 mb-[25px]">
                    <div className="col-span-2 md:col-span-1">
                      <Typography
                        variant="caption"
                        className="text-secondary mb-[10px]"
                      >
                        Team Leader Broker Email
                      </Typography>
                      <TextField
                        className={`w-full ${
                          errorTeamLeaderBrokerEmail
                            ? "outline outline-1 rounded outline-[#E01010]"
                            : ""
                        }`}
                        disabled={teamDisable}
                        name="teamLeaderBrokerEmail"
                        value={values.teamLeaderBrokerEmail}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {errorTeamLeaderBrokerEmail && (
                        <Typography
                          variant="caption"
                          className="text-[#E01010] absolute mt-[2px]"
                        >
                          Invalid Email Address
                        </Typography>
                      )}
                    </div>
                    <div className="col-span-2 md:col-span-1 mt-[25px] md:mt-[0px] relative">
                      <Typography
                        variant="caption"
                        className="text-secondary mb-[10px]"
                      >
                        Team Leader Phone
                      </Typography>
                      <TextField
                        className={`w-full`}
                        disabled={teamDisable}
                        maxLength={12}
                        name="teamLeaderPhone"
                        value={values.teamLeaderPhone}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {errorLeaderPhone && (
                        <Typography
                          variant="caption"
                          className="text-[#E01010] absolute mt-[2px]"
                        >
                          Please enter a valid phone number
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end mb-16">
          <Button
            className="w-[200px] text-15"
            onClick={() => updateCompanyTeam()}
            disabled={submitDisable}
          >
            Submit
          </Button>
        </div>
      </div>
    );
}
export default TeamInfo