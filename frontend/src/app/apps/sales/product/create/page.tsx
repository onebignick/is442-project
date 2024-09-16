"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    productName: z.string().min(5, {
        message: "Product name must be at least 5 characters"
    }).max(50, {
        message: "Product name must be less than 50 characters"
    }),
})

export default function SalesAppCustomer() {
    const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_API_KEY!)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newProduct = await stripe.products.create({
            name: values.productName,
        });
        console.log(newProduct);
    }

    return (
        <div className="px-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product name here" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    This is the name of your product.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}