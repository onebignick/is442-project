export {}

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: "marketing" | "admin" | "sales"
        }
    }
}