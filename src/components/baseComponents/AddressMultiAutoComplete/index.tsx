import { ActionMeta } from 'react-select'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { getAddresses, fetchAddressAutocomplete } from '@/redux/user/userSlice'
import Select from "@/components/baseComponents/Select"

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterKeys: Array<string>;
  options?: Array<{ value: any; label: string }>;
  className?: string;
  value?: any;
  isMulti?: boolean;
  placeholder?: string;
  isSearchable?:boolean;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any, actionMeta: ActionMeta<any>) => void;
  onInputChange?: (inputValue: string) => void;
};

const AddressMultiAutoComplete = ({
  className,
  value,
  filterKeys = ['streetLine'],
  isMulti,
  placeholder = '',
  onChange,
}: Props) => {
  const dispatch = useAppDispatch()
  const addresses = useAppSelector(getAddresses)

  const onChangeAreaInput = (value: string) => {
    if (value !== '') {
        dispatch(fetchAddressAutocomplete({ address: value }))
    }
  }
  
  return (
    <Select
      options={addresses.map((area: any) => {
          var areaString = '' // (area.streetLine ?? '') + ' ' + (area.city ?? '') + ', ' + (area.state ?? '') + ' ' + (area.zipcode ?? '') + ' ' + (area.secondary ?? '')
          filterKeys?.map(filterKey => {
            if (area[filterKey] !== '') {
              areaString += area[filterKey] + ', '
            }
            return filterKey;  
          })
          if (areaString.length > 0) {
            areaString = areaString.substring(0, areaString.length - 2);
          }
          return {
              value: areaString,
              label: areaString,
          }
      })}
      isMulti={isMulti}
      value={value}
      placeholder={placeholder}
      className={className}
      onInputChange={onChangeAreaInput}
      onChange={onChange}
    />
  );
};

export default AddressMultiAutoComplete;
