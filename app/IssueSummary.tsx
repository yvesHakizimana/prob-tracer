import {Status} from "@prisma/client";
import {Card, Flex, Text, Heading} from "@radix-ui/themes";
import Link from "next/link";

interface Props {
    open: number,
    in_progress: number
    closed: number,
}


const IssueSummary = ({open, in_progress, closed} : Props) => {
    const statuses : {
        label: string;
        value: number;
        status: Status
    }[] = [
        {label: 'Open Issues', value: open, status: 'OPEN' },
        {label: 'In-progress Issues', value: in_progress, status: "IN_PROGRESS" },
        {label: 'Closed Issues', value: closed, status: 'CLOSED' },
    ]

    return (
        <Flex gap='4'>
            {statuses.map(status => (
                <Card key={status.status}>
                    <Flex direction='column'>
                        <Link className='text-sm font-medium' href={`/issues?status=${status.status}`}>{status.label}</Link>
                        <Text size='4' className='font-bold'>{status.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary;
