import Typography from "@/components/baseComponents/Typography"
import TextField from '@/components/baseComponents/TextField'
import { IOffer } from '@/shared/interfaces/interfaces'
import Button from "@/components/baseComponents/Button/Button"
import Select from "@/components/baseComponents/Select"
import DotsVertical from '@/assets/icons/dot_vertical.png'
import XMark from '@/assets/icons/XMark.png'
import { formatSlashDate, formatTime } from "@/shared/config/constants";

type IProps = {
  changeRenameFile: Function;
  changeDocType: Function;
  handleFileChange: Function;
  deleteDocLine: Function;
  addDocsLine: Function;
  values: IOffer;
  selectOptions: Array<any>;
};

const Docs = (props: IProps) => {
  return (
    <div>
      <div className="mt-6 flex justify-between">
        <Typography variant="h3" color="primary">
          Documents
        </Typography>
        <Button
          variant="outlined"
          size="small"
          className="py-1 h-[30px] border-gray-400"
        >
          <Typography variant="button2" color="secondary">
            Import from Relationship
          </Typography>
        </Button>
      </div>
      {props.values.documents.length > 0 &&
        props.values.documents.map((documentItem: any, index: any) => {
          return (
            <div className="mt-6 flex" key={index}>
              <div className="w-1/4 mr-2">
                <Typography variant="caption" color="primary">
                  Document Type
                </Typography>
                <Select
                  className="bg-white"
                  options={props.selectOptions}
                  name="document_type_1"
                  value={{
                    value: documentItem.docType,
                    label: documentItem.docType,
                  }}
                  onChange={(value) => props.changeDocType(value, index)}
                />
              </div>
              <div className="w-1/4 mr-2">
                <Typography variant="caption" color="primary">
                  Rename File
                </Typography>
                <TextField
                  placeholder=""
                  value={documentItem.rename}
                  onChange={(e) => props.changeRenameFile(e, index)}
                  className={`w-full`}
                />
              </div>
              <div className="w-1/2">
                <Typography variant="caption" color="primary">
                  Document
                </Typography>
                {documentItem.file && documentItem.isFile ? (
                  <div>
                    <div className="w-full flex justify-between">
                      <Typography
                        variant="body"
                        className="text-[13px] text-[#4C42D7] w-[95%]"
                      >
                        {documentItem.file.name}
                      </Typography>
                      <img
                        src={DotsVertical}
                        alt="DotsVertical"
                        className="h-[20px] cursor-pointer"
                      />
                    </div>
                    <div className="w-full flex">
                      <Typography
                        variant="body"
                        color="secondary"
                        className="text-[13px]"
                      >
                        Uploaded on{" "}
                        {formatSlashDate(documentItem.uploadAt) +
                          " " +
                          formatTime(documentItem.uploadAt)}
                      </Typography>
                    </div>
                  </div>
                ) : documentItem.file && !documentItem.isFile ? (
                  <div>
                    <div className="w-full flex justify-between">
                      <Typography
                        variant="body"
                        className="text-[13px] text-[#4C42D7] w-[95%] truncate "
                      >
                        {documentItem.file}
                      </Typography>
                      <img
                        src={DotsVertical}
                        alt="DotsVertical"
                        className="h-[20px] cursor-pointer"
                      />
                    </div>
                    <div className="w-full flex">
                      <Typography
                        variant="body"
                        color="secondary"
                        className="text-[13px]"
                      >
                        Uploaded on{" "}
                        {formatSlashDate(documentItem.uploadAt) +
                          " " +
                          formatTime(documentItem.uploadAt)}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      placeholder="Browse..."
                      className="h-[38px] w-[85%] border-gray-300 border-r-0"
                    ></input>
                    <label
                      htmlFor={"file_input_" + index.toString()}
                      className="bg-gray-100 h-[39px] px-4 pt-2"
                    >
                      <Typography variant="button2">Browse</Typography>
                    </label>
                    <input
                      id={"file_input_" + +index.toString()}
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => props.handleFileChange(e, index)}
                    />
                    <img
                      src={XMark}
                      alt="XMark"
                      className="cursor-pointer h-[15px] w-[15px] mt-[15px] ml-[10px]"
                      onClick={() => props.deleteDocLine(index)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      <div className="mt-6">
        <Button
          variant="outlined"
          size="small"
          className="py-1 h-[30px] border-[#F0F4FA]"
          onClick={() => props.addDocsLine()}
        >
          <Typography variant="button2" color="secondary">
            + Add Document
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Docs