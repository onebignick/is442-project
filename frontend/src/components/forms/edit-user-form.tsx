"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@/types/User";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.string(),
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

interface UpdateUserFormProps {
    targetUser: User;
    className: string;
}

export function EditUserForm({ targetUser, className } : UpdateUserFormProps) {

    const { toast } = useToast();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: targetUser.username,
            password: "",
            role: targetUser.role,
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (targetUser.role === "admin") {
            toast({
                title: "Uh oh! Something went wrong",
                description: "You cant modify the details of another admin"
            });
            return;
        }

        const updateRoleResponse = await fetch("/api/clerk", {
            method: "PUT",
            body: JSON.stringify({
                clerkUserId: targetUser.clerkUserId!,
                username: values.username,
                password: values.password,
                role: values.role
            })
        });
        
        if (updateRoleResponse.ok) {
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
        <Card className={className}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg">
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>View current user information</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">

                        <Label>Id</Label>
                        <Input disabled type="string" value={targetUser.id}/>

                        <Label>ClerkUserId</Label>
                        <Input disabled type="string" value={targetUser.clerkUserId}/>

                        <Label>Email</Label>
                        <Input disabled type="string" value={targetUser.email}/>

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
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
                                <FormItem>
                                    <FormLabel>Reset Password</FormLabel>
                                    <FormControl>
                                        <Input type="string" placeholder="New Password" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Select role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={targetUser.role}>
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
                        <Button type="submit">
                            Submit
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    )
}