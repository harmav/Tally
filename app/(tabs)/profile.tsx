import { AuthHandlerContext, MockUser } from "@/components/AuthHandler"
import ImageInput from "@/components/ImageInput"
import StringInput from "@/components/StringInput"
import ThemeButton from "@/components/ThemeButton"
import { StylingContext } from "@/components/ThemeHandler"
import { UpdateUser } from "@/utilities/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Formik } from "formik"
import { useContext } from "react"
import { View } from "react-native"
import * as yup from "yup"

export default function ProfileTab() {
    const {styling} = useContext(StylingContext)
    var schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        profile: yup.mixed()
    });
    const {user, logout} = useContext(AuthHandlerContext)

    function doUpdateUser(form: MockUser) {
        UpdateUser(form);
    }

    return(
        <View style={{gap: 18}}>
            <View style={{marginBlockEnd: 16}}>
                <Formik 
                    validationSchema={schema}
                    onSubmit={v => doUpdateUser(v)}
                    initialValues={{password: user.password, username: user.username, profile: user.profile, isLogged: true}}>
                        {
                            ({ values, errors, handleSubmit, handleChange, setFieldValue, handleBlur }) => (
                                <View style={{ gap: 32 }}>
                                    <View style={{margin: "auto"}}>
                                        <ImageInput value={user.profile} title="Profile" style={{height: 150, width: 150,}} error={errors.profile} 
                                            onChange={(uri) => setFieldValue("profile", uri)} 
                                            />
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
        
                                        <ThemeButton title="Edit profile" onPress={() => handleSubmit()} />
                                </View>
                            )
                        }
                    </Formik>
            </View>

            <ThemeButton 
                onPress={() => AsyncStorage.clear()}
                title="Clear Data" 
                style={{backgroundColor: styling.textError}} />
            <ThemeButton 
                onPress={() => logout()}
                title="Logout" 
                style={{backgroundColor: styling.textError}} />
        </View>
    )
}