import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { ImageBackground, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { StylingContext } from "./ThemeHandler";
import ThemeIcon from "./ThemeIcon";
import ThemeText from "./ThemeText";

export interface ThumbnailInputInterface {
    title: string,
    value?: string,
    style?: StyleProp<ViewStyle>,
    onChange?: (uri: string) => void;
    onBlur?: () => void;
    error?: string
}

export default function ImageInput(props: ThumbnailInputInterface) {
    const {styling} = useContext(StylingContext)
    const [state, setState] = useState<string>()

    async function getImage() {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status != "granted") {
            props.onBlur ? props.onBlur() : null
            return
        }

        let img = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            mediaTypes: ["images"],
        })

        if(!img.canceled) {
            setState(img.assets[0].uri as string);
            props.onChange ? props.onChange(img.assets[0].uri as string) : null
        } else {
            props.onBlur ? props.onBlur() : null
        }
    }

    return(
        <TouchableOpacity onPress={() => getImage()}>
            <View style={{gap: 6}}>
                <ThemeText>{props.title}</ThemeText>
                <ImageBackground 
                    source={{uri: state ?? props.value}}
                    style={{
                        borderColor: styling.mainColor, borderStyle: "dashed", overflow: "hidden",
                        borderRadius: 17, borderWidth: 2, alignItems: "center", justifyContent: "center",
                        ...props.style as any
                    }}
                    >
                        <ThemeIcon icon="camera" size={32} color={styling.mainColor} />
                    </ImageBackground>
                {props.error ? <ThemeText color={styling.textError}>{props.error}</ThemeText> : null}
                </View>
        </TouchableOpacity>
    )
}