import {Component, type ErrorInfo, type ReactNode} from "react";
import i18n from "@/i18n";

type ErrorBoundaryProps = {children: ReactNode};
type ErrorBoundaryState = {hasError: boolean};

/** Last-resort fallback so a render crash shows a message and a reload button instead of a blank page. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {hasError: false};

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (import.meta.env.DEV) console.error(error, info.componentStack);
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <div className="grid min-h-svh place-items-center bg-background p-8 text-center">
                <div className="flex flex-col items-center gap-5">
                    <p className="mono-label text-muted-foreground">error</p>
                    <h1 className="display text-5xl">{i18n.t("common:errors.action")}</h1>
                    <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-foreground px-6 py-3 font-semibold text-background">
                        Reload
                    </button>
                </div>
            </div>
        );
    }
}
