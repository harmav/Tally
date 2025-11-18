import { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { DARK_THEME, LIGHT_THEME } from "../utilities/styling";
import { AppTheme } from "./types";

const StylingContext = createContext<AppTheme>({
    deviceTheme: "light",
    styling: {
        background: "",
        text: "",
        tag: "",
        tagText: "",
        textGray: "",
        heartColor: "",
        heartColorGhost: "",
        mainColorGhost: "",
        mainColor: "",
        textError: ""
    }
})

function ThemeHandler({children} : {children: React.ReactNode}) {
    const [theme, themeSetter] = useState<AppTheme>(LIGHT_THEME)

    useEffect(() => {
        if(Appearance.getColorScheme() == "light") {
            themeSetter(LIGHT_THEME)
        } else {
            themeSetter(DARK_THEME)
        }

        var id = Appearance.addChangeListener(({colorScheme}) => {
            if(colorScheme == "light") {
                themeSetter(LIGHT_THEME)
            } else {
                themeSetter(DARK_THEME)
            }
        })

        return () => id.remove()
    }, [])

    return(
        <StylingContext.Provider value={theme}>
            {children}
        </StylingContext.Provider>
    )
}

export { StylingContext, ThemeHandler };

