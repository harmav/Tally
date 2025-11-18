import ThemeButton from "@/components/ThemeButton";
import ThemeText from "@/components/ThemeText";
import ViewingCard, { ViewCardInterface } from "@/components/ViewingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { ViewingInterface } from "../viewings/[id]";

export default function HomeTab() {
    const router = useRouter() 
    const [viewings, setViewings] = useState<ViewCardInterface[]>([])

    useFocusEffect(() => {
        AsyncStorage.getItem("viewings").then(data => {
            if(!data) {
                setViewings([])
                return
            }

            var parsedData: ViewingInterface[] = JSON.parse(data);
            setViewings(parsedData)
        })
    })

    return(
        <View style={{flex: 1}}>
            {
                viewings.length === 0 ? (
                    <View style={{alignItems: "center", justifyContent: "center", gap: 13}}>
                        <ThemeText>No events found!</ThemeText>
                        <ThemeButton title="Add event" onPress={() => router.replace("/(tabs)/add")} />
                    </View>
                ) : null
            }
            <FlatList
                keyExtractor={(p) => p.id.toString()}
                data={viewings}
                renderItem={(p) => <ViewingCard props={p.item} />}
                contentContainerStyle={{gap: 24}}
                
            />
        </View>
    )
}