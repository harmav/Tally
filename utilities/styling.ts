import { AppTheme } from "@/components/types"

export const LIGHT_THEME: AppTheme = {
    deviceTheme: "light",
    styling: {
        background: "white",
        text: "black",
        textGray: "rgba(179, 179, 179, 1)",
        textError: "rgba(184, 48, 20, 1)",
        tag: "black",
        tagText: "white",
        mainColor: "hsla(280 50% 50%)",
        mainColorGhost: "hsla(280 50% 50% / 0.4)",
        heartColor: "hsla(10 80% 50%)",
        heartColorGhost: "hsla(10 80% 50% / 0.4)",
    }
}

export const DARK_THEME: AppTheme = {
    deviceTheme: "dark",
    styling: {
        background: "black",
        text: "white",
        tag: "white",
        tagText: "black",
        textGray: "rgba(179, 179, 179, 1)",
        textError: "rgba(240, 138, 117, 1)",
        mainColor: "rgba(190, 163, 245, 1)",
        mainColorGhost: "hsla(260 80% 30% / 0.2)",
        heartColor: "rgba(245, 177, 163, 1)",
        heartColorGhost: "hsla(10 80% 30% / 0.2)"
    }
}