"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@/types/User";
import { useToast } from "@/hooks/use-toast";
import { BreadcrumbComponent } from '@/components/breadcrumb-component';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
    roles: z.string(),
})

const roles = [
    {
        id: "admin",
        label: "System Administrator"
    },
    {
        id: "marketing",
        label: "Marketing"
    },
    {
        id: "sales",
        label: "Salesperson"
    }
] as const;

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Users", href: "/users" },
]

interface UpdateUserFormProps {
    targetUser: User;
}

export function EditUserForm({ targetUser } : UpdateUserFormProps) {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: targetUser.username,
            password: targetUser.password,
            roles: targetUser.roles,
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("http://localhost:8080/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                roles: values.roles,
            }),
        })
        
        if (res.ok) {
            toast({
                title: "Success",
                description: "User information was successfully updated"
            })
        } else {
            toast({
                title: "Uh oh! Something went wrong",
                description: "There was a problem with your request. "
            })
        }
    }

    return(
        <Card>
            <div className="pt-5 pl-5">
                <BreadcrumbComponent items={breadcrumbItems} />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg">
                    <CardHeader>
                        <CardTitle className = "text-center">Edit User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        {/* Participants Field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="col-span-2 sm:col-span-1">
                                    <FormControl>
                                        <Input type="string" placeholder="Username" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="col-span-2 sm:col-span-1">
                                    <FormControl>
                                        <Input type="string" placeholder="Password" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roles"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Select role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={targetUser.roles}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles.map((item) => {
                                            return <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="col-span-2">
                            Submit
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    )
}