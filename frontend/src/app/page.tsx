import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function SignInPage() {
	const { sessionClaims }= await auth();

	if (sessionClaims!["public_metadata"]["role"] === "admin") {
		redirect("/apps/admin");
	} 
	else if (sessionClaims!["public_metadata"]["role"] === "marketing") {
		redirect("/apps/marketing");
	} 
	else if (sessionClaims!["public_metadata"]["role"] === "sales") {
		redirect("/apps/sales");
	} 
	console.log(sessionClaims);
  return (
	<div>
		redirecting...
	</div>
	)
}