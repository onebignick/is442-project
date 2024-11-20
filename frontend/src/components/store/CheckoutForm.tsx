import { PaymentElement } from "@stripe/react-stripe-js";

export function CheckoutForm() {
    return (
        <form>
            <PaymentElement/>
            <button>Submit</button>
        </form>
    )
}