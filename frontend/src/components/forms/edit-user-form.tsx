"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { User } from "@/types/User";
import { useToast } from "@/hooks/use-toast";
import { BreadcrumbComponent } from '@/components/breadcrumb-component';

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
    roles: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You must select at least one role",
    }),
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
            roles: targetUser.roles ? targetUser.roles : []
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
                roles: values.roles.join(","),
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
                        render={() => (
                            <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Roles</FormLabel>
                                <FormDescription>
                                Select the roles you want the user to have.
                                </FormDescription>
                            </div>
                            {roles.map((role) => (
                                <FormField
                                key={role.id}
                                control={form.control}
                                name="roles"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={role.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(role.id)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...field.value, role.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== role.id
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        {role.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
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