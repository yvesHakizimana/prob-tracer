'use client'
import {Button, Flex, AlertDialog, Spinner} from "@radix-ui/themes";
import {Cross1Icon} from "@radix-ui/react-icons";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";

const DeleteIssueButton = ({issueId} : {issueId: number}) => {
    const router = useRouter()
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            setDeleting(true);
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues')
            router.refresh();
        } catch (error) {
            setDeleting(false);
            setError(true);
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        <Cross1Icon />
                        {isDeleting ? 'Deleting issue...' : 'Delete Issue'} {isDeleting && <Spinner />}
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
                            <Button variant="solid" color="red" onClick={deleteIssue} disabled={isDeleting}>
                                Delete this issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        This issue could not be deleted.
                    </AlertDialog.Description>
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" mt='4' onClick={ () => {setError(false);} }>
                            OK
                        </Button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton;