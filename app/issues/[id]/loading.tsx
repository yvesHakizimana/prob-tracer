import {Box, Card, Flex, Heading} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailsPage = () =>  {
    return (
        <Box className='max-w-xl'>
            <Heading>
                <Skeleton />
            </Heading>
            <Flex gap='4' my='4'>
                <Skeleton width='10rem' />
                <Skeleton width='10rem' />
            </Flex>
            <Card className='prose' mt='4'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}


export default LoadingIssueDetailsPage