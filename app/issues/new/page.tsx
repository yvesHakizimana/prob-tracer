'use client'
import {Button, TextField, Callout, Spinner} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form"
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import {createIssueSchema} from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";


type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = async () => {
    const {register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const router = useRouter();
    const [error, setError] = useState<String>();
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try{
            setSubmitting(true)
            await axios.post('/api/issues', data);
            router.push('/issues')
        } catch(error){
            setSubmitting(false)
            setError('Unexpected thing happened.')
        }
    })

    return (
        <div className='max-w-xl'>
            { error &&
                <Callout.Root color='red' className='mb-4'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
            <form className='space-y-6'
                  onSubmit={onSubmit}>
                <TextField.Root placeholder='Title' {...register('title')}/>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    render={({field}) => <SimpleMDE placeholder='Description' {...field}  />}
                    name='description'
                    control={control}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>

    )
}


export default NewIssuePage;

function delay(arg0: number) {
    throw new Error("Function not implemented.");
}
