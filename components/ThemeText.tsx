import { useContext } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { StylingContext } from "./ThemeHandler";

interface ThemeTextInterface {
    children: React.ReactNode,
    style?: StyleProp<TextStyle>;
    color?: string;
    size?: number;
    bold?: boolean
}

export default function ThemeText (props: ThemeTextInterface) {
    const {styling} = useContext(StylingContext)

    return(
        <Text style={{ 
            fontFamily: "mainFontRegular",
            color: props.color ?? styling.text, fontSize: props.size ?? 12, ...props.style as any 
        }}>
            {props.children}
        </Text>
    )
}