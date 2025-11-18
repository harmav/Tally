import { useContext } from "react";
import { BlurEvent, TextInput, View } from "react-native";
import { StylingContext } from "./ThemeHandler";
import ThemeText from "./ThemeText";

interface StringInputInterface {
    title: string,
    placeholder: string,
    onChange?: (e: string) => void
    onBlur?: (e: BlurEvent) => void
    error?: string
    value?: string,
    multiline?: boolean
}

export default function StringInput(props: StringInputInterface) {
    const {styling} = useContext(StylingContext)
    return(
        <View style={{gap: 6}}>
            <ThemeText>{props.title}</ThemeText>
            <TextInput 
                value={props.value}
                style={{
                    borderWidth: 1, 
                    borderColor: styling.mainColor,
                     borderRadius: 10, 
                     paddingHorizontal: 13, 
                     color: styling.mainColor,
                    }}
                placeholder={props.placeholder} 
                placeholderTextColor={styling.textGray}
                onChangeText={(t) => props.onChange ? props.onChange(t) : null}
                onBlur={(b) => props.onBlur ? props.onBlur(b) : null} 
                multiline={props.multiline}
                />
                {props.error ? <ThemeText color={styling.textError}>{props.error}</ThemeText> : null}
        </View>
    )
}