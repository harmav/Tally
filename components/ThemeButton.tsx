import { useContext } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { StylingContext } from "./ThemeHandler";
import ThemeText from "./ThemeText";

interface ThemeButtomInterface {
    onPress?: Function;
    style?: StyleProp<ViewStyle>;
    title: string
}

export default function ThemeButton(props: ThemeButtomInterface) {
    const {styling} = useContext(StylingContext)
    return(
        <TouchableOpacity onPress={() => props.onPress ? props.onPress() : null}>
            <View style={{
                backgroundColor: styling.mainColor, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, ...props.style as any
                }}>
                <ThemeText size={12} style={{textAlign: "center", fontWeight: "bold"}}>{props.title}</ThemeText>
            </View>
        </TouchableOpacity>
    )
}