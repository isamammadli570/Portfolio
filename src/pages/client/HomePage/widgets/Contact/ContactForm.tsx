import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import {FormInput} from "@/components/form/FormInput";
import {FormTextarea} from "@/components/form/FormTextarea";
import {useSendContactMessage} from "@/hooks/contact";
import {EMAIL_PATTERN, MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH, NAME_MAX_LENGTH} from "@/constants/validation";

type ContactFormValues = {name: string; email: string; message: string; _honey: string};

/** Contact form on the dark section; resets after a successful send. */
export const ContactForm = () => {
    const {t} = useTranslation(["home", "common"]);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ContactFormValues>({mode: "onTouched", defaultValues: {name: "", email: "", message: "", _honey: ""}});
    const {mutateAsync, isPending} = useSendContactMessage();

    const submit = handleSubmit(async (values) => {
        const sent = await mutateAsync(values).then(() => true, () => false);
        if (sent) reset();
    });

    return (
        <form onSubmit={(event) => void submit(event)} noValidate className="grid flex-[1.2_1_26rem] gap-8 sm:grid-cols-2">
            <FormInput
                label={t("home:contact.form.name")}
                placeholder={t("home:contact.form.namePlaceholder")}
                autoComplete="name"
                error={errors.name?.message}
                {...register("name", {required: t("common:validation.required"), maxLength: NAME_MAX_LENGTH})}
            />
            <FormInput
                label={t("home:contact.form.email")}
                type="email"
                placeholder={t("home:contact.form.emailPlaceholder")}
                autoComplete="email"
                error={errors.email?.message}
                {...register("email", {required: t("common:validation.required"), pattern: {value: EMAIL_PATTERN, message: t("common:validation.email")}})}
            />
            <FormTextarea
                label={t("home:contact.form.message")}
                rows={3}
                placeholder={t("home:contact.form.messagePlaceholder")}
                className="sm:col-span-2"
                error={errors.message?.message}
                {...register("message", {
                    required: t("common:validation.required"),
                    minLength: {value: MESSAGE_MIN_LENGTH, message: t("common:validation.messageMin", {count: MESSAGE_MIN_LENGTH})},
                    maxLength: MESSAGE_MAX_LENGTH,
                })}
            />
            {/* Honeypot: invisible to people, bots fill it in and the message is dropped. */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" {...register("_honey")}/>
            <div className="sm:col-span-2">
                <Button type="submit" variant="light" disabled={isPending}>
                    <span>{isPending ? t("home:contact.form.sending") : `${t("home:contact.form.send")} →`}</span>
                </Button>
            </div>
        </form>
    );
};
