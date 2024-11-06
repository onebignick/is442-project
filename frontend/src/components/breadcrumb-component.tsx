"use client"
import React from 'react';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BreadcrumbItemType {
    label: string
    href?: string
    isDropdown?: boolean
    dropdownItems?: string[]
}

interface BreadcrumbComponentProps {
    items: BreadcrumbItemType[]
}

export function BreadcrumbComponent({ items }: BreadcrumbComponentProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                    <BreadcrumbItem>
                        {item.isDropdown && item.dropdownItems ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                            <BreadcrumbEllipsis className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            
                            <DropdownMenuContent align="start">
                            {item.dropdownItems.map((dropdownItem, idx) => (
                                <DropdownMenuItem key={idx}>{dropdownItem}</DropdownMenuItem>
                            ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        ) : item.href ? (
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                    {index < items.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}