
import Typography from "@/components/baseComponents/Typography"
import { Button } from "@/components/baseComponents/Button"
import VerifyImage from "@/assets/images/verify.png"
const Verify = () => {
    return (
        <div className="px-5 py-8 flex items-center justify-center">
            <div className="flex items-start justify-center gap-5 max-w-[1024px]">
                <div className="mt-16">
                    <Typography variant="h2" color="primary">Get Verified</Typography>
                    <Typography variant="body" color="primary" className="my-3 max-w-[518px] w-full">
                        Getting verified is simple and only takes 2-3 minutes. When you are verified, you’ll display a badge letting your colleagues know that you are in fact a licensed professional which they look for when scheduling showings and evaluating offers.
                    </Typography>
                    <div className="md:flex gap-5">
                        <Button className="w-full md:w-[200px] text-15">Get Verified</Button>
                        <Button variant="outlined" className="w-full md:w-[200px] text-15 mt-3 md:mt-0">Learn More</Button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img src={VerifyImage} alt="verify" />
                </div>
            </div>
        </div>
    )
}
export default Verify
