import React from 'react'
import Typography from "@/components/baseComponents/Typography"
import TextField from '@/components/baseComponents/TextField'
import Slider from 'react-slick';
import ListingImagePlaceholder from '@/assets/images/listing_image_placeholder.png'
import {MdOutlineSearch } from 'react-icons/md'
import { IMyListing } from '@/shared/interfaces/interfaces'

type IProps = {
  selectedlisting?: IMyListing;
  search_list_flag?: boolean;
  addressKeyword?: string;
  searchListings: Function;
  listingsForOffer?: Array<IMyListing>;
  selectListingRecord: Function;
  selectedIndex?: any;
};

const Listing = (props: IProps) => {
  const CustomArrow: React.FC<any> = (props) => {
    const { onClick, direction } = props;
    return (
      <div className={`custom-arrow ${direction}`} onClick={onClick}>
        {direction === "left" ? "<" : ">"}
      </div>
    );
  };

  const slider_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
  };

  console.log(props.selectedlisting, props.search_list_flag, "--------");
  return (
    <div>
      {!props.selectedlisting && props.search_list_flag && (
        <>
          <div className="flex mb-4 relative">
            <TextField
              inputClassName={
                "font-montserrat !border-b-1 border-t-0 border-x-0 !border-[#8E9CB2] bg-transparent"
              }
              value={props.addressKeyword}
              onChange={(e) => props.searchListings(e.target.value)}
              placeholder="Enter an Address or MLS Number"
            />
            <MdOutlineSearch className="absolute top-3 right-4 text-[#8E9CB2]" />
          </div>
          <table className="my-6 w-full">
            <thead className="bg-[#f0f4fa]">
              <tr>
                <th className="px-2 py-1 text-left">
                  <Typography variant="h4">Address</Typography>
                </th>
                <th className="px-2 py-1 text-left">
                  <Typography variant="h4">MLS Number</Typography>
                </th>
                <th className="px-2 py-1 text-left">
                  <Typography variant="h4">Listing Agent</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.addressKeyword !== "" &&
                props.listingsForOffer &&
                props.listingsForOffer.length > 0 &&
                props.listingsForOffer.map((item: any, index: number) => {
                  return (
                    <tr
                      className={
                        "even:bg-gray-50 cursor-pointer hover:bg-gray-200" +
                        (props.selectedIndex === index ? " !bg-blue-100" : "")
                      }
                      onClick={() => props.selectListingRecord(item, index)}
                    >
                      <td className="px-2 py-6">
                        <Typography variant="body" className="text-[13px]">
                          {item.listingAddress}
                        </Typography>
                      </td>
                      <td className="px-2 py-6">
                        <Typography variant="body" className="text-[13px]">
                          {item.listingMlsNumber}
                        </Typography>
                      </td>
                      <td className="px-2 py-6 flex">
                        <img
                          width="20px"
                          src={
                            (item.propertyPhotos &&
                              item.propertyPhotos[0]?.file) ||
                            ListingImagePlaceholder
                          }
                        />{" "}
                        <Typography variant="body" className="text-[13px] ml-2">
                          {item.client?.firstName}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
      {props.selectedlisting && (
        <>
          <Slider {...slider_settings}>
            {props.selectedlisting?.propertyPhotos &&
              props.selectedlisting?.propertyPhotos.map(
                (item: any, image_index: number) => {
                  return (
                    <div key={image_index} className="px-2 w-1/3]">
                      <img
                        className="w-full"
                        src={item.file || ListingImagePlaceholder}
                      />
                    </div>
                  );
                }
              )}
          </Slider>

          <Typography variant="h3" color="primary" className="py-2 mt-6">
            Address
          </Typography>
          <div className="flex w-full ">
            <div className="w-1/3 sm:w-full gap-y-4">
              <Typography variant="caption" color="secondary" className="py-2">
                Address 1
              </Typography>
              <Typography variant="body" color="primary" className="pb-2">
                {props.selectedlisting.listingAddress}
              </Typography>
            </div>
            {/* <div className='w-1/3 sm:w-full gap-y-4'>
                    <Typography variant='caption' color='secondary' className='py-2'>Address 2</Typography>
                    <Typography variant='body' color='primary' className='pb-2'>{selectedlisting.address2}</Typography>
                </div>
                <div className='w-1/3 sm:w-full gap-y-4'>
                    <Typography variant='caption' color='secondary' className='py-2'>City</Typography>
                    <Typography variant='body' color='primary' className='pb-2'>{selectedlisting.city}</Typography>
                </div> */}
          </div>
          <div className="flex w-full ">
            <div className="w-1/3 sm:w-full gap-y-4">
              <Typography variant="caption" color="secondary" className="py-2">
                Neighborhood
              </Typography>
              <Typography variant="body" color="primary" className="pb-2">
                {props.selectedlisting.listingNeigborhood}
              </Typography>
            </div>
            <div className="w-1/3 sm:w-full gap-y-4">
              <Typography variant="caption" color="secondary" className="py-2">
                Unit
              </Typography>
              <Typography variant="body" color="primary" className="pb-2">
                {props.selectedlisting.listingUnit}
              </Typography>
            </div>
            {/* <div className='w-1/3 sm:w-full gap-y-4'>
                    <Typography variant='caption' color='secondary' className='py-2'>Zip Code</Typography>
                    <Typography variant='body' color='primary' className='pb-2'>{selectedlisting.zip_code}</Typography>
                </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Listing