// pages/index.tsx
"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tab1 from "@/components/Tab1";
import Tab2 from "@/components/Tab2";
import { Divider } from "antd";
import { Toaster } from "@/components/ui/toaster";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const tab1Schema = z.object({
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(2, "Username should be greater than 2 letters").max(50, "Username should be less than 50 characters"),
    password: z.string().min(8, "Password should be at least 8 characters long")
        .regex(new RegExp('.*[A-Z].*'), "Must have at least one uppercase letter")
        .regex(new RegExp('.*[a-z].*'), "Must have at least one lowercase letter")
        .regex(new RegExp('.*[0-9].*'), "Must contain at least one number")
        .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), "Must contain at least one special character"),
    confirmPassword: z.string({
        required_error: "confirmation is required"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const tab2Schema = z.object({
    gender: z.string().nonempty("Choose a gender"),
    age: z.number().gte(5, { message: "Your age should be greater than 5" }),
    bio: z.string().min(20, "Comment should be at least 20 characters").max(200, "Comment should not exceed 200 characters"),
    agree: z.boolean(),
    position: z.string().nonempty("Preferred position is required"),
});

const combinedSchema = z.object({
    tab1: tab1Schema,
    tab2: tab2Schema,
});

export type CombinedFormValues = z.infer<typeof combinedSchema>;

const Form: React.FC = () => {
    const { toast } = useToast();
    const [tab, setTab] = useState<string>("creds");

    const formMethods = useForm<CombinedFormValues>({
        resolver: zodResolver(combinedSchema),
        defaultValues: {
            tab1: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            tab2: {
                gender: "",
                age: 0,
                bio: "",
                agree: true,
                position: "",
            },
        },
    });

    function handleSubmit(values: CombinedFormValues) {
        console.log(values);
        toast({
            title: "Message",
            description: "Form submitted successfully",
        });
    }

    function handleInvalid(errors: any) {
        toast({
            title: "Validation Error",
            description: `${(errors.tab1 & errors.tab2) ?
                "Please fill all the information correctly" :
                errors.tab1 ?
                    "Please fill all the login credentials correctly" :
                    "Please fill all the personal information correctly"}`,
        });

        if (errors.tab2) {
            setTab("personal");
        }
        else {
            setTab("creds");
        }

        console.log(errors);

    }

    function tabChange(value: string) {
        setTab(value);
    }

    return (
        <>
            <Toaster />
            <Divider style={{ fontSize: "50px", fontWeight: "200", color: "white", borderColor: "white" }}>Login Page</Divider>
            <div className="flex w-screen justify-center p-11 mt-[1%]">
                <Tabs value={tab} defaultValue="creds" className="w-[40%]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="creds">Credentials</TabsTrigger>
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="creds">
                        <Tab1 formMethods={formMethods} header="Login Credentials" tabChange={tabChange} />
                    </TabsContent>
                    <TabsContent value="personal">
                        <Tab2 formMethods={formMethods} header="Personal Information" handleSubmit={handleSubmit} handleInvalid={handleInvalid} tabChange={tabChange} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default Form;
