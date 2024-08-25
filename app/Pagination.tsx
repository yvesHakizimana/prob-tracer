'use client'
import {Flex, Text, Button} from "@radix-ui/themes";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons";

interface Props {
    itemsCount: number;
    currentPage: number;
    pageSize: number;
}

const Pagination = ({itemsCount, currentPage,  pageSize} : Props) => {
    const pageCount = Math.ceil(itemsCount/ pageSize);
    if(pageCount <= 1) return null;
    return (
        <Flex align='center' gap='3'>
            <Text> {currentPage} of {pageCount}</Text>
            <Button disabled={currentPage === 1} color='gray' variant='soft'>
                <DoubleArrowLeftIcon />
            </Button>
            <Button disabled={currentPage === 1} color='gray' variant='soft'>
                <ChevronLeftIcon />
            </Button>
            <Button disabled={currentPage === pageCount} color='gray' variant='soft'>
                <DoubleArrowRightIcon />
            </Button>
            <Button disabled={currentPage === pageCount} color='gray' variant='soft'>
                <ChevronRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination;