// components/Tab1.tsx
import React from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { Tab1FormValues } from "@/app/form/page";

interface Tab1Props {
  formMethods: UseFormReturn<Tab1FormValues>;
  onSubmit: (values: Tab1FormValues) => void;
  header: string;
}

const Tab1: React.FC<Tab1Props> = ({ formMethods, onSubmit, header }) => {
  const { handleSubmit, control } = formMethods;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{header}</CardTitle>
      </CardHeader>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="py-4 px-8">
            <FormField
              control={control}
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
              control={control}
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
              control={control}
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
  );
};

export default Tab1;
