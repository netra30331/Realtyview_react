import ReactSelect, { ActionMeta } from 'react-select';
import classNames from 'classnames';
import Icon from '../IconWrapper';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
// ----------------------------------------------------------------------
type Props = {
  className?: string;
  options: Array<{ value: any; label: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  isMulti?: boolean;
  placeholder?: string;
  isSearchable?:boolean;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any, actionMeta: ActionMeta<any>) => void;
  onInputChange?: (inputValue: string) => void;
};

const Select = ({
  className,
  options,
  value,
  isMulti,
  isSearchable,
  placeholder = '',
  name,
  onChange,
  onInputChange,
  ...other
}: Props) => {
  
  return (
    <ReactSelect
      options={options}
      value={value}
      onChange={onChange}
      onInputChange={onInputChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
      placeholder={placeholder}
      name={name}
      menuPlacement='auto'
      classNames={{
        control: ({ menuIsOpen }) =>
          classNames(
            className,
            '!min-h-10 !font-arial !bg-netural rounded-5 !shadow-none !border-1 !cursor-text',
            {
              ['!border-transparent']: !menuIsOpen,
              ['!border-netural-dark']: menuIsOpen,
            }
          ),
        singleValue: () => '!body !text-primary !font-arial',
        valueContainer: () => '!px-4 !font-arial',
        placeholder: () => '!caption !text-secondary !font-arial',
        option: (state) =>
          classNames(
            '!font-arial !text-13 !leading-18 !font-medium !text-primary !px-4 !cursor-pointer',
            {
              ['!bg-neutral-100']: state.isFocused,
              ['!bg-netural']: state.isSelected,
            }
          ),
        menu: () => '!border-none !outline-none !py-1 !shadow-md !mt-1',
        indicatorSeparator: () => 'hidden',
        indicatorsContainer: () => 'pr-2',
        multiValue: () => '!bg-white !rounded-3 !m-0 !mr-1',
        multiValueLabel: () => '!caption !text-primary',
        multiValueRemove: () => 'hover:!bg-red-100 hover:!text-red-500',
        input: () => '!body !text-primary',
      }}
      components={{
        DropdownIndicator: () => isSearchable?<Icon name="arrow-top-bottom" />:<MdOutlineKeyboardArrowDown />,
      }}
      {...other}
    />
  );
};

export default Select;
