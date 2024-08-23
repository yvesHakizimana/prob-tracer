import {TextArea, TextField} from "@radix-ui/themes";

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-6'>
            <TextField.Root placeholder='Title'>
            </TextField.Root>
            <TextArea placeholder="Description" />
        </div>
    )
}

export default NewIssuePage;