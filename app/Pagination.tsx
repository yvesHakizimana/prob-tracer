'use client'
import {Flex, Text, Button} from "@radix-ui/themes";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import {useRouter, useSearchParams} from "next/navigation";


interface Props {
    itemsCount: number;
    currentPage: number;
    pageSize: number;
}

const Pagination = ({itemsCount, currentPage,  pageSize} : Props) => {
    const changePage = (page: number) => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    const router = useRouter();
    const searchParams = useSearchParams();
    const pageCount = Math.ceil(itemsCount/ pageSize);
    if(pageCount <= 1) return null;
    return (
        <Flex align='center' gap='3'>
            <Text> {currentPage} of {pageCount}</Text>
            <Button
                disabled={currentPage === 1}
                color='gray'
                variant='soft'
                onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                disabled={currentPage === 1}
                color='gray'
                variant='soft'
                onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>

            <Button
                disabled={currentPage === pageCount}
                color='gray'
                variant='soft'
                onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>
            <Button disabled={currentPage === pageCount}
                    color='gray'
                    variant='soft'
                    onClick={() => changePage(pageCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}



export default Pagination;