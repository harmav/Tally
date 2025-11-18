import IconButton from "@/components/IconButton";
import { StylingContext } from "@/components/ThemeHandler";
import ThemeIcon from "@/components/ThemeIcon";
import ThemeText from "@/components/ThemeText";
import { ViewCardInterface } from "@/components/ViewingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export interface ViewingInterface extends ViewCardInterface {
    description: string;
    startTime: string; endTime: string;
    location: string;

}

export default function Viewing() {
    const {id} = useLocalSearchParams()
    const {styling} = useContext(StylingContext)
    const router = useRouter()
    const [viewing, setViewing] = useState<ViewingInterface | null>(null)

    useFocusEffect(() => {
        AsyncStorage.getItem("viewings").then(data => {
            if(!data) return
            var parsedData: ViewingInterface[] = JSON.parse(data)
            var viewing = parsedData.find(x => x.id === id as string) 
            if(viewing) 
                setViewing(viewing)
        })
    })

    function goBack() {
        router.canGoBack() ? router.back() : router.replace("/home")
    }

    async function doDelete() {
        const data = await AsyncStorage.getItem("viewings").then(data => {
            if(!data) return
            var parsedData: ViewingInterface[] = JSON.parse(data)
            return parsedData.filter(x => x.id !== viewing!.id as string)
        })
        if(data)
            AsyncStorage.setItem("viewings", JSON.stringify(data)).then(() => router.replace("/(tabs)/home"))
    }

    return(
        viewing ? (
            <>
                <Image source={{uri: viewing.thumb}} style={{position: "absolute", inset: 0, opacity: 0.6}} blurRadius={28} />

                <View style={styles.optionButtons}>
                    <IconButton icon="arrow-back" onClick={() => goBack()} />

                    <View style={{gap: 12, flexDirection: "row"}}>
                        <IconButton icon="heart-outline" background={styling.heartColorGhost} iconColor={styling.heartColor} />
                        <IconButton icon="share" />
                        <IconButton icon="pencil" onClick={() => router.replace(`/(tabs)/add?id=${viewing.id}`)} />
                        <IconButton 
                            background={styling.heartColorGhost} 
                            iconColor={styling.heartColor}
                            icon="trash" 
                            onClick={doDelete} />
                    </View>
                </View>
                <View>

                    <View style={{gap: 10}}>
                        <Image source={{uri: viewing.thumb}} style={{width: "100%", height: 200, borderRadius: 17}} />
                        <ThemeText size={32} style={{fontWeight: "bold"}}>{viewing.title}</ThemeText>
                    </View>

                    <View style={{gap: 10, marginVertical: 16}}>
                        <View style={styles.infoSection}>
                            <ThemeIcon icon="calendar" size={20} />
                            <View>
                                <ThemeText>{new Date(viewing.date).toDateString()}</ThemeText>
                                <View style={{gap: 6, flexDirection: "row", alignItems: "center"}}>
                                    <ThemeText>{new Date(viewing.startTime).toTimeString()}</ThemeText>
                                    <ThemeIcon icon="arrow-forward-sharp" size={16} />
                                    <ThemeText>{new Date(viewing.endTime).toTimeString()}</ThemeText>
                                </View>
                            </View>
                        </View>

                        <View style={styles.infoSection}>
                            <ThemeIcon icon="location" size={20} />
                            <ThemeText>{viewing.location}</ThemeText>
                        </View>

                        <View style={styles.description}>
                            <ThemeText size={24} style={{fontWeight: "bold"}}>Description</ThemeText>
                            <ThemeText>{viewing.description}</ThemeText>
                        </View>
                    </View>
                </View>
            </>
        ) : <ThemeText>Loading...</ThemeText>
    )
}

const styles = StyleSheet.create({
    infoSection: {
        gap: 10,
        flexDirection: "row"
    },
    optionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    description: {
        marginVertical: 18,
        gap: 4
    }
})