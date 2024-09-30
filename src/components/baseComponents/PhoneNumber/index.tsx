import { useState, ChangeEvent } from "react";
import validation from "@/shared/services/validation";

const PhoneNumber = () => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = validation.phoneNumberAutoFormat(e.target.value);
    setValue(targetValue);
  };

  return (
    <>
      <div>
        <input type="tel" value={value} onChange={onChange} maxLength={13} />
      </div>
      <div>{value}</div>
    </>
  );
};

export default PhoneNumber;
