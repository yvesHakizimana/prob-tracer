'use client'
import {Button, TextField, Callout} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller, FieldValues} from "react-hook-form"
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const {register, control, handleSubmit } = useForm<IssueForm>();
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
                              setError('Unexpected thing happened.')
                          }

                      })
                  }>

                <TextField.Root placeholder='Title' {...register('title')}/>
                <Controller
                    render={({field}) => <SimpleMDE placeholder='Description' {...field}  />}
                    name='description'
                    control={control}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>

    )
}


export default NewIssuePage;