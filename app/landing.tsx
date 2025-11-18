import ThemeButton from "@/components/ThemeButton";
import ThemeText from "@/components/ThemeText";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Landing() {
    const router = useRouter()

    return(
        <View style={{flex: 1, justifyContent: "center", gap: 32}}>
            <ThemeText size={36} style={{marginHorizontal: "auto"}}>Welcome to Tally</ThemeText>
            <ThemeButton title="Login" onPress={() => router.replace("/login")} />
        </View>
    )
}