"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
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

export function CreateUserForm() {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload = {
                ...values,
                roles: values.roles
            };

            const response = await fetch("http://localhost:8080/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // const data = await response.json();
                // console.log("User created successfully: ", data);
                form.reset({
                    username: "",
                    password: "",
                    roles: "",
                });
                toast({
                    title: "Success",
                    description: "User created successfully"
                })
            } else {
                toast({
                    title: "Uh oh! Something went wrong",
                    description: "There was a problem when creating the user"
                })
            }
        }

        catch (error) {
            console.error("An error occurred: ", error);
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

            <div className="pt-2 pb-2 rounded-lg space-y-3">
                {/* Participants Field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-2">
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
                        <FormItem className="col-span-2 sm:col-span-2">
                            <FormControl>
                                <Input type="string" placeholder="Password" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="rounded-lg space-y-3">
            <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Select role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select the role" />
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
            </div>

            <div className="flex justify-center">
                <Button type="submit" className="col-span-2">
                    Submit
                </Button>
            </div>

            </form>
        </Form>
    )
}