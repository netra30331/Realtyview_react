import { myBucket } from '@/shared/services/s3Bucket'


/**
 * Returns 3 string array items by search result, 2nd item is for quried data
 * @param text
 * @param query 
 * @returns `[string, string, string]`
 */
export const splitTextByQuery = (
  text: string,
  query: string
): [string, string, string] => {
  const start_index = text.toLowerCase().search(query.toLowerCase());
  const end_index = start_index + query.length;

  if (start_index < 0) {
    return [text, "", ""];
  }

  return [
    text.substring(0, start_index),
    text.substring(start_index, end_index),
    text.substring(end_index),
  ];
};

export const fileUpload = async (file: any, directoryName: string) => {
  if (file === "") return;
  const timestamp = new Date().getTime();
  const newFile = new File([file], timestamp + "_" + file.name);
  const fileParams: any = {
    ACL: "public-read",
    Body: newFile,
    Bucket: import.meta.env.VITE_BUCKET_NAME,
    Key: directoryName + "/" + newFile.name,
  };

  const data = await myBucket.upload(fileParams).promise();
  return data.Location;
};