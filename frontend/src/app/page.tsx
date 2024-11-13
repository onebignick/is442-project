"use client"

import { FlipWords } from "@/components/ui/flip-words";
import SignInForm from "@/components/forms/sign-in";

export default function SignInPage() {
  const words: string[] = ["authenticity", "quality", "health"];

  return (
	<div className="grid grid-cols-12 gap-4 h-dvh p-5">
		<div 
			className="hidden md:flex md:col-span-12 lg:col-span-6 flex-row justify-center grid grid-cols-12 p-0"
		>
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