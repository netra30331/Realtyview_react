import { Button } from "@/components/baseComponents/Button"
import { IMyListing } from "@/shared/interfaces/interfaces"
import Typography from "@/components/baseComponents/Typography"
import IconWrapper from "@/components/baseComponents/IconWrapper"
import { XMarkIcon } from "@heroicons/react/24/outline"

type IProps = {
    data?: IMyListing
    onAddPhoto: Function
    onRemovePhoto: Function
    onChangePhotoOrder: Function
}
const Photos = (props: IProps) => {

    const handleOndragOver = (event: any) => {
        event.preventDefault();
    }

    return (
        <div className="my-[50px]">
            <div className="px-8">
                <Typography variant="h3" color="primary">Property Photos</Typography>
                <label htmlFor="propertyPhotos" className="flex flex-col items-center w-full bg-[#F1F5F9] rounded-md cursor-pointer mt-[25px] py-8" onDragOver={(e) => handleOndragOver(e)} onDrop={(e) => props.onAddPhoto(e, true)}>
                    <Typography variant="caption" color="black" className="text-center">Drop photos here or click to upload</Typography>
                    <Typography variant="medium-text" color="secondary" className="text-center w-[250px] mt-3">You can click the photo to add caption and the arrows to change the order</Typography>
                    <div className="flex items-center gap-2 bg-white hover:bg-white mt-6 px-5 py-2 rounded-md">
                        <IconWrapper name="image" width={11} height={11} />
                        <Typography variant="medium-text" color="primary" className="whitespace-nowrap">Upload</Typography>
                    </div>
                    <input type="file" accept="image/*" id="propertyPhotos" name="propertyPhotos" multiple hidden onChange={(event) => { props.onAddPhoto(event); }} />
                </label>
                <div className="grid grid-cols-4 gap-[15px] mt-[25px]">
                    {props.data?.propertyPhotos && props.data?.propertyPhotos.length > 0 && props.data?.propertyPhotos.sort(m => m.order).map((photo, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-[1px] relative">
                                <button className="absolute top-1 right-1 bg-white hover:bg-white rounded-full p-1" onClick={() => props.onRemovePhoto(index)}>
                                    <XMarkIcon className="h-3 w-3 text-gray-500" aria-hidden="true" />
                                </button>
                                <img src={photo.isFile? URL.createObjectURL(photo.file): photo.file} className="aspect-square rounded-md transition duration-150 ease-in-out" />
                                <div className="flex justify-between items-center">
                                    <Button className="bg-transparent hover:bg-transparent" onClick={() => props.onChangePhotoOrder(false, photo.order)}>
                                        <IconWrapper name="arrow-backward" width={5} />
                                    </Button>
                                    <Typography variant="caption" color="secondary">{photo.order} / {props.data?.propertyPhotos.length}</Typography>
                                    <Button className="bg-transparent hover:bg-transparent" onClick={() => props.onChangePhotoOrder(true, photo.order)}>
                                        <IconWrapper name="arrow-forward" width={5} />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}

                    <div className="flex items-center h-[120px]">
                        <label htmlFor="propertyPhotos" className="flex justify-center items-center gap-2 bg-white hover:bg-white h-full w-full p-0 border border-2 cursor-pointer rounded-md">
                            <IconWrapper name="image" width={11} height={11} />
                            <Typography variant="medium-text" color="primary" className="whitespace-nowrap">Add Photo</Typography>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Photos