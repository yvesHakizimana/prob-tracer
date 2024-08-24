'use client'
import {Button, Flex, AlertDialog} from "@radix-ui/themes";
import {Cross1Icon} from "@radix-ui/react-icons";
import axios from "axios";
import {useRouter} from "next/navigation";

const DeleteIssueButton = ({issueId} : {issueId: number}) => {
    const router = useRouter()
    return (

        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    <Cross1Icon />
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure you want to delete this issue? This action cannot be undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={ async () => {
                            await axios.delete('/api/issues/' + issueId);
                            router.push('/issues')
                            router.refresh();
                        } }>
                            Delete this Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    )
}

export default DeleteIssueButton;