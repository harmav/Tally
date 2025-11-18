import NavigationBar from "@/components/NavigationBar";
import { StylingContext } from "@/components/ThemeHandler";
import ThemeIcon from "@/components/ThemeIcon";
import { Tabs } from "expo-router";
import { useContext } from "react";

export default function TabRoot() {
    const {styling} = useContext(StylingContext)
    return(
        <>
            <NavigationBar />
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: { 
                    borderTopWidth: 0,
                    backgroundColor: "rgba(26, 26, 26, 1)",
                    borderRadius: 16,
                    boxShadow: "none",
                    elevation: 0,
                },
                sceneStyle: {backgroundColor: "transparent"},
            }}
            >
                <Tabs.Screen 
                    name="home" 
                    options={{title: "HOME", tabBarIcon: (props) => (
                            <ThemeIcon icon="home" size={22} color={props.color} />
                    ),
                    tabBarActiveTintColor: styling.mainColor,
                    tabBarInactiveTintColor: styling.textGray
                    }} 
                />
                <Tabs.Screen 
                    name="add" 
                    options={{title: "ADD", tabBarIcon: (props) => (
                            <ThemeIcon icon="add" size={22} color={props.color} />
                    ),
                    tabBarActiveTintColor: styling.mainColor,
                    tabBarInactiveTintColor: styling.textGray
                    }} 
                />
                <Tabs.Screen 
                    name="profile" 
                    options={{title: "PROFILE", tabBarIcon: (props) => (
                            <ThemeIcon icon="cog" size={22} color={props.color} />
                    ),
                    tabBarActiveTintColor: styling.mainColor,
                    tabBarInactiveTintColor: styling.textGray
                    }} 
                />
            </Tabs>
        </>
    )
}