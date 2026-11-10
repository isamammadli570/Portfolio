import {useTranslation} from "react-i18next";
import type {SkillGroup} from "@/constants/portfolio";
import {padIndex} from "@/helpers/format";

type CorridorPanelProps = {group: SkillGroup; index: number; x: number; y: number; z: number};

/** A glass card placed at a fixed depth of the corridor; it flies past as the world moves forward. */
export const CorridorPanel = ({group, index, x, y, z}: CorridorPanelProps) => {
    const {t} = useTranslation("home");

    return (
        <div
            className="absolute top-0 left-0 w-[280px] rounded-[20px] border border-white/20 bg-white/[0.07] p-6 text-white shadow-[0_0_80px_-30px_rgba(239,238,233,0.35)] backdrop-blur-sm sm:w-[380px] sm:p-7"
            style={{transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`}}
        >
            <div className="flex items-baseline justify-between">
                <span className="mono-label text-ink-muted">{padIndex(index + 1)}</span>
                <span className="mono-label text-ink-muted">{t("skills.count", {count: group.items.length})}</span>
            </div>
            <h3 className="mt-3.5 mb-4.5 font-serif text-4xl italic">{t(`skills.groups.${group.id}`)}</h3>
            <div className="flex flex-wrap gap-2">
                {group.items.map((item) => <span key={item} className="inline-flex h-[30px] items-center rounded-full bg-white/10 px-3 text-[13px]">{item}</span>)}
            </div>
        </div>
    );
};
