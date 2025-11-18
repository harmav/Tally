import { useRouter } from "expo-router";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Tag from "./Tag";
import ThemeIcon from "./ThemeIcon";
import ThemeText from "./ThemeText";

export interface ViewCardInterface {
    thumb: string,
    id: string,
    date: string,
    title: string,
    tags: string[]
} 

export default function ViewingCard({props}:{props:ViewCardInterface}) {
    const router = useRouter()
    function go() {
        router.replace(`/viewings/${props.id}`)    
    }

    return(
        <View style={{gap: 8}}>
            <TouchableOpacity onPress={() => go()}>
                <View style={{gap: 8, flex: 1}}>
                    <Image style={{width: "100%", height: 170, borderRadius: 20}} source={{uri: props.thumb}} />
                    <ThemeText style={{fontWeight: "bold"}} size={20}>{props.title}</ThemeText>

                    <View style={{gap: 10, flexDirection: "row", alignItems: "center"}}>
                        <ThemeIcon icon="calendar-outline" size={16}></ThemeIcon>
                        <View style={{gap: 10, flexDirection: "row"}}>
                            <ThemeText>{new Date(props.date).toDateString()}</ThemeText>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

                <ScrollView contentContainerStyle={{paddingVertical: 10, gap: 8, flexDirection: "row"}} horizontal={true}>
                    {props.tags.length > 0 ? props.tags.map((x, i) => <Tag key={i}>{x}</Tag>) : null}
                </ScrollView>
        </View>
    )
}