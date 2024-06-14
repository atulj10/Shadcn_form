import React from 'react'
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast, useToast } from './ui/use-toast';

const Tab1 = ({ header }: { header: string }) => {

    const { toast } = useToast()

    const tab1Shchema = z.object({
        email: z.string().
            email("Please enter a valid email"),
        username: z.string().
            min(2, "Username should be greater than 2 letter").
            max(50, "Username should be less than 50 words"),
        password: z.string().min(8, "Password should be greater than 8 digits.").
            regex(new RegExp('.*[A-Z].*'), "Must have alteast one Uppercase letter").
            regex(new RegExp('.*[a-z].*'), "Must have alteast one Lowercase letter").
            regex(new RegExp('.*[0-9].*'), "Must contain alteast one number").
            regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), "Must contain alteast one special character"),
    })

    const form = useForm<z.infer<typeof tab1Shchema>>({
        resolver: zodResolver(tab1Shchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof tab1Shchema>) {

        console.log(values)
        toast({
            title: "Message",
            description: "Credentials Logged in Successfully"
        })

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle> {header}</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent className='py-4 px-8'>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Please enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Please enter your Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Please enter a password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}

export default Tab1
