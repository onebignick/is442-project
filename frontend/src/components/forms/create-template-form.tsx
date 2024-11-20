"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    name: z.string(),
    content: z.string(),
    type: z.string(),
});

export function CreateTemplateForm() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            content: "",
        },
    });

    const content = useWatch({
        control: form.control,
        name: "content",
    });

    const selectedType = useWatch({
        control: form.control,
        name: "type",
    });

    const placeholderMappings = {
        "Customer Name": "[Customer Name]",
        "Product Name": "[Product Name]",
        "Product Price (Before Discount)": "[Product Price]",
        "Percentage Discount (%)": "[Percentage Discount]",
        "Discount Amount ($)": "[Discount Amount]",
        "Related Product Name": "[Related Product]",
    };

    const addPlaceholder = (placeholder: string) => {
        const currentContent = form.getValues("content");
        const updatedContent = currentContent
            ? `${currentContent} ${placeholder}`
            : placeholder;
        form.setValue("content", updatedContent);
    };

    const enumeratePlaceholders = (content: string) => {
        const placeholderCounts: Record<string, number> = {};

        // Replace placeholders with enumerated versions
        const replacePlaceholder = (match: string) => {
            const basePlaceholder = match.replace(/\s*\d*$/, ""); // Remove numbers
            if (!placeholderCounts[basePlaceholder]) {
                placeholderCounts[basePlaceholder] = 1;
            } else {
                placeholderCounts[basePlaceholder]++;
            }
            return `[${basePlaceholder.replace("[", "").replace("]", "")} ${placeholderCounts[basePlaceholder]}]`;
        };

        return content
            .replace(/\[Product Name( \d+)?\]/g, replacePlaceholder)
            .replace(/\[Product Price( \d+)?\]/g, replacePlaceholder);
    };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        // Enumerate placeholders only once during submission
        const enumeratedContent = enumeratePlaceholders(values.content);

        try {
            const res = await fetch("http://localhost:8080/api/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    content: enumeratedContent,
                }),
            });

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Template information was successfully updated.",
                });
                form.reset();
            } else {
                throw new Error("Failed to update template.");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)} // Ensure single execution
                className="space-y-8"
            >
                <div className="grid grid-cols-12 gap-4">
                    <Card className="col-span-6">
                        <CardHeader>
                            <CardTitle className="text-center">Create Template</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-12 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Template Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="string"
                                                placeholder="Template Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dropdown Field */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Promotion Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Promotion Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="% discount">
                                                        Percentage Discount
                                                    </SelectItem>
                                                    <SelectItem value="buy one get one free">
                                                        Buy One Get One Free
                                                    </SelectItem>
                                                    <SelectItem value="purchase with purchase">
                                                        Purchase with Purchase
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dynamic Buttons for Placeholders */}
                            <div className="col-span-12 space-y-2">
                                <p className="text-sm font-medium">Available Placeholders:</p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addPlaceholder(placeholderMappings["Customer Name"])}
                                >
                                    Customer Name
                                </Button>

                                {selectedType === "% discount" && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => addPlaceholder(placeholderMappings["Product Name"])}
                                        >
                                            Product Name
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                addPlaceholder(placeholderMappings["Product Price (Before Discount)"])
                                            }
                                        >
                                            Product Price (Before Discount)
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                addPlaceholder(placeholderMappings["Percentage Discount (%)"])
                                            }
                                        >
                                            Percentage Discount (%)
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => addPlaceholder(placeholderMappings["Discount Amount ($)"])}
                                        >
                                            Discount Amount ($)
                                        </Button>
                                    </>
                                )}
                                {selectedType === "buy one get one free" && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => addPlaceholder(placeholderMappings["Product Name"])}
                                        >
                                            Product Name
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                addPlaceholder(placeholderMappings["Product Price (Before Discount)"])
                                            }
                                        >
                                            Product Price (Before Discount)
                                        </Button>
                                    </>
                                )}
                                {selectedType === "purchase with purchase" && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => addPlaceholder(placeholderMappings["Product Name"])}
                                        >
                                            Product Name
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                addPlaceholder(placeholderMappings["Product Price (Before Discount)"])
                                            }
                                        >
                                            Product Price (Before Discount)
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                addPlaceholder(placeholderMappings["Percentage Discount (%)"])
                                            }
                                        >
                                            Percentage Discount (%)
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => addPlaceholder(placeholderMappings["Discount Amount ($)"])}
                                        >
                                            Discount Amount ($)
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                addPlaceholder(placeholderMappings["Related Product Name"])
                                            }
                                        >
                                            Related Product Name
                                        </Button>
                                    </>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Template Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="h-[400px]"
                                                placeholder="Enter your template here"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="col-span-4">
                                Submit
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="col-span-6">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <iframe srcDoc={content} />
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
}






// "use client"

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useWatch } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Textarea } from "../ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// const formSchema = z.object({
//     name: z.string(),
//     content: z.string(),
//     type: z.string(),
// })

// export function CreateTemplateForm() {

//     const { toast } = useToast();

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             type: "",
//             content: "",
//         },
//     });

//     const content = useWatch({
//         control: form.control,
//         name: "content",
//     });

//     const selectedType = useWatch({
//         control: form.control,
//         name: "type",
//     });

//     const placeholderMappings = {
//         "Customer Name": "[Customer Name]",
//         "Product Name": "[Product Name]",
//         "Product Price (Before Discount)": "[Product Price]",
//         "Percentage Discount (%)": "[Percentage Discount]",
//         "Discount Amount ($)": "[Discount Amount]",
//         "Related Product Name": "[Related Product]",
//     };

//     const addPlaceholder = (placeholder: string) => {
//         const currentContent = form.getValues("content");
//         const updatedContent = currentContent
//             ? `${currentContent} ${placeholder}`
//             : placeholder;
//         form.setValue("content", updatedContent);
//     };

//     const enumeratePlaceholders = (content: string) => {
//         const placeholderCounts: Record<string, number> = {};

//         // Function to replace placeholders with enumerated versions
//         const replacePlaceholder = (match: string) => {
//             const basePlaceholder = match.replace(/\s*\d*$/, ""); // Remove any existing numbers
//             if (!placeholderCounts[basePlaceholder]) {
//                 placeholderCounts[basePlaceholder] = 1;
//             } else {
//                 placeholderCounts[basePlaceholder]++;
//             }
//             return `[${basePlaceholder.replace("[", "").replace("]", "")} ${placeholderCounts[basePlaceholder]}]`;
//         };

//         // Replace placeholders in the content
//         return content
//             .replace(/\[Product Name( \d+)?\]/g, replacePlaceholder)
//             .replace(/\[Product Price( \d+)?\]/g, replacePlaceholder);
//     };

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         const enumeratedContent = enumeratePlaceholders(values.content);
//         const res = await fetch("http://localhost:8080/api/template", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name: values.name,
//                 content: enumeratedContent,
//             })
//         })

//         if (res.ok) {
//             toast({
//                 title: "Success",
//                 description: "Template information was successfully updated"
//             })
//         } else {
//             toast({
//                 title: "Uh oh! Something went wrong",
//                 description: "There was a problem with your request. "
//             })
//         }
//     }

//     return(
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <div className="grid grid-cols-12 gap-4">
//                     <Card className="col-span-6">
//                         <CardHeader>
//                             <CardTitle className = "text-center">Create Template</CardTitle>
//                         </CardHeader>
//                         <CardContent className="grid grid-cols-12 gap-4">
//                             <FormField
//                                 control={form.control}
//                                 name="name"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Template title</FormLabel>
//                                         <FormControl>
//                                             <Input type="string" placeholder="Template Name" {...field}/>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Dropdown Field */}
//                             <FormField
//                                 control={form.control}
//                                 name="type"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Promotion Type</FormLabel>
//                                         <FormControl>
//                                             <Select
//                                                 onValueChange={field.onChange}
//                                                 value={field.value}
//                                             >
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select Promotion Type" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectItem value="% discount">Percentage Discount</SelectItem>
//                                                     <SelectItem value="buy one get one free">
//                                                         Buy One Get One Free
//                                                     </SelectItem>
//                                                     <SelectItem value="purchase with purchase">
//                                                         Purchase with Purchase
//                                                     </SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Dynamic Buttons for Placeholders */}
//                             <div className="col-span-12 space-y-2">
//                                 <p className="text-sm font-medium">Available Placeholders:</p>
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => addPlaceholder(placeholderMappings["Customer Name"])}
//                                 >
//                                     Customer Name
//                                 </Button>
//                                 {selectedType === "% discount" && (
//                                     <>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() => addPlaceholder(placeholderMappings["Product Name"])}
//                                         >
//                                             Product Name
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() =>
//                                                 addPlaceholder(placeholderMappings["Product Price (Before Discount)"])
//                                             }
//                                         >
//                                             Product Price (Before Discount)
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() =>
//                                                 addPlaceholder(placeholderMappings["Percentage Discount (%)"])
//                                             }
//                                         >
//                                             Percentage Discount (%)
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() => addPlaceholder(placeholderMappings["Discount Amount ($)"])}
//                                         >
//                                             Discount Amount ($)
//                                         </Button>
//                                     </>
//                                 )}
//                                 {selectedType === "buy one get one free" && (
//                                     <>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() => addPlaceholder(placeholderMappings["Product Name"])}
//                                         >
//                                             Product Name
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() =>
//                                                 addPlaceholder(placeholderMappings["Product Price (Before Discount)"])
//                                             }
//                                         >
//                                             Product Price (Before Discount)
//                                         </Button>
//                                     </>
//                                 )}
//                                 {selectedType === "purchase with purchase" && (
//                                     <>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() => addPlaceholder(placeholderMappings["Product Name"])}
//                                         >
//                                             Product Name
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() =>
//                                                 addPlaceholder(placeholderMappings["Product Price (Before Discount)"])
//                                             }
//                                         >
//                                             Product Price (Before Discount)
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() =>
//                                                 addPlaceholder(placeholderMappings["Percentage Discount (%)"])
//                                             }
//                                         >
//                                             Percentage Discount (%)
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() => addPlaceholder(placeholderMappings["Discount Amount ($)"])}
//                                         >
//                                             Discount Amount ($)
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             onClick={() => addPlaceholder(placeholderMappings["Related Product Name"])}
//                                         >
//                                             Related Product Name
//                                         </Button>
//                                     </>
//                                 )}
//                             </div>

//                             <FormField
//                                 control={form.control}
//                                 name="content"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12">
//                                         <FormLabel>Template Content</FormLabel>
//                                         <FormControl>
//                                             <Textarea 
//                                                 className="h-[400px]"
//                                                 placeholder="Enter your template here"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button type="submit" className="col-span-4">
//                                 Submit
//                             </Button>
//                         </CardContent>
//                     </Card>

//                     <Card className="col-span-6">
//                         <CardHeader>
//                             <CardTitle>
//                                 Preview
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <iframe srcDoc={content}/>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </form>
//         </Form>
//     )
// }