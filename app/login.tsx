import { AuthHandlerContext, MockUser } from "@/components/AuthHandler";
import StringInput from "@/components/StringInput";
import ThemeButton from "@/components/ThemeButton";
import { StylingContext } from "@/components/ThemeHandler";
import ThemeText from "@/components/ThemeText";
import { GetUser } from "@/utilities/api";
import { useFocusEffect, useRouter } from "expo-router";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { View } from "react-native";
import * as yup from "yup";

export default function Login() {
    var schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    });
    const {styling} = useContext(StylingContext);
    const {user, login, checkToken} = useContext(AuthHandlerContext)
    const [error, setError] = useState("")
    const router = useRouter()

    useFocusEffect(() => {
        doCheckToken()
    })

    async function doCheckToken() {
        const token = await checkToken()
            if(token) {
                const user = await GetUser();
                login(user ? JSON.parse(user) : {username: "123", password: "123", profile: "", isLogged: false})
                    .then(() => router.replace("/(tabs)/home"))
            }
    }
    
    function doLogin(v: MockUser) {
        login({...v, isLogged: true}).then(() => router.push("/(tabs)/home")).catch(error => setError(error))
    }

    return(
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Formik 
            validationSchema={schema}
            onSubmit={doLogin}
            initialValues={{password: "", username: "", profile: "", isLogged: false}}>
                {
                    ({ values, errors, handleSubmit, handleChange, handleBlur }) => (
                        <View style={{ gap: 32 }}>
                            <ThemeText style={{marginHorizontal: "auto"}} size={34}>Login to Tally</ThemeText>
                            <View style={{margin: "auto"}}>
                                {error ? <ThemeText style={{color: styling.textError}} size={24}>{error}</ThemeText> : null}
                            </View>
                            <StringInput
                                value={values.username} placeholder="Enter username" 
                                title="Username"
                                onChange={handleChange("username")}
                                onBlur={handleBlur("username")}
                                error={errors.username}
                                />
                            <StringInput 
                                value={values.password} placeholder="Enter password" 
                                title="Password"
                                onChange={handleChange("password")}
                                onBlur={handleBlur("password")}
                                error={errors.password}
                                />

                                <ThemeButton title="Log-in" onPress={() => handleSubmit()} />
                        </View>
                    )
                }
            </Formik>
        </View>
    )
}