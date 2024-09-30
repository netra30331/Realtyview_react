import { Fragment, useState } from 'react';
import classNames from 'classnames';
// @headlessui
import { Combobox, Transition } from '@headlessui/react';
// icon
import Icon from '../IconWrapper';
// components
import TextField from '../TextField';
import Typography from '../Typography';
import { Button } from '../Button';
// utils
import { splitTextByQuery } from '@/shared/services/utils';

// ----------------------------------------------------------------------
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterKey: string;
  value: any;
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  onAllChange: (value: any) => void;
  onClear?: VoidFunction;
};

const AutoComplete = ({
  options = [],
  filterKey,
  value,
  placeholder,
  className,
  onChange,
  onAllChange,
  onClear,
}: Props) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
        option[filterKey]
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  const changeInput = (value: any) => {
    console.log(value)
    setQuery(value)
    onChange(value)
  }

  const changeValue = (value: any) => {
    let temp = options.filter((option: any) => value.toLowerCase() === option[filterKey].toLowerCase())[0]
    setQuery(value)
    onAllChange(temp)
  }

  return (
    <div className={classNames(className, 'relative')}>
      <Combobox value={value} onChange={(e) => changeValue(e)}>
        {({ open }) => (
          <div className="relative">
            <Combobox.Input
              as={TextField}
              startAdornment={<Icon name="search" />}
              inputClassName="aria-expanded:rounded-b-none"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              displayValue={value}
              onChange={(event) => changeInput(event.target.value)}
              placeholder={placeholder}
              autoComplete="on"
              {...(open
                ? {
                  endAdornment: (
                    <Button variant="icon" color="inherit" onClick={onClear}>
                      <Icon name="close" />
                    </Button>
                  ),
                }
                : null)}
            />

            <Transition
              as={Fragment}
              leave="transition-all ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute z-10 w-full py-2 overflow-auto transition-opacity bg-white max-h-60 rounded-b-5 border-1 border-netural-dark border-t-netural">
                {filteredOptions.length === 0 && query !== '' ? (
                  <Typography variant="body" className="px-4">
                    Your Brokerage was not found. Continue typing to add your company.
                  </Typography>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option._id}
                      className={({ active }) =>
                        classNames(
                          'relative flex cursor-default select-none py-2 px-4 pr-4 hover:bg-neutral-100 flex items-end',
                          {
                            ['bg-netural']: active,
                          }
                        )
                      }
                      value={option[filterKey]}
                      onClick={() => changeValue(option[filterKey])}
                    >
                      <Typography
                        variant="body"
                        className="whitespace-pre"
                        color="secondary"
                      >
                        {splitTextByQuery(option[filterKey], query)[0]}
                      </Typography>
                      <Typography
                        variant="body"
                        className="block truncate whitespace-pre"
                      >
                        {splitTextByQuery(option[filterKey], query)[1]}
                      </Typography>
                      <Typography
                        variant="body"
                        className="whitespace-pre"
                        color="secondary"
                      >
                        {splitTextByQuery(option[filterKey], query)[2]}
                      </Typography>
                      <Typography variant='caption' color='secondary' className='ml-3 whitespace-nowrap'>
                        {option['businessAddress1'] + ' ' + option['businessAddress2'] + ' ' + option['businessCity'] + ',' + ' ' + option['businessState'] + ' ' + option['businessZip']}
                      </Typography>
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default AutoComplete;
