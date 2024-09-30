import { SyntheticEvent, useState } from 'react';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { format } from 'date-fns';
import classNames from 'classnames';
// components
import TextField from '../TextField';
import { Button } from '../Button';
import Icon from '../IconWrapper';

// ----------------------------------------------------------------------
type Props = {
  className?: string;
  value?: Date | null;
  placeholder?: string;
  format?: string;
  name?: string;
  onChange?: (
    date: Date | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: SyntheticEvent<any, Event> | undefined
  ) => void;
};

const DatePicker = ({
  className,
  value,
  placeholder,
  format = 'MM-dd-yyyy',
  name,
  onChange,
}: Props) => {
  const [inValue, setInValue] = useState<Date | null>(null);

  return (
    <>
      <ReactDatePicker
        wrapperClassName={classNames('w-full', className)}
        selected={value ?? inValue}
        onChange={onChange ? onChange : (date) => setInValue(date)}
        customInput={<TextField endAdornment={<Icon name="calendar" />} />}
        showPopperArrow={false}
        autoComplete="off"
        todayButton="Today"
        renderCustomHeader={CustomDatePickerHeader}
        formatWeekDay={(day) => day.substring(0, 3)}
        placeholderText={placeholder ?? format.toLowerCase()}
        dateFormat={format}
        name={name ?? 'datapicker'}
        preventOpenOnFocus
      ></ReactDatePicker>
    </>
  );
};

const CustomDatePickerHeader = ({
  date,
  decreaseMonth,
  decreaseYear,
  increaseMonth,
  increaseYear,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <div className="flex items-center gap-1 pb-2">
      <Button variant="icon" color="inherit" className="w-6 h-6" onClick={decreaseYear}>
        <Icon name="arrow-backward-multiple" />
      </Button>
      <Button variant="icon" color="inherit" className="w-6 h-6" onClick={decreaseMonth}>
        <Icon name="arrow-backward" />
      </Button>

      <div className="flex-1" />

      <div className="current-date-label">{format(date, 'MMMM, yyyy')}</div>

      <div className="flex-1" />

      <Button variant="icon" color="inherit" className="w-6 h-6" onClick={increaseMonth}>
        <Icon name="arrow-forward" />
      </Button>
      <Button variant="icon" color="inherit" className="w-6 h-6" onClick={increaseYear}>
        <Icon name="arrow-forward-multiple" />
      </Button>
    </div>
  );
};

export default DatePicker;
