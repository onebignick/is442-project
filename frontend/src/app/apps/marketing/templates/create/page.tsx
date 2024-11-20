import { CreateTemplateForm } from "@/components/forms/create-template-form";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";

const breadcrumbItems = [
    { label: "Home", href: "/apps/marketing" },
    { label: "Templates", href: "/apps/marketing/templates" },
    { label: "Create New", href: "/apps/marketing/templates/create" },
]

const CreateTemplatePage = () => {
    return (
        <div className="grid grid-cols-12 p-8 gap-4">
            <div className="col-span-12">
                <BreadcrumbComponent items={breadcrumbItems}/>
            </div>
            <div className="col-span-12">
                <CreateTemplateForm/>
            </div>
        </div>
    )

};

export default CreateTemplatePage;
