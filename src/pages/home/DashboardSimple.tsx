import Typography from '@/components/baseComponents/Typography'
import { useAppSelector } from '@/redux/hooks'
import { getUser } from '@/redux/user/userSlice'

const DashboardSimple = () => {
    const user = useAppSelector(getUser)
    return (
        <div className="flex flex-col gap-[15px] bg-white my-[30px] p-10 rounded-md">
            <div className="flex flex-col gap-[5px]">
                <Typography variant="h4" color="primary">Welcome to your RealtyView, {user.agent.firstName}.</Typography>
                <Typography variant="body" color="secondary">RealtyView has one mission; To create a simple platform that helps Agents conduct the core functions of their business. We will rely heavily on the Agent and Broker community for feedback in order to carry out our mission. To start, we are launching with forever-free access to your client, listing, showing and offer management tools. Learn more about getting started below.</Typography>
            </div>
            <div className="flex flex-col gap-[5px]">
                <Typography variant="h4" color="primary">Relationships</Typography>
                <Typography variant="body" color="secondary">Leads are not Clients. We consider Clients as an individual or group of home buyers or sellers that you have a formal or implied agreement with. To add a listing, request a showing or submit an offer, you’ll have to add your Client first.</Typography>
            </div>
            <div className="flex flex-col gap-[5px]">
                <Typography variant="h4" color="primary">Listings</Typography>
                <Typography variant="body" color="secondary">Once you add a listing, you’ll be able to share your listing link onto your MLS, social media or even directly. From your listing link, Agents will be able to request showings and submit offers on your listing.</Typography>
            </div>
            <div className="flex flex-col gap-[5px]">
                <Typography variant="h4" color="primary">Showing Manager</Typography>
                <Typography variant="body" color="secondary">You’ll find the showing manager useful whether you’re the buyer’s agent or the listing agent. You can manage all of your inbound and outbound showing requests from one simple dashboard. Showing requests are made from your listing link and are accessed in your showing manager.</Typography>
            </div>
            <div className="flex flex-col gap-[5px]">
                <Typography variant="h4" color="primary">Offer Inbox</Typography>
                <Typography variant="body" color="secondary">With the offer manager, you can securely send and receive offers on any listing while staying organized in one central offer inbox. Buyer Agents can submit an offer via RealtyView even if the Listing Agent isn't a RealtyView member yet.</Typography>
            </div>
        </div>
    )
}

export default DashboardSimple