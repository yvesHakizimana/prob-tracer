'use client'
import {Button, TextField, Callout, Text} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form"
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import {createIssueSchema} from "@/app/validationSchemas";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const {register, control, handleSubmit, formState: { errors} } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const router = useRouter();
    const [error, setError] = useState<String>();


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
                  onSubmit={
                      handleSubmit(async (data) => {
                          try{
                              await axios.post('/api/issues', data);
                              router.push('/issues')
                          } catch(error){
                              console.log(error)
                              setError('Unexpected thing happened.')
                          }

                      })
                  }>

                <TextField.Root placeholder='Title' {...register('title')}/>
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    render={({field}) => <SimpleMDE placeholder='Description' {...field}  />}
                    name='description'
                    control={control}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>

    )
}


export default NewIssuePage;