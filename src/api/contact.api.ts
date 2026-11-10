import {api, ApiError} from "@/api/client";
import {ENV} from "@/lib/env";

export type ContactMessageBody = {
    name: string;
    email: string;
    message: string;
    /** Honeypot: real visitors leave it empty, bots fill it in. */
    _honey?: string;
};

type ContactResponse = {success?: string | boolean; message?: string};

/** Sends the message to the contact endpoint (FormSubmit by default) and fails when the service rejects it. */
export const sendContactMessage = async ({name, email, message, _honey}: ContactMessageBody): Promise<void> => {
    const result = await api.post<ContactResponse, Record<string, string>>(ENV.contactEndpoint, {
        name,
        email,
        message,
        _honey: _honey ?? "",
        _subject: `Portfolio: ${name}`,
        _template: "table",
        _captcha: "false",
    });

    if (result.success !== true && result.success !== "true") throw new ApiError(result.message ?? "Contact form rejected the message", 0, false);
};
