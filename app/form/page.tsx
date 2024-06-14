// pages/index.tsx
"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tab1 from "@/components/Tab1";
import Tab2 from "@/components/Tab2";
import { Divider } from "antd";
import { Toaster } from "@/components/ui/toaster";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
});

const tab2Schema = z.object({
    gender: z.string().nonempty("Choose a gender"),
    age: z.number().gte(5, { message: "Your age should be greater than 5" }),
    bio: z.string().min(20, "Comment should be at least 20 characters").max(200, "Comment should not exceed 200 characters"),
    agree: z.boolean(),
    position: z.string().nonempty("Preferred position is required"),
});

export type Tab1FormValues = z.infer<typeof tab1Schema>;
export type Tab2FormValues = z.infer<typeof tab2Schema>;

const Form: React.FC = () => {
    const { toast } = useToast();

    const formMethods1 = useForm<Tab1FormValues >({
        resolver: zodResolver(z.union([tab1Schema, tab2Schema])),
        defaultValues: {
            username: "",
            email: "",
            password: "",

        },
    });

    const formMethods2 = useForm<Tab2FormValues>({
        resolver: zodResolver(z.union([tab1Schema, tab2Schema])),
        defaultValues: {
            gender: "",
            age: 0,
            bio: "",
            agree: true,
            position: "",
        }
    })

    function handleSubmit1(values: Tab1FormValues) {
        console.log(values);
        toast({
            title: "Message",
            description: "Form submitted successfully",
        });
    }

    function handleSubmit2(values: Tab2FormValues) {
        console.log(values);
        toast({
            title: "Message",
            description: "Form submitted successfully",
        });
    }

    return (
        <>
            <Toaster />
            <Divider style={{ fontSize: "50px", fontWeight: "200", color: "white", borderColor: "white" }}>Login Page</Divider>
            <div className="flex w-screen justify-center p-11 mt-[1%]">
                <Tabs defaultValue="creds" className="w-[40%]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="creds">Credentials</TabsTrigger>
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="creds">
                        <Tab1 formMethods={formMethods1} onSubmit={handleSubmit1} header="Login Credentials" />
                    </TabsContent>
                    <TabsContent value="personal">
                        <Tab2 formMethods={formMethods2} onSubmit={handleSubmit2} header="Personal Information" />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default Form;