import { Stack } from "expo-router";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthHandlerContext } from "./AuthHandler";
import { StylingContext } from "./ThemeHandler";

export default function Root() {
    const {styling} = useContext(StylingContext)
    const {user} = useContext(AuthHandlerContext)
    const spacing = useSafeAreaInsets()

    return <Stack 
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: styling.background,
                paddingTop: spacing.top + 15,
                paddingBottom: spacing.bottom,
                paddingLeft: 20,
                paddingRight: 20
            }
        }}
    >
        <Stack.Protected guard={!user.isLogged}>
            <Stack.Screen name="landing" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!user.isLogged}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={user.isLogged === true}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
    </Stack>
}