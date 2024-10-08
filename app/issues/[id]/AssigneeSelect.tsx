'use client'
import {Avatar, Select} from "@radix-ui/themes";
import {Issue, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import toast , {Toaster}  from "react-hot-toast";

const AssigneeSelect = ({issue} : { issue: Issue}) => {
    const {data: users, error, isLoading} = useUsers();

    if(error) return null;

    if(isLoading) return <Skeleton />

    const assignIssue = (userId: string) => {
        console.log(userId)
        axios
            .patch('/api/issues/' + issue.id, { assignedToUserId : userId || null })
            .catch(() => toast.error("Changes could not be made."))
    }

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "."}
                onValueChange={assignIssue}>
                <Select.Trigger placeholder='Assign....'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value=".">Unassigned</Select.Item>
                        {users?.map(user =>
                            <Select.Item
                                key={user.id}
                                value={user.id}
                            >
                                <Avatar
                                    fallback='?'
                                    src={user.image!}
                                    size='1'
                                    radius='full'
                                    className='mr-3'
                                />
                                {user.name}
                            </Select.Item>)}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 7
})

export default AssigneeSelect