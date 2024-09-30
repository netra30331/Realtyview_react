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

// ----------------------------------------------------------------------
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterKey: string;
  value: any;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled? : boolean;
  type?: string
  onChange: (value: any) => void;
  onAllChange: (value: any) => void;
  onClear?: VoidFunction;
  onDelete?: VoidFunction;
};

const AddressAutoComplete = ({
  options = [],
  filterKey,
  value,
  placeholder,
  className,
  inputClassName,
  disabled = false,
  type,
  onChange,
  onAllChange,
  onClear,
  onDelete,
}: Props) => {
  const [query, setQuery] = useState('');

  // const filteredOptions =
  //   query === ''
  //     ? options
  //     : options.filter((option) =>
  //       option[filterKey]
  //         .toLowerCase()
  //         .replace(/\s+/g, '')
  //         .includes(query.toLowerCase().replace(/\s+/g, ''))
  //     );

  const changeInput = (value: any) => {
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
      <Combobox disabled={disabled} value={value} onChange={(e) => changeValue(e)}>
        {({ open }) => (
          <div className="relative">
            <Combobox.Input
              as={TextField}
              //startAdornment={<Icon name="search" />}
              inputClassName={"aria-expanded:rounded-b-none " + inputClassName + (className?.includes('bg-white') ? ' bg-white' : '')}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              displayValue={value}
              onChange={(event) => changeInput(event.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              {...(open
                ? {
                  endAdornment: (
                    <Button variant="icon" color="inherit" onClick={onClear}>
                      <Icon name="close" />
                    </Button>
                  ),
                }
                : type === 'customize' ? {
                  endAdornment: (
                    <Button variant="icon" color="inherit" onClick={onDelete}>
                      <Icon name="close" />
                    </Button>
                  ),
                }:
                null)
              }
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
                {options.length === 0 && query !== '' ? (
                  <Typography variant="body" className="px-4">
                    Nothing found.
                  </Typography>
                ) : (
                  options.map((option, index) => (
                    <Combobox.Option
                      key={index}
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
                       {option.streetLine+' '+option.city+', '+option.state+' '+option.zipcode+' '+option.secondary}
                      </Typography>
                      {/* <Typography
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
                        
                      </Typography> */}
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

export default AddressAutoComplete;
