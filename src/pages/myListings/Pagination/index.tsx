import { useState, useEffect, memo } from "react";
import { usePaginationPages } from "./usePaginationPages";
import { Button } from "@/components/baseComponents/Button";
import Typography from "@/components/baseComponents/Typography";
import Select from "@/components/baseComponents/Select";

const Pagination = ({
    gotoPage,
    length,
    pageSize,
    setPageSize
}: {
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
    length: number;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
}) => {
    const [perPage, setPerPage] = useState(pageSize);

    const {
        canGo,
        currentPage,
        pages,
        goTo,
        goNext,
        goPrev
    } = usePaginationPages({
        gotoPage,
        length,
        pageSize
    });

    useEffect(() => {
        setPageSize(perPage);
    }, [perPage, setPageSize]);

    return (
        <div className="flex items-center gap-5 py-3">
            <Button
                variant="text"
                onClick={goPrev}
                disabled={!canGo.previous}
            >
                <Typography className="medium-text">Previous</Typography>
            </Button>
            {pages.map((page, i) => (
                <Button
                    variant="text"
                    onClick={() => goTo(page)}
                    key={i}
                    className={`rounded-full !p-1 !py-1 !h-6 w-6 ` + (currentPage === page ? `bg-button-primary text-white` : `hover:bg-gray-200`)}
                >
                    <Typography className="medium-text">{page}</Typography>
                </Button>
            ))}
            <Button
                variant="text"
                onClick={goNext}
                disabled={!canGo.next}
            >
                <Typography className="medium-text">Next</Typography>
            </Button>
            <Select
                isSearchable={false}
                options={[
                    { value: 1, label: '1' },
                    { value: 10, label: '10' },
                    { value: 30, label: '30' },
                    { value: 50, label: '50' },
                ]}
                value={{
                    value: perPage,
                    label: perPage
                }}
                onChange={(option: any) => {
                    setPerPage(option.value)
                }}
            />
        </div>
    );
};

export default memo(Pagination);
