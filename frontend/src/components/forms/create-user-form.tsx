"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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

export function CreateUserForm() {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roles: []
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload = {
                ...values,
                roles: values.roles.join(",")
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
                    roles: []
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
                render={() => (
                    <FormItem>
                    <div>
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