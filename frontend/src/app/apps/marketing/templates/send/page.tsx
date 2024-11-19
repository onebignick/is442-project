"use client"

import { SendEmailForm } from "@/components/forms/send-email-form";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { useSearchParams } from "next/navigation";

const breadcrumbItems = [
    { label: "Home", href: "/apps/marketing" },
    { label: "Customers", href: "/apps/marketing/customers" },
    { label: "Send Email", href: "/apps/marketing/templates/send" },
]

export default async function SendEmailPage() {
    const searchParams = useSearchParams();
    const recipients = searchParams.get("recipients")?.split(",") || [];

    return (
        <div className="grid grid-cols-12 p-8 gap-4">
            <div className="col-span-12">
                <BreadcrumbComponent items={breadcrumbItems}/>
            </div>
            <div className="col-span-12">
            <SendEmailForm recipients={recipients}/>
            </div>
        </div>
    )
}