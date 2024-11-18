import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { EditTemplateForm } from "@/components/forms/edit-template-form";

const breadcrumbItems = [
    { label: "Home", href: "/apps/admin" },
    { label: "Templates", href: "/apps/admin/templates" },
]

export default async function TemplatePage({ params } : { params: { templateId: string }}) {

    const res = await fetch("http://localhost:8080/api/template/" + params.templateId, {
        method: "GET"
    })
    
    if (res.ok) {
        const template = await res.json();

        return (
            <div className="grid grid-cols-12 p-8 gap-4">
                <div className="col-span-12">
                    <BreadcrumbComponent items={breadcrumbItems}/>
                </div>
                <div className="col-span-12">
                    <EditTemplateForm targetTemplate={template}/>
                </div>
            </div>
        )
    } else {
        return (
            <p>template not found</p>
        )
    }
}