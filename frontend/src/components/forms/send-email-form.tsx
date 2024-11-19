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

export function SendEmailForm() {
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
                console.log("Fetched Prices:", pricesMap);
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

    console.log("Fetched Prices:", productPrices);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipient: "",
            template: "",
            subject: "",
            dynamicFields: {},
        },
    });

    const handleProductChange = (productName: string, rowIndex: number) => {
        const selectedProduct = products.find((product) => product.name === productName);
        if (selectedProduct) {
            // Log the product id of the selected product
            console.log(`Selected Product ID for row ${rowIndex + 1}:`, selectedProduct.id);
    
            const price = prices[selectedProduct.id];
            setProductPrices((prev) => ({
                ...prev,
                [`Product Price ${rowIndex + 1}`]: price || "",
            }));
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
            <form className="space-y-8">
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
                                                type="email"
                                                placeholder="Recipient Email"
                                                {...field}
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
                                                    {templates.map((template) => (
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
                                        const fieldName = `dynamicFields.${rowIndex}.${cleanedPlaceholder}`;

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


                            <Button type="submit" className="col-span-2">
                                Preview
                            </Button>

                            <Button type="submit" className="col-span-2">
                                Send Email
                            </Button>

                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
}




// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useWatch } from "react-hook-form";
// import { z } from "zod";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { useToast } from "@/hooks/use-toast";
// import React from "react";

// const formSchema = z.object({
//     recipient: z.string(),
//     template: z.string().nonempty("Template is required"),
//     subject: z.string(),
//     dynamicFields: z.record(z.string(), z.string()), // Dynamic fields for placeholders
// });

// export function SendEmailForm() {
//     const { toast } = useToast();
//     const [templates, setTemplates] = React.useState<{ id: string; name: string }[]>([]);
//     const [products, setProducts] = React.useState<{ id: string; name: string }[]>([]);
//     const [placeholders, setPlaceholders] = React.useState<string[]>([]);
//     const [templateId, setTemplateId] = React.useState<string | null>(null);

//     // Fetch templates when the component mounts
//     React.useEffect(() => {
//         async function fetchTemplates() {
//             try {
//                 const res = await fetch("http://localhost:8080/api/template");
//                 if (!res.ok) {
//                     throw new Error("Failed to fetch templates");
//                 }
//                 const data = await res.json();
//                 setTemplates(data);
//             } catch (error) {
//                 console.error("Error fetching templates:", error);
//                 toast({
//                     title: "Error",
//                     description: "Failed to load templates. Please try again later.",
//                 });
//             }
//         }

//         fetchTemplates();
//     }, [toast]);

//     // Fetch placeholders when a template is selected
//     React.useEffect(() => {
//         if (templateId) {
//             async function fetchPlaceholders() {
//                 try {
//                     const res = await fetch(
//                         `http://localhost:8080/api/template/placeholders/${templateId}`
//                     );
//                     if (!res.ok) {
//                         throw new Error("Failed to fetch placeholders");
//                     }
//                     const data = await res.json();

//                     // Exclude unnecessary placeholders
//                     const filteredPlaceholders = data
//                         .filter((placeholder: string) => placeholder !== "[Customer Name]")
//                         .map((placeholder: string) =>
//                             placeholder
//                                 .replace(/\[|\]/g, "") // Remove square brackets
//                                 .replace(/^\s*Product\sName\s\d+/i, "Product Name") // Clean up enumeration
//                                 .replace(/^\s*Product\sPrice\s\d+/i, "Product Price")
//                                 .replace(/^\s*Discount\sPercentage/i, "Discount Percentage")
//                                 .replace(/^\s*Promo\sCode/i, "Promo Code")
//                                 .replace(/^\s*Discount\sAmount/i, "Discount Amount")
//                                 .replace(/^\s*Related\sProduct/i, "Related Product")
//                         );
//                     setPlaceholders(filteredPlaceholders);
//                 } catch (error) {
//                     console.error("Error fetching placeholders:", error);
//                     toast({
//                         title: "Error",
//                         description: "Failed to load placeholders. Please try again later.",
//                     });
//                 }
//             }

//             fetchPlaceholders();
//         }
//     }, [templateId, toast]);

//     // Fetch products when the component mounts
//     React.useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const res = await fetch("http://localhost:8080/api/product");
//                 if (!res.ok) {
//                     throw new Error("Failed to fetch products");
//                 }
//                 const data = await res.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 toast({
//                     title: "Error",
//                     description: "Failed to load products. Please try again later.",
//                 });
//             }
//         }

//         fetchProducts();
//     }, [toast]);

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             recipient: "",
//             template: "",
//             subject: "",
//             dynamicFields: {},
//         },
//     });

//     // Helper to group placeholders into rows
//     const groupedPlaceholders = React.useMemo(() => {
//         const row1 = placeholders.filter((p) =>
//             ["Product Name", "Product Price", "Discount Percentage", "Promo Code"].includes(p)
//         );
//         const row2 = placeholders.filter((p) =>
//             ["Product Name", "Product Price"].includes(p) && !row1.includes(p)
//         );
//         const row3 = placeholders.filter((p) =>
//             ["Product Name", "Product Price", "Discount Amount", "Related Product"].includes(p) && !row1.includes(p) && !row2.includes(p)
//         );

//         return [row1, row2, row3].filter((row) => row.length > 0);
//     }, [placeholders]);

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         const res = await fetch("http://localhost:8080/api/send-email", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(values),
//         });

//         if (res.ok) {
//             toast({
//                 title: "Success",
//                 description: "Email sent successfully",
//             });
//         } else {
//             toast({
//                 title: "Error",
//                 description: "Failed to send the email",
//             });
//         }
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <div className="grid grid-cols-12 gap-4">
//                     {/* Form Section */}
//                     <Card className="col-span-12">
//                         <CardHeader>
//                             <CardTitle className="text-center">Send Email</CardTitle>
//                         </CardHeader>
//                         <CardContent className="grid grid-cols-12 gap-4">
//                             {/* Recipient Email */}
//                             <FormField
//                                 control={form.control}
//                                 name="recipient"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Recipient</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 type="email"
//                                                 placeholder="Recipient Email"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Email Subject */}
//                             <FormField
//                                 control={form.control}
//                                 name="subject"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Subject</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 type="text"
//                                                 placeholder="Email Subject"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Template Dropdown */}
//                             <FormField
//                                 control={form.control}
//                                 name="template"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Template</FormLabel>
//                                         <FormControl>
//                                             <Select
//                                                 onValueChange={(value) => {
//                                                     field.onChange(value);
//                                                     const selectedTemplate = templates.find(
//                                                         (template) => template.name === value
//                                                     );
//                                                     setTemplateId(selectedTemplate?.id || null);
//                                                 }}
//                                                 value={field.value}
//                                             >
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select a template" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     {templates.map((template) => (
//                                                         <SelectItem key={template.id} value={template.name}>
//                                                             {template.name}
//                                                         </SelectItem>
//                                                     ))}
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Dynamic Form Fields in Rows */}
//                             {groupedPlaceholders.map((row, rowIndex) => (
//                                 <div key={rowIndex} className="col-span-12 grid grid-cols-12 gap-4">
//                                     {row.map((placeholder, colIndex) => {
//                                         const isProductName = placeholder === "Product Name";
//                                         const enumeratedLabel = `${placeholder} ${rowIndex + 1}`;
//                                         const fieldName = `dynamicFields.row${rowIndex}.${placeholder.replace(/\s+/g, "")}.${colIndex}`;

//                                         return (
//                                             <div key={placeholder + rowIndex + colIndex} className="col-span-3">
//                                                 <FormField
//                                                     control={form.control}
//                                                     name={fieldName}
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <FormLabel>{enumeratedLabel}</FormLabel>
//                                                             <FormControl>
//                                                                 {isProductName ? (
//                                                                     // Render Product Name dropdown
//                                                                     <Select
//                                                                         onValueChange={field.onChange}
//                                                                         value={field.value}
//                                                                     >
//                                                                         <SelectTrigger>
//                                                                             <SelectValue placeholder="Select Product" />
//                                                                         </SelectTrigger>
//                                                                         <SelectContent>
//                                                                             {products.map((product) => (
//                                                                                 <SelectItem
//                                                                                     key={product.id}
//                                                                                     value={product.name}
//                                                                                 >
//                                                                                     {product.name}
//                                                                                 </SelectItem>
//                                                                             ))}
//                                                                         </SelectContent>
//                                                                     </Select>
//                                                                 ) : (
//                                                                     // Render regular text input for other placeholders
//                                                                     <Input
//                                                                         placeholder={`Enter ${enumeratedLabel}`}
//                                                                         {...field}
//                                                                     />
//                                                                 )}
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             ))}



//                             <Button type="submit" className="col-span-4">
//                                 Send Email
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </form>
//         </Form>
//     );
// }






// export function SendEmailForm({ recipients }: SendEmailFormProps) {
//     const { toast } = useToast();

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             recipient: recipients.join(", "),
//             body: "",
//         },
//     });

//     const bodyContent = useWatch({
//         control: form.control,
//         name: "body",
//     });

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         const res = await fetch("http://localhost:8080/api/send-email", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(values),
//         });

//         if (res.ok) {
//             toast({
//                 title: "Success",
//                 description: "Email sent successfully",
//             });
//         } else {
//             toast({
//                 title: "Error",
//                 description: "Failed to send the email",
//             });
//         }
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <div className="grid grid-cols-12 gap-4">
//                     <Card className="col-span-12">
//                         <CardHeader>
//                             <CardTitle className="text-center">Send Email</CardTitle>
//                         </CardHeader>

//                         <CardContent className="grid grid-cols-12 gap-4">
//                             <FormField
//                                 control={form.control}
//                                 name="recipient"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Recipient</FormLabel>
//                                         <FormControl>
//                                             <Textarea
//                                                 placeholder="Recipient Emails"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="body"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Email Body</FormLabel>
//                                         <FormControl>
//                                             <Textarea
//                                                 className="h-[300px]"
//                                                 placeholder="Write your email here"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="body"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel> Select Template </FormLabel>
//                                         <FormControl>
//                                             <Textarea
//                                                 className="h-[300px]"
//                                                 placeholder="Write your email here"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button type="submit" className="col-span-4">
//                                 Send Email
//                             </Button>
//                         </CardContent>
//                     </Card>

//                     {/* <Card className="col-span-6">
//                         <CardHeader>
//                             <CardTitle>Preview</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-4">
//                                 <p><strong>To:</strong> {form.watch("recipient")}</p>
//                                 <div>
//                                     <strong>Body:</strong>
//                                     <div
//                                         dangerouslySetInnerHTML={{ __html: bodyContent }}
//                                     />
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card> */}
//                 </div>
//             </form>
//         </Form>
//     );
// }
