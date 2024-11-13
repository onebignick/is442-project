import { FlipWords } from "@/components/ui/flip-words";
import SignInForm from "@/components/forms/sign-in";

export default function SignInPage() {
  const words: string[] = ["authenticity", "quality", "health"];

  return (
	<div className="grid grid-cols-12 gap-4 h-dvh p-5">
		<div className="hidden md:flex md:col-span-12 lg:col-span-6 flex-row justify-center grid grid-cols-12">
			<div className="col-span-6 flex content-center justify-end md:mr-5">
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img src="/logo.png" alt="logo" className="w-20 mr-2" />
                    </div>
			</div>

			<div className="col-span-6 justify-start items-start content-center min-w-80">
				<h1 className="font-bold text-5xl text-left mt-5"> Timperio </h1>
				<div className="text-black text-xl text-left mt-2">
					Rooted in
					<FlipWords words={words}/>
				</div>
			</div>
		</div>
		<div className="col-span-12 lg:col-span-6 content-center items-center">
			<SignInForm/>
		</div>
	</div>
	)
}


// import { Metadata } from "next"
// import Image from "next/image"
// import Link from "next/link"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
// import { UserAuthForm } from "@/components/user-auth-form"

// export const metadata: Metadata = {
//     title: "Authentication",
//     description: "Authentication forms built using the components.",
// }

// export default function AuthenticationPage() {
//     return (
//         <>
//             <div className="md:hidden">
//                 <Image
//                     src="/examples/authentication-light.png"
//                     width={1280}
//                     height={843}
//                     alt="Authentication"
//                     className="block dark:hidden"
//                 />
//                 <Image
//                     src="/examples/authentication-dark.png"
//                     width={1280}
//                     height={843}
//                     alt="Authentication"
//                     className="hidden dark:block"
//                 />
//             </div>

//             <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
//                 <Link
//                     href="/examples/authentication"
//                     className={cn(
//                         buttonVariants({ variant: "ghost" }),
//                         "absolute right-4 top-4 md:right-8 md:top-8"
//                     )}
//                 >
//                     Login
//                 </Link>

//                 <div
//                     className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex"
//                     style={{
//                         backgroundImage: `url('/bg.png')`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center'
//                     }}
//                 >
//                     {/* Optional dark overlay for better text contrast */}
//                     <div className="absolute inset-0 bg-zinc-900 opacity-50" />
                    
                    // <div className="relative z-20 flex items-center text-lg font-medium">
                    //     <img src="/logo.png" alt="logo" className="w-20 mr-2" />
                    // </div>
//                 </div>

//                 <div className="lg:p-8">
//                     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//                         <div className="flex flex-col space-y-2 text-center">
//                             <h1 className="text-2xl font-semibold tracking-tight">
//                                 Sign In
//                             </h1>
//                             <p className="text-sm text-muted-foreground">
//                                 Enter your email below to sign in
//                             </p>
//                         </div>
//                         <UserAuthForm />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }