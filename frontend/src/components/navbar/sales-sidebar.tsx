import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Home, Package, ShoppingCart, Users2 } from "lucide-react";

export function SalesSidebar() {
    return (
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/apps/sales" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <Home className="h-5 w-5"/>
                        <span className="sr-only">Dashboard</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/apps/sales/order" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <ShoppingCart className="h-5 w-5"/>
                        <span className="sr-only">Orders</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/apps/sales/product" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <Package className="h-5 w-5"/>
                        <span className="sr-only">Products</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/apps/sales/customer" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <Users2 className="h-5 w-5"/>
                        <span className="sr-only">Customers</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            </TooltipProvider>
        </nav>
    )
}