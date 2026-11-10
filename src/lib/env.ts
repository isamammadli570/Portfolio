import {CONTACT_EMAIL} from "@/constants/portfolio";
import {API_ENDPOINTS} from "@/constants/endpoints";

const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || CONTACT_EMAIL;

/** Single access point for build-time configuration. The contact endpoint defaults to FormSubmit for the contact e-mail. */
export const ENV = {
    contactEmail,
    contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || `${API_ENDPOINTS.CONTACT_BASE}/${contactEmail}`,
};
