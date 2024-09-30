import React, { useRef, useState } from 'react'
import Typography from '../Typography'
import Pagination from '@/components/baseComponents/Pagination'
import { MdMoreVert } from 'react-icons/md'
import { Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import TableEmptyState from '../TableEmptyState/index.tsx';
import { MyListingStatusMenu } from "../Menu/index.tsx";

type IProps = {
  class_name: string;
  data: Array<any>;
  fields: Array<any>;
  onClickRow: Function;
  totalPage: number;
  currentPage: number;
  recordsPerpage: number;
  onSetPage: Function;
  totalCount: number;
  editRow?: Function;
  deleteRow?: Function;
  rescheduleRow?: Function;
  changeFavorite?: Function;
  convertToClient?: Function;
  emptyStateProps?: {
    attachment?: any;
    attachmentCondition?: boolean;
    heading: string;
    content: string;
    buttonText?: string;
    onButtonClick?: Function;
    drawer?: any;
  };
  setStatus?: Function;
  minCellWidth: number;
};

const AdvancedTable = ({
  class_name,
  data,
  fields,
  onClickRow,
  totalPage,
  currentPage,
  recordsPerpage,
  onSetPage,
  totalCount,
  editRow,
  deleteRow,
  rescheduleRow,
  changeFavorite,
  emptyStateProps,
  setStatus,
  minCellWidth,
}: IProps) => {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [activeFavoritePanel, setActiveFovoritePanel] = useState<any | null>(
    null
  );

  const createHeaders = (fields: any) => {
    return fields.map((item: any) => ({
      ...item,
      ref: React.useRef()
    }));
  };
  const columns = createHeaders(fields);
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const tableElement = useRef<any>(null);

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };

  const mouseMove = React.useCallback(
    (e: any) => {
      const gridColumns = columns.map((col: any, index: number) => {
        if (index === activeIndex) {
          const width = e.clientX - col.ref.current.offsetLeft;

          if (col.type === 'favoriteAction' || col.type === 'favoriteAction' || width >= minCellWidth) {
            return `${width}px`;
          }
        }
        return `${col.ref.current.offsetWidth}px`;
      });

      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        " "
      )}`;
    },
    [activeIndex, columns, minCellWidth]
  );

  const removeListeners = React.useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = React.useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  const toggleAll = () => {
    setChecked(true);
  };

  const clickAction = (row_data: any, action_name: string) => {
    if (action_name == "Edit") {
      if (editRow) {
        editRow(row_data);
      }
    }
    if (action_name == "Archive") {
      if (deleteRow) {
        deleteRow(row_data);
      }
    }

    if (action_name == "Reschedule") {
      if (rescheduleRow) {
        rescheduleRow(row_data);
      }
    }
  };

  const onChangeFavoriteStatus = (agentId: string, action_name: string) => {
    handleFavoritePanelClose();
    if (changeFavorite && agentId !== "" && action_name !== "") {
      changeFavorite(agentId, action_name);
    }
  };

  const handleFavoritePanelClose = () => {
    setActiveFovoritePanel(null);
  };

  React.useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-230px)] max-w-[calc(100vw-280px)] bg-white rounded-md p-8 pb-0">
      {data && data.length > 0 ? (
        <>
          <div className="flow-root w-full">
            <div className="-my-2 w-full">
              <div className="inline-block w-full align-middle">
                <table ref={tableElement} className={'advanced-table ' + class_name}>
                  <thead>
                    <tr className="border-b">
                      {columns.map((field_item: any, field_index: number) => {
                        return (
                          <th
                            ref={field_item.ref}
                            scope="col"
                            className={field_item.class_name + ' relative'}
                            key={field_index}
                          >
                            {field_item.type == "checkbox" ? (
                              <>
                                <input
                                  type="checkbox"
                                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  ref={checkbox as any}
                                  checked={checked}
                                  onChange={toggleAll}
                                />
                              </>
                            ) : (
                              <Typography variant="table-headers" className="truncate">{field_item.name}</Typography>
                            )}

                            <div
                              onMouseDown={() => mouseDown(field_index)}
                              className={`resize-handle min-h-full ${activeIndex === field_index ? "active" : "idle"
                                }`}
                            />
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data.map((datarow, index) => {
                      return (
                        <tr
                          key={index}
                          className="cursor-pointer group"
                        >
                          {fields.map((field_item: any, field_index) => {
                            return (
                              <td
                                className={
                                  field_item.slug +
                                  ' h-full group-hover:bg-gray-200 flex items-center ' + 
                                  (field_item.type === 'action' ?
                                    ' justify-end' :
                                    ''
                                  ) +
                                  (class_name.includes("custom-table")
                                    ? field_item.class_name
                                    : "")
                                }
                                key={field_index}
                                onClick={() =>
                                  field_item.type !== "action" &&
                                  field_item.type !== "status_menu" &&
                                  field_item.type !== "favoriteAction" &&
                                  onClickRow(datarow)
                                }
                              >
                                {field_item.type == "image" && (
                                  <img
                                    width="150px"
                                    src={datarow[field_item.slug]}
                                    className="rounded-md aspect-square"
                                  />
                                )}
                                {field_item.type == "status_menu" &&
                                  setStatus && (
                                    <MyListingStatusMenu
                                      datarow={datarow}
                                      item={field_item}
                                      setStatus={setStatus}
                                    />
                                  )}
                                {field_item.type == "icon" && (
                                  <>{datarow[field_item.slug]}</>
                                )}
                                {field_item.type == "custom_image" && (
                                  <img
                                    src={datarow[field_item.slug]}
                                    className={
                                      "rounded-md " + field_item.image_size
                                    }
                                  />
                                )}
                                {field_item.type == "text" && (
                                  <Typography
                                    variant="table-row-content"
                                    color="primary"
                                    className="truncate"
                                  >
                                    {datarow[field_item.slug]}
                                  </Typography>
                                )}
                                {field_item.type === "favoriteAction" && (
                                  <>
                                    <div className="text-right flex items-center relative">
                                      <Popover as="div" className="">
                                        <Popover.Button
                                          onClick={() =>
                                            setActiveFovoritePanel(index)
                                          }
                                          className="flex items-center justify-center"
                                        >
                                          <img
                                            src={datarow.iconStar}
                                            className="w-[1rem] h-[1rem] max-w-none"
                                          />
                                        </Popover.Button>
                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <div>
                                            {activeFavoritePanel === index && (
                                              <Popover.Panel className="z-50 absolute left-[1.3rem] top-0 w-[8rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {datarow[field_item.slug]?.map(
                                                  (
                                                    action_item: any,
                                                    action_item_index: any
                                                  ) => {
                                                    return (
                                                      <div
                                                        key={action_item_index}
                                                        className="cursor-pointer flex hover:bg-neutral-100 rounded-md px-3 py-1"
                                                        onClick={() =>
                                                          onChangeFavoriteStatus(
                                                            datarow.id,
                                                            action_item.name
                                                          )
                                                        }
                                                      >
                                                        {action_item.image}
                                                        <Typography
                                                          className={`mr-2 ml-2 text-[${action_item.color}]`}
                                                          variant="caption"
                                                          color="primary"
                                                        >
                                                          {action_item.name}
                                                        </Typography>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </Popover.Panel>
                                            )}
                                          </div>
                                        </Transition>
                                      </Popover>
                                    </div>
                                  </>
                                )}
                                {field_item.type == "action" && (
                                  <>
                                    <div className="text-right flex justify-end items-center">
                                      <Popover as="div" className="relative">
                                        <Popover.Button className="flex items-center justify-center disabled:text-gray-400">
                                          <MdMoreVert hidden={datarow[field_item.slug]?.filter((item: any) => item.hidden === false || item.hidden === undefined).length === 0} />
                                        </Popover.Button>
                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <Popover.Panel className="z-50 absolute right-[1.3rem] top-0 w-[6rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {datarow[field_item.slug]?.filter((item: any) => !item.hidden).map(
                                              (
                                                action_item: any,
                                                action_item_index: any
                                              ) => {
                                                return (
                                                  <div
                                                    key={action_item_index}
                                                    className="cursor-pointer flex hover:bg-neutral-100 rounded-md px-3 py-1"
                                                    onClick={() =>
                                                      clickAction(
                                                        datarow,
                                                        action_item.name
                                                      )
                                                    }
                                                  >
                                                    <Typography
                                                      className={`mr-2 text-[${action_item.color}]`}
                                                      variant="caption"
                                                      color="primary"
                                                    >
                                                      {action_item.name}
                                                    </Typography>
                                                    {action_item.icon}
                                                  </div>
                                                );
                                              }
                                            )}
                                          </Popover.Panel>
                                        </Transition>
                                      </Popover>
                                    </div>
                                  </>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-3">
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full mt-3 py-3">
              <Typography
                variant="medium-text"
                color="secondary"
                className="md:block hidden"
              >
                Showing{" "}
                {totalCount > 0 ? (currentPage - 1) * recordsPerpage + 1 : 0} to{" "}
                {totalCount >= currentPage * recordsPerpage
                  ? currentPage * recordsPerpage
                  : totalCount}{" "}
                of {totalCount} results
              </Typography>
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                onSetPage={onSetPage}
                loadingData={false}
              />
            </nav>
          </div>
        </>
      ) : (
        emptyStateProps &&
        (emptyStateProps.attachment && !emptyStateProps.attachmentCondition ? (
          emptyStateProps.attachment
        ) : (
          <>
            {emptyStateProps.drawer}
            <TableEmptyState
              heading={emptyStateProps.heading}
              content={emptyStateProps.content}
              buttonText={emptyStateProps.buttonText}
              onButtonClick={emptyStateProps.onButtonClick}
            />
          </>
        ))
      )}
    </div>
  );
};

export default AdvancedTable