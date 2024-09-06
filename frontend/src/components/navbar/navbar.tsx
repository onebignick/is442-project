import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Navbar({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<nav
			className={cn("flex items-center space-x-4 lg:space-x-6", className)}
			{...props}
		>
			<Image src="http://staging7.shop.timperio.co/wp-content/uploads/2023/01/Logo-1.png" alt="timperio logo" width={100} height={50}/>
			<Link
				href="/"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Overview
			</Link>
			<Link
				href="/"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Customers
			</Link>
			<Link
				href="/"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Products
			</Link>
			<Link
				href="/"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Settings
			</Link>
		</nav>
	)
}
