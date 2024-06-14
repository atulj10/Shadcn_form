import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { z } from 'zod'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useToast } from './ui/use-toast'

const Tab2 = ({ header }: { header: string }) => {
    
    const { toast } = useToast()

    const tab2Shchema = z.object({
        gender: z.string({
            required_error: "Choose a gender"
        }),
        age: z.number().gte(5, { message: "Your age should be greater than 5" }),
        bio: z.string({
            required_error: "Comment is required"
        }).min(20, "Comment should be of atleast 20 words").max(200, "Comment should not exceed 200 words"),
        agree: z.boolean(),
        position: z.string({
            required_error: "Preferred position is requried."
        })
    })

    const form = useForm<z.infer<typeof tab2Shchema>>({
        resolver: zodResolver(tab2Shchema),
        defaultValues: {
            gender: "",
            age: 0,
            bio: "",
            agree: true,
            position: ""
        },
    })

    function onSubmit(values: z.infer<typeof tab2Shchema>) {

        console.log(values)

        toast({
            title: "Message",
            description: "Personnale Information added Successfully"
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle> {header}</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <CardContent className='py-1 pb-4 px-8'>
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Choose your Gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="male" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Male
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="female" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    female
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="none" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Prefer not to say!</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem className='mt-4'>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Please enter your age" {...field} onChange={event => field.onChange(+event.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem className='mt-4'>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="agree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                                    <div className="space-y-0.5 ">
                                        <FormLabel className="text-base">
                                            Terms & Conditions
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem className='mt-4'>
                                    <FormLabel>Preferred Position</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a preferred postion... " />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="frontend">Front-end Developer</SelectItem>
                                            <SelectItem value="backend">Backend Developer</SelectItem>
                                            <SelectItem value="fullstack">FullStack Developer</SelectItem>
                                        </SelectContent>
                                    </Select>
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

export default Tab2
