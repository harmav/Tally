import { useContext } from "react";
import { Text, View } from "react-native";
import { StylingContext } from "./ThemeHandler";

interface TagInterface {
    children: React.ReactNode;
}

export default function Tag(props: TagInterface) {
    const {styling} = useContext(StylingContext)
    return(
        <View style={{backgroundColor: styling.tag, paddingInline: 10, paddingBlock: 6, borderRadius: 16}}>
            <Text style={{color: styling.tagText, fontSize: 10}}>
                {props.children}
            </Text>
        </View>
    )
}