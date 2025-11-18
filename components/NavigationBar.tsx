import { StyleSheet, View } from "react-native";
import ThemeIcon from "./ThemeIcon";
import ThemeText from "./ThemeText";

export default function NavigationBar() {
    return(
        <View style={styles.navigation}>
            <ThemeIcon icon="ticket-sharp" size={32} />
            <ThemeText size={24} style={{ fontWeight: "bold" }}>TALLY</ThemeText>
        </View>
    )
}


const styles = StyleSheet.create({
    navigation: {
        flexDirection: "row",
        gap: 13,
        alignItems: "center",
        marginBlockEnd: 22
    }
})