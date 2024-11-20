"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

const formSchema = z.object({
    priceId: z.string(),
    quantity: z.coerce.number(),
    email: z.string(),
})

interface UpdateUserFormProps {
    className: string;
}

export function CheckoutForm({ className } : UpdateUserFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            priceId: "price_1QHQi4ApxMEYqFN1qn1lX9ph",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const invoiceResponse = await fetch("/api/stripe", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
                priceId: values.priceId,
                quantity: values.quantity,
            })
        });

        const { url } = await invoiceResponse.json();
        window.open(url);
    }

    return(
        <Card className={className}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg">
                    <CardHeader>
                        <CardTitle>Purchase this item</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">
                        <Image src="/olive_oil.jpg" alt="olive oil" width={200} height={200}/>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input type="string" placeholder="email" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>How much of this item would you like to buy</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="quantity" {...field}/>
                                    </FormControl>
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