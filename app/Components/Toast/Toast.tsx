"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes,
    FaFilm,
    FaHeart,
    FaBookmark,
    FaLink,
} from "react-icons/fa";

export type ToastType = "success" | "error" | "warning" | "info" | "cinema";

export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    title?: string;
    duration?: number;
    icon?: React.ReactNode;
}

type ToastListener = (toasts: ToastItem[]) => void;

let listeners: ToastListener[] = [];
let activeToasts: ToastItem[] = [];

const notifyListeners = () => {
    listeners.forEach((l) => l([...activeToasts]));
};

export const dismissToast = (id: string) => {
    activeToasts = activeToasts.filter((t) => t.id !== id);
    notifyListeners();
};

const addToast = (
    type: ToastType,
    message: string,
    options?: { title?: string; duration?: number; icon?: React.ReactNode }
) => {
    const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    const newToast: ToastItem = {
        id,
        type,
        message,
        title: options?.title,
        duration: options?.duration ?? 4000,
        icon: options?.icon,
    };

    // Keep max 4 toasts stacked neatly
    activeToasts = [...activeToasts.slice(-3), newToast];
    notifyListeners();
    return id;
};

// Global toast trigger matching standard toast API
export const toast = {
    success: (message: string, options?: { title?: string; duration?: number }) =>
        addToast("success", message, options),
    error: (message: string, options?: { title?: string; duration?: number }) =>
        addToast("error", message, options),
    warning: (message: string, options?: { title?: string; duration?: number }) =>
        addToast("warning", message, options),
    info: (message: string, options?: { title?: string; duration?: number }) =>
        addToast("info", message, options),
    cinema: (message: string, options?: { title?: string; duration?: number }) =>
        addToast("cinema", message, options),
    dismiss: dismissToast,
};

// Individual Toast Card with Glassmorphism, Neon Glow & Auto-dismiss Timer
const ToastCard = ({
    item,
    onDismiss,
}: {
    item: ToastItem;
    onDismiss: (id: string) => void;
}) => {
    const [progress, setProgress] = useState(100);
    const [isHovered, setIsHovered] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const startTimeRef = useRef<number>(Date.now());
    const remainingTimeRef = useRef<number>(item.duration || 4000);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onDismiss(item.id);
        }, 220);
    };

    // Timer & Progress management with pause-on-hover
    useEffect(() => {
        if (isHovered) {
            if (timerRef.current) clearTimeout(timerRef.current);
            return;
        }

        startTimeRef.current = Date.now();
        const duration = remainingTimeRef.current;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = Math.max(0, duration - elapsed);
            const percentage = (remaining / (item.duration || 4000)) * 100;
            setProgress(percentage);

            if (remaining <= 0) {
                clearInterval(interval);
                handleClose();
            }
        }, 40);

        timerRef.current = setTimeout(() => {
            handleClose();
        }, duration);

        return () => {
            clearInterval(interval);
            if (timerRef.current) clearTimeout(timerRef.current);
            remainingTimeRef.current = Math.max(
                0,
                remainingTimeRef.current - (Date.now() - startTimeRef.current)
            );
        };
    }, [isHovered, item.duration]);

    // Contextual icon & title detection
    let icon = item.icon;
    let badgeTitle = item.title;
    let typeConfig = {
        border: "border-white/10",
        glow: "bg-white/[0.03]",
        shadow: "shadow-black/70",
        badge: "text-gray-400 bg-white/5",
        progressColor: "bg-white/40",
        iconBox: "bg-white/10 text-white border-white/10",
    };

    // Detect contextual cinema emojis
    const msg = item.message;
    const isHeart = msg.includes("❤️") || msg.toLowerCase().includes("favourite");
    const isBookmark = msg.includes("🔖") || msg.toLowerCase().includes("watchlist");
    const isLink = msg.includes("🔗") || msg.toLowerCase().includes("link");

    // Clean display message (remove raw emojis if desired or keep clean)
    let displayMessage = item.message;
    if (isHeart) {
        displayMessage = displayMessage.replace("❤️", "").trim();
        icon = <FaHeart className="text-red-500 text-sm" />;
        badgeTitle = badgeTitle || "Favourites";
    } else if (isBookmark) {
        displayMessage = displayMessage.replace("🔖", "").trim();
        icon = <FaBookmark className="text-amber-400 text-xs" />;
        badgeTitle = badgeTitle || "Watchlist";
    } else if (isLink) {
        displayMessage = displayMessage.replace("🔗", "").trim();
        icon = <FaLink className="text-[#fc6743] text-xs" />;
        badgeTitle = badgeTitle || "Link Copied";
    }

    switch (item.type) {
        case "success":
            typeConfig = {
                border: "border-emerald-500/35",
                glow: "from-emerald-500/10 via-transparent to-transparent",
                shadow: "shadow-[0_15px_40px_-5px_rgba(16,185,129,0.25)]",
                badge: "text-emerald-400 bg-emerald-500/15 border-emerald-500/20",
                progressColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
                iconBox: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
            };
            if (!icon) icon = <FaCheckCircle className="text-sm" />;
            badgeTitle = badgeTitle || "Success";
            break;

        case "error":
            typeConfig = {
                border: "border-red-500/40",
                glow: "from-red-500/15 via-transparent to-transparent",
                shadow: "shadow-[0_15px_40px_-5px_rgba(238,22,47,0.35)]",
                badge: "text-red-400 bg-red-500/15 border-red-500/25",
                progressColor: "bg-gradient-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]",
                iconBox: "bg-red-500/20 text-red-500 border-red-500/35",
            };
            if (!icon) icon = <FaExclamationCircle className="text-sm" />;
            badgeTitle = badgeTitle || "Error";
            break;

        case "warning":
            typeConfig = {
                border: "border-amber-500/35",
                glow: "from-amber-500/10 via-transparent to-transparent",
                shadow: "shadow-[0_15px_40px_-5px_rgba(245,158,11,0.25)]",
                badge: "text-amber-400 bg-amber-500/15 border-amber-500/25",
                progressColor: "bg-gradient-to-r from-amber-500 to-orange-400",
                iconBox: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            };
            if (!icon) icon = <FaExclamationTriangle className="text-sm" />;
            badgeTitle = badgeTitle || "Notice";
            break;

        case "cinema":
        case "info":
        default:
            typeConfig = {
                border: "border-red-500/35",
                glow: "from-[#ee162f]/10 via-[#fc6743]/5 to-transparent",
                shadow: "shadow-[0_15px_40px_-5px_rgba(238,22,47,0.25)]",
                badge: "text-red-400 bg-red-500/15 border-red-500/25",
                progressColor: "bg-gradient-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]",
                iconBox: "bg-gradient-to-br from-[#ee162f]/20 to-[#fc6743]/20 text-white border-red-500/30",
            };
            if (!icon) icon = <FaFilm className="text-xs text-red-400" />;
            badgeTitle = badgeTitle || "CineList";
            break;
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`pointer-events-auto relative flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-stone-950/95 border backdrop-blur-2xl overflow-hidden min-w-[280px] sm:min-w-[340px] max-w-md transition-all duration-200 select-none ${
                typeConfig.border
            } ${typeConfig.shadow} ${
                isClosing
                    ? "opacity-0 translate-x-8 scale-95"
                    : "opacity-100 translate-x-0 scale-100 animate-in slide-in-from-right-8 duration-300"
            }`}
            role="alert"
        >
            {/* Ambient Corner Glow Accent */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${typeConfig.glow} pointer-events-none`}
            />

            {/* Left Icon Badge */}
            <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-xl border shrink-0 shadow-sm ${typeConfig.iconBox}`}
            >
                {icon}
            </div>

            {/* Middle Message Body */}
            <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-0.5">
                    <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeConfig.badge}`}
                    >
                        {badgeTitle}
                    </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-200 leading-snug break-words">
                    {displayMessage}
                </p>
            </div>

            {/* Right Close Button */}
            <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss toast"
            >
                <FaTimes className="text-xs" />
            </button>

            {/* Bottom Progress Countdown Bar */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/5">
                <div
                    className={`h-full ${typeConfig.progressColor} transition-all duration-75 ease-linear`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

// Global Container for rendering active toasts
export const ToastContainer = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    useEffect(() => {
        const handler: ToastListener = (newToasts) => {
            setToasts(newToasts);
        };
        listeners.push(handler);
        return () => {
            listeners = listeners.filter((l) => l !== handler);
        };
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed top-4 sm:top-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-full"
            aria-live="polite"
        >
            {toasts.map((t) => (
                <ToastCard key={t.id} item={t} onDismiss={dismissToast} />
            ))}
        </div>
    );
};

export default ToastContainer;
