"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    name: z.string(),
    content: z.string(),
})

export function CreateTemplateForm() {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("http://localhost:8080/api/template", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                content: values.content,
            })
        })

        if (res.ok) {
            toast({
                title: "Success",
                description: "Template information was successfully updated"
            })
        } else {
            toast({
                title: "Uh oh! Something went wrong",
                description: "There was a problem with your request. "
            })
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

            <div className="pt-2 pb-2 rounded-lg space-y-3">
                {/* Participants Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-2">
                            <FormControl>
                                <Input type="string" placeholder="Template Name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-2">
                            <FormControl>
                                <Textarea placeholder="Enter your template here" {...field}/>
                            </FormControl>
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