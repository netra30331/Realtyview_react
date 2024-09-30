import Button from "@/components/baseComponents/Button/Button"
import Typography from "@/components/baseComponents/Typography"

type IProps = {
  heading: string
  content: string
  buttonText?: string
  onButtonClick?: Function
}

const TableEmptyState = ({
  heading,
  content,
  buttonText,
  onButtonClick
}: IProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center my-36">
      <Typography variant="h3" color="primary">{heading}</Typography>
      <Typography variant="medium-text" color="secondary" className="w-[300px] text-center">{content}</Typography>
      {buttonText && (
        <Button>
          <Typography variant='button1' onClick={onButtonClick}>{buttonText}</Typography>
        </Button>
      )}
    </div>
  )
}

export default TableEmptyState