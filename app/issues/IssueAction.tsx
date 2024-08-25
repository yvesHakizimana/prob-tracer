import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

const IssueAction = () => {
    return (
        <Flex mb='4' justify='between'>
            <IssueStatusFilter />
            <Button>
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </Flex>
    )
}

export default IssueAction;