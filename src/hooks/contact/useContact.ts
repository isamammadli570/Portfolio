import {sendContactMessage, type ContactMessageBody} from "@/api/contact.api";
import {useEntityMutation} from "@/hooks/_shared/useEntityMutation";
import {ERRORS} from "@/constants/errors";
import {NOTIFICATIONS} from "@/constants/notifications";

/** Sends the contact form; toasts success or the fallback failure message. */
export const useSendContactMessage = () =>
    useEntityMutation({
        mutationFn: (body: ContactMessageBody) => sendContactMessage(body),
        successMessage: NOTIFICATIONS.MESSAGE_SENT,
        errorMessage: ERRORS.CONTACT,
    });
