'use client'
import {Button, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller, FieldValues} from "react-hook-form"
import axios from "axios";
import {useRouter} from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}



const NewIssuePage = () => {
    const {register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    return (
        <form className='max-w-xl space-y-6'
              onSubmit={
            handleSubmit( async (data) => {
                await axios.post('/api/issues', data);
                router.push('/issues')
            })
        }>

            <TextField.Root placeholder='Title' {...register('title')}/>
            <Controller
                render={({ field}) =><SimpleMDE placeholder='Description' {...field}  /> }
                name='description'
                control={control}
            />
            <Button>Submit New Issue</Button>
        </form>
    )
}


export default NewIssuePage;