export { default } from "next-auth/middleware";

export const config = { matcher: ["/email", "/settings"] };
