import { defineAction } from "astro:actions";

export const contact = {
    sendEmail: defineAction({
        handler: () => {
            console.log('desde sendEmail')
        }
    })
}