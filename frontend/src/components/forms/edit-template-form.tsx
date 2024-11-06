"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Template } from "@/types/Template";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    name: z.string(),
    content: z.string(),
})

interface UpdateTemplateFormProps {
    targetTemplate: Template;
}

export function EditTemplateForm({ targetTemplate } : UpdateTemplateFormProps) {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: targetTemplate.name,
            content: targetTemplate.content,
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("http://localhost:8080/api/template", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: targetTemplate.id,
                name: values.name,
                content: values.content,
            }),
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
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg">
                    <CardHeader>
                        <CardTitle className = "text-center">Edit Template Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        {/* Participants Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="col-span-2 sm:col-span-1">
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
                                <FormItem className="col-span-2 sm:col-span-1">
                                    <FormControl>
                                        <Textarea placeholder="Enter your template here" {...field}/>
                                    </FormControl>
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