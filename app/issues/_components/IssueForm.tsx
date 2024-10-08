'use client'
import {Button, TextField, Callout, Spinner} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor"
import {useForm, Controller} from "react-hook-form"
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import {IssueSchema} from "@/app/validationSchemas";
import { ErrorMessage } from "@/app/components";
import {Issue} from "@prisma/client";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm =  ({ issue }: {issue?: Issue}) => {
    const {register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema),
    });
    const router = useRouter();
    const [error, setError] = useState<String>();
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try{
            setSubmitting(true)
            if(issue)
                await axios.patch('/api/issues/' + issue.id, data)
            else
                await axios.post('/api/issues', data);
            router.push('/issues')
            router.refresh();
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
                <TextField.Root
                    placeholder='Title' {...register('title')}
                    defaultValue={issue?.title}
                />
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    render={({field}) => <SimpleMDE placeholder='Description' {...field}  />}
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}


export default IssueForm;

