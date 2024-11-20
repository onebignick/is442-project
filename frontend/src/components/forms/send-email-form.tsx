"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";

const formSchema = z.object({
    recipient: z.string(),
    template: z.string().nonempty("Template is required"),
    subject: z.string(),
    dynamicFields: z.record(z.string(), z.string()),
});

export function SendEmailForm({ selectedRecipients }: { selectedRecipients: string }) {
    const { toast } = useToast();

    const [templates, setTemplates] = React.useState<{ id: string; name: string }[]>([]);
    const [products, setProducts] = React.useState<{ id: string; name: string }[]>([]);
    const [placeholders, setPlaceholders] = React.useState<string[]>([]);
    const [templateId, setTemplateId] = React.useState<string | null>(null);
    const [prices, setPrices] = React.useState<Record<string, string>>([]);
    const [productPrices, setProductPrices] = React.useState<Record<string, string>>({});

    // Fetch templates when the component mounts
    React.useEffect(() => {
        async function fetchTemplates() {
            try {
                const res = await fetch("http://localhost:8080/api/template");
                if (!res.ok) {
                    throw new Error("Failed to fetch templates");
                }
                const data = await res.json();
                setTemplates(data);
            } catch (error) {
                console.error("Error fetching templates:", error);
                toast({
                    title: "Error",
                    description: "Failed to load templates. Please try again later.",
                });
            }
        }

        fetchTemplates();
    }, [toast]);

    // Fetch placeholders when a template is selected
    React.useEffect(() => {
        if (templateId) {
            async function fetchPlaceholders() {
                try {
                    const res = await fetch(
                        `http://localhost:8080/api/template/placeholders/${templateId}`
                    );
                    if (!res.ok) {
                        throw new Error("Failed to fetch placeholders");
                    }
                    const data = await res.json();
                    const filteredPlaceholders = data.filter(
                        (placeholder: string) => placeholder !== "[Customer Name]"
                    );
                    setPlaceholders(filteredPlaceholders);
                    console.log(filteredPlaceholders);
                } catch (error) {
                    console.error("Error fetching placeholders:", error);
                    toast({
                        title: "Error",
                        description: "Failed to load placeholders. Please try again later.",
                    });
                }
            }

            fetchPlaceholders();
        }
    }, [templateId, toast]);

    // Fetch products when the component mounts
    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("http://localhost:8080/api/product");
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast({
                    title: "Error",
                    description: "Failed to load products. Please try again later.",
                });
            }
        }

        fetchProducts();
    }, [toast]);

    // Fetch all prices when the component mounts
    React.useEffect(() => {
        async function fetchPrices() {
            try {
                const res = await fetch("http://localhost:8080/api/price");
                if (!res.ok) {
                    throw new Error("Failed to fetch prices");
                }
                const data = await res.json();
                
                // Map prices by product_id
                const pricesMap = {};
                data.forEach((priceItem) => {
                    pricesMap[priceItem.product_id] = priceItem.price;
                });
                
                setPrices(pricesMap);
                // console.log("Fetched Prices:", pricesMap);
            } catch (error) {
                console.error("Error fetching prices:", error);
                toast({
                    title: "Error",
                    description: "Failed to load prices. Please try again later.",
                });
            }
        }
    
        fetchPrices();
    }, [toast]);

    // console.log("Fetched Prices:", productPrices);

    interface DynamicFields {
        [key: string]: string;
    }
    
    interface FormValues {
        recipient: string;
        template: string;
        subject: string;
        dynamicFields: DynamicFields;
    }

    const form = useForm({
        defaultValues: {
            recipient: selectedRecipients,
            template: "",
            subject: "",
            dynamicFields: {},
        },
    });

    const sendEmail = (data) => {
        console.log("Form Data:", data);

        const storedData = sessionStorage.getItem("selectedCustomers");
        console.log("Stored Data:", storedData);
        
        if (storedData) {
            const reformattedData = {
                id: templateId,
                emailSubject: data.subject,
                placeholders: data.dynamicFields,
                customers: JSON.parse(storedData)
            }
            console.log(reformattedData);
    
            fetch("http://localhost:8080/api/template/populate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reformattedData),
            })
                .then((res) => res.json())
                .then((populateResponse) => {
                    console.log("API response:", populateResponse);
                    toast({
                        title: "Success",
                        description: "Template populated successfully!",
                    });

                    return fetch("http://localhost:8080/api/email/send", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(populateResponse),
                    });
                })
                .then((emailResponse) => {
                    return emailResponse; 
                })
                .then((emailSendResponse) => {
                    console.log("Email API response:", emailSendResponse);
                    toast({
                        title: "Email Sent",
                        description: "Email has been sent successfully!",
                    });
                    window.location.href = "http://localhost:3000/apps/marketing/customers";
                })
                .catch((error) => {
                    console.error("Error populating template or sending email:", error);
                    toast({
                        title: "Error",
                        description: "Failed to populate template or send email. Please try again later.",
                    });
                });
        } else {
            console.error("No selected customers found in sessionStorage.");
        }
    };

    React.useEffect(() => {
        form.setValue("recipient", selectedRecipients); // Update the recipient field when prop changes
    }, [selectedRecipients, form]);

    const handleProductChange = (productName: string, rowIndex: number) => {
        const selectedProduct = products.find((product) => product.name === productName);
        if (selectedProduct) {
            // Log the product id of the selected product
            console.log(`Selected Product ID for row ${rowIndex + 1}:`, selectedProduct.id);
    
            const price = prices[selectedProduct.id];
            setProductPrices((prev) => {
                const newProductPrices = {
                    ...prev,
                    [`Product Price ${rowIndex + 1}`]: price || "",
                };
    
                // Update form values so the dynamic fields include this price
                form.setValue(`dynamicFields.Product Price ${rowIndex + 1}`, newProductPrices[`Product Price ${rowIndex + 1}`]);
    
                return newProductPrices;
            });
        }
    };

    // Helper to group placeholders into rows
    const groupedPlaceholders = React.useMemo(() => {
        return [
            placeholders.filter((p) =>
                ["[Product Name 1]", "[Product Price 1]", "[Discount Percentage]", "[Promo Code]"].includes(p)
            ),
            placeholders.filter((p) =>
                ["[Product Name 2]", "[Product Price 2]"].includes(p)
            ),
            placeholders.filter((p) =>
                ["[Product Name 3]", "[Product Price 3]", "[Discount Amount]", "[Related Product]"].includes(p)
            ),
        ].filter((row) => row.length > 0);
    }, [placeholders]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(sendEmail)} className="space-y-8">
                <div className="grid grid-cols-12 gap-4">
                    {/* Form Section */}
                    <Card className="col-span-12">
                        <CardHeader>
                            <CardTitle className="text-center">Send Email</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-12 gap-4">
                            {/* Recipient Email */}
                            <FormField
                                control={form.control}
                                name="recipient"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Recipient</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={true}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Subject */}
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Subject</FormLabel>                                         
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Email Subject"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Template Dropdown */}
                            <FormField
                                control={form.control}
                                name="template"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Template</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    const selectedTemplate = templates.find(
                                                        (template) => template.name === value
                                                    );
                                                    setTemplateId(selectedTemplate?.id || null);
                                                }}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a template" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {templates
                                                        .filter(template => template.name !== "") // Prevent rendering empty templates
                                                        .map((template) => (
                                                            <SelectItem key={template.id} value={template.name}>
                                                                {template.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dynamic Form Fields in Rows */}
                            {groupedPlaceholders.map((row, rowIndex) => (
                                <div key={rowIndex} className="col-span-12 grid grid-cols-12 gap-4">
                                    {row.map((placeholder) => {
                                        const isProductName = placeholder.includes("Product Name");
                                        const isRelatedProduct = placeholder.includes("Related Product");
                                        const cleanedPlaceholder = placeholder.replace(/\[|\]/g, "");
                                        const fieldName = `dynamicFields.${cleanedPlaceholder}`;

                                        return (
                                            <div key={cleanedPlaceholder} className="col-span-3">
                                                <FormField
                                                    control={form.control}
                                                    name={fieldName}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{cleanedPlaceholder}</FormLabel>
                                                            <FormControl>
                                                                {isProductName || isRelatedProduct ? (
                                                                    <Select
                                                                        onValueChange={(value) => {
                                                                            field.onChange(value);
                                                                            if (isProductName) {
                                                                                handleProductChange(value, rowIndex);
                                                                            }
                                                                        }}
                                                                        value={field.value}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder={`Select ${cleanedPlaceholder}`} />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {products.map((product) => (
                                                                                <SelectItem
                                                                                    key={product.id}
                                                                                    value={product.name}
                                                                                >
                                                                                    {product.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                ) : placeholder.includes("Product Price") ? (
                                                                    <Input
                                                                        value={
                                                                            productPrices[`Product Price ${rowIndex + 1}`] || ""
                                                                        }
                                                                        readOnly
                                                                    />
                                                                ) : (
                                                                    <Input
                                                                        placeholder={`Enter ${cleanedPlaceholder}`}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}


                            <Button type="submit" className="col-span-2" onClick={() => form.handleSubmit(sendEmail)}>
                                Send Email
                            </Button>

                            {/* <Button type="submit" className="col-span-2">
                                Send Email
                            </Button> */}

                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
}