import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { StylingContext } from "./ThemeHandler";
import ThemeIcon from "./ThemeIcon";

interface IconButtonInterface {
    onClick?: Function;
    icon: ComponentProps<typeof Ionicons>['name'];
    size?: number;
    background?: string;
    iconColor?: string;
}

export default function IconButton(props: IconButtonInterface) {
    const {styling} = useContext(StylingContext)
    return(
        <TouchableOpacity onPress={() => props.onClick ? props.onClick() : null}>
            <View style={{backgroundColor: props.background ?? styling.mainColorGhost, padding: 8, borderRadius: 50}}>
                <ThemeIcon icon={props.icon} size={props.size ? props.size : 22} color={props.iconColor ?? styling.mainColor} />
            </View>
        </TouchableOpacity>
    )
}