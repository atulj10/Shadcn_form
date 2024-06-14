"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Tab1 from '@/components/Tab1'
import Tab2 from '@/components/Tab2'
import { Divider } from 'antd'
import { Toaster } from '@/components/ui/toaster'


const Form = () => {
    return (<>
    <Toaster/>
        <Divider style={{ fontSize: "50px", fontWeight: "200", color: "white", borderColor: "white" }}>Login Page</Divider>
        <div className='flex w-screen justify-center  p-11 mt-[1%] '>
            <Tabs defaultValue="creds" className="w-[40%]">
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='creds'>Credentials</TabsTrigger>
                    <TabsTrigger value='personal'>Personal</TabsTrigger>
                </TabsList>
                <TabsContent value='creds'>
                    <Tab1 header="Login Credentials" />
                </TabsContent>
                <TabsContent value='personal'>
                    <Tab2 header='Personal Information' />
                </TabsContent>
            </Tabs>
        </div>
    </>
    )
}

export default Form
