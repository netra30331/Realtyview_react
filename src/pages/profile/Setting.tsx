
import Typography from "@/components/baseComponents/Typography"
import { Button } from "@/components/baseComponents/Button"
import React from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai"
import moment from 'moment-timezone';
import Select from "@/components/baseComponents/Select"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getUser, updateUserTimezone } from "@/redux/user/userSlice";
import { notify } from "@/shared/services/notify";
import { UpdateUserTimezoneDto } from "@/shared/interfaces/interfaces";

const Setting = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser);
    const timezones = moment.tz.names();
    const [selectedTimezone, setSelectedTimezone] = React.useState(user.agent.timezone?user.agent.timezone: 'UTC');
    const submit = () => {
        let data: UpdateUserTimezoneDto = {
            email: user.email,
            timezone: selectedTimezone
        }
        dispatch(updateUserTimezone(data)).then((res) => {
            try {
                notify(res.payload.success, res.payload.message)
            } catch (e) {
                notify(false, 'Something went wrong.')
            }
        })
    }
    const autoDetect = () => {

    }
    return (
        <div className="px-5 py-8 ">
            <div className="lg:flex items-start justify-between">
                <div className="flex items-start">
                    <Typography variant="h2" color="primary">Settings</Typography>
                </div>
                <div className="w-full lg:max-w-[600px] mt-[25px] lg:mt-[0px]">
                    <div className="grid grid-cols-1 mb-[25px]">
                        <div className="col-span-1">
                        <div className='flex justify-between'>
                                <Typography variant='caption' className='text-secondary mb-[10px]'>Time Zone</Typography>
                                <Typography variant='caption' className='text-secondary mb-[10px] flex items-center cursor-pointer hover:text-gray-700' onClick={autoDetect}>
                                    <AiOutlineInfoCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                                    Auto Detect Timezone
                                </Typography>
                            </div>
                            <div className="flex gap-3">
                                <div className='relative w-full'>
                                    <Select
                                        options={[...timezones.map(tz => {return {
                                            value: tz, label: tz
                                        }})]}
                                        name='buyerPropertyType'
                                        value={{ value: selectedTimezone, label: selectedTimezone }}
                                        onChange={(value) => {
                                            setSelectedTimezone(value.value);
                                         }
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={` lg2:flex items-end justify-end mt-[50px] w-full`}>
                <div className="flex justify-end mb-16">
                    <Button className="w-[200px] text-15"  onClick={() => submit()} disabled={false}>Submit</Button>
                </div>
            </div>
        </div>
    )
}
export default Setting
