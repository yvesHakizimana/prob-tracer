'use client'
import {Select} from "@radix-ui/themes";
import {Status} from "@prisma/client";

const statuses : {label: string, value?: Status }[] = [
    { label: 'All'},
    { label: 'Open', value: "OPEN"},
    { label: 'In progress', value: "IN_PROGRESS"},
    { label: 'Closed', value: "CLOSED"},
]

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by status...'/>
            <Select.Content>
                {statuses.map(status =>
                    <Select.Item value={status.value || ' '} key={status.label}>{status.label}</Select.Item>
                )}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter;