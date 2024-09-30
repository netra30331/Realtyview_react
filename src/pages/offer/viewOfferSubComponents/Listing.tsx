import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import Slider from 'react-slick';
// import { IOffer } from '@/shared/interfaces/interfaces'

type IProps = {
    data?:any

}

const Listing = (props: IProps) => {
    const CustomArrow: React.FC<any> = (props) => {
        const { onClick, direction } = props;
        return (
            <div className={`custom-arrow ${direction}`} onClick={onClick}>
                {direction === "left" ? "<" : ">"}
            </div>
        );
    }

    const slider_settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        prevArrow: <CustomArrow direction="left"/>,
        nextArrow: <CustomArrow direction="right"/>
    };

    return (
      <div>
        <Slider {...slider_settings}>
          {props.data?.image?.map((image_item: string, image_index: number) => {
            return (
              <div key={image_index} className="px-2 w-1/3]">
                <img className="w-full" src={image_item} />
              </div>
            );
          })}
        </Slider>

        <Typography variant="h3" color="primary" className="py-2">
          Address
        </Typography>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Address
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.listing?.listingAddress}
            </Typography>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Neighborhood
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.listing?.listingNeigborhood}
            </Typography>
          </div>
          <div className="w-1/3 sm:w-full gap-y-4">
            <Typography variant="caption" color="secondary" className="py-2">
              Unit
            </Typography>
            <Typography variant="body" color="primary" className="pb-2">
              {props.data?.listing?.listingUnit}
            </Typography>
          </div>
        </div>
      </div>
    );
}

export default Listing