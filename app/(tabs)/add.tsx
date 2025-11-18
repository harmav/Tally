import ImageInput from "@/components/ImageInput";
import StringInput from "@/components/StringInput";
import Tag from "@/components/Tag";
import ThemeButton from "@/components/ThemeButton";
import ThemeIcon from "@/components/ThemeIcon";
import ThemeText from "@/components/ThemeText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from 'formik';
import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import * as YUP from 'yup';
import { ViewingInterface } from "../viewings/[id]";

export interface ViewingSchemaInterface {
    title: string;
    description: string;
    tagString: string
    date: string,
    thumb: string;
    startTime: string,
    endTime: string;
    location: string
}

export default function Add() {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showStartTime, setShowStartTime] = useState(false)
    const [showEndTime, setShowEndTime] = useState(false)
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const eventSchema = YUP.object<ViewingSchemaInterface>().shape({
        title: YUP.string().min(2).required(),
        location: YUP.string().min(2).required(),
        description: YUP.string(),
        tagString: YUP.string(),
        date: YUP.date(),
        startTime: YUP.date(),
        endTime: YUP.date(),
        thumb: YUP.mixed().required("Image is required")
    })
    
    function close() {
        setShowDatePicker(false)
        setShowStartTime(false)
        setShowEndTime(false)
    }

    async function submitViewing(item: ViewingSchemaInterface) {
        var items = await AsyncStorage.getItem("viewings")
        var newViewing: ViewingInterface = {
                id: (id as string) ?? Math.floor(Math.random() * 999999).toString(),
                title: item.title,
                tags: item.tagString.length > 0 ? item.tagString.split(",").map(x => x.trim()) : [],
                startTime: item.startTime.toString(),
                endTime: item.endTime.toString(),
                thumb: item.thumb,
                description: item.description,
                date: item.date.toString(),
                location: item.location
            }
        if(items) {
            var parsedItems: ViewingInterface[] = JSON.parse(items)
            if(id) {
                const index = parsedItems.findIndex(x => x.id === id as string)
                parsedItems[index] = newViewing
            } else {
                parsedItems.push(newViewing)
            }

            await AsyncStorage.setItem("viewings", JSON.stringify(parsedItems))
        } else {
            await AsyncStorage.setItem("viewings", JSON.stringify([newViewing]))
        }

        router.replace(`/viewings/${newViewing.id}`)
    }

    return(
        <ScrollView style={{marginBottom: 12}}>
            <Formik 
                initialValues={{
                    title: "", 
                    tagString: "", 
                    description: "", 
                    date: null, 
                    startTime: null, 
                    endTime: null,
                    location: "",
                    thumb: "",
                }} 
                validationSchema={eventSchema} 
                onSubmit={(v) => submitViewing(v as any)}>
                {
                    ({handleChange, handleBlur, resetForm, setFieldValue, values, errors, handleSubmit}) => {
                        useEffect(() => {
                            if(id) {
                                AsyncStorage.getItem("viewings").then(data => {
                                    if(!data) 
                                        return
                                    
                                    var parsedData: ViewingInterface[] = JSON.parse(data)
                                    var viewing = parsedData.find(x => x.id === id as string) 
                                    if(!viewing) 
                                        return;

                                    setFieldValue("title", viewing.title, false)
                                    setFieldValue("tagString", viewing.tags.join(", "), false)
                                    setFieldValue("description", viewing.description, false)
                                    setFieldValue("thumb", viewing.thumb, false)
                                    setFieldValue("location", viewing.location, false)
                                    setFieldValue("date", new Date(viewing.date), false)
                                    setFieldValue("startTime", new Date(viewing.startTime), false)
                                    setFieldValue("endTime", new Date(viewing.endTime), false)
                                })
                            }
                        }, [])

                        return (
                            <>
                                <ThemeText size={30} style={{marginBottom: 10}}>
                                    {id ? "Edit Event" : "Create Event"}
                                </ThemeText>
                                <View style={{gap: 10}}>
                                    <StringInput 
                                        onChange={handleChange("title")}
                                        onBlur={handleBlur("title")}
                                        title="Title" 
                                        placeholder="Enter title" 
                                        value={values.title} 
                                        error={errors.title} />
                                    <StringInput 
                                        onChange={handleChange("description")}
                                        onBlur={handleBlur("description")}
                                        title="Description" 
                                        placeholder="Enter description" 
                                        value={values.description}
                                        multiline={true} />
                                    <StringInput 
                                        onChange={handleChange("location")}
                                        onBlur={handleBlur("location")}
                                        title="Location" 
                                        placeholder="Enter location"
                                        value={values.location}
                                        error={errors.location}
                                        multiline={true} />
                                    <StringInput 
                                        onChange={handleChange("tagString")}
                                        onBlur={handleBlur("tagString")}
                                        title="Tags" 
                                        placeholder="Enter Tags (comma separated)" 
                                        />
                                    
                                    {
                                        values.tagString.length > 0 ?
                                        <FlatList 
                                        data={values.tagString.split(",")} 
                                        horizontal={true}
                                        contentContainerStyle={{gap: 8}}
                                        renderItem={(x) => <Tag>{x.item.trim()}</Tag>} />
                                        : null
                                    }
                                    
                                    <ImageInput title="Thumbnail" value={values.thumb} style={{height: 150}} error={errors.thumb} 
                                        onChange={(uri) => setFieldValue("thumb", uri)} 
                                        />
                                    <View style={{gap: 10, marginVertical: 16}}>
                                        <View style={{gap: 10, flexDirection: "row"}}>
                                            <ThemeIcon icon="calendar" size={20} />
                                            <View>
                                                <ThemeText>
                                                    {values.date ? (values.date as Date).toDateString() : "No date selected"}
                                                </ThemeText>
                                                <View style={{gap: 6, flexDirection: "row", alignItems: "center"}}>
                                                    <ThemeText>
                                                        {values.startTime ? (values.startTime as Date).toTimeString() : "No start selected"}
                                                    </ThemeText>
                                                    <ThemeIcon icon="arrow-forward-sharp" size={16} />
                                                    <ThemeText>
                                                        {values.endTime ? (values.endTime as Date).toTimeString() : "No start selected"}
                                                    </ThemeText>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <ThemeButton title="Set Date" onPress={() => setShowDatePicker(true)} />
                                    {showDatePicker ? <DateTimePicker 
                                        value={new Date()} 
                                        onChange={(e, date) => {setFieldValue("date", date); close()}} /> 
                                    : null}

                                    <ThemeButton title="Set Start Time" onPress={() => setShowStartTime(true)} />
                                    {showStartTime ? <DateTimePicker 
                                        value={new Date()} 
                                        mode="time" 
                                        onChange={(e, date) => {setFieldValue("startTime", date); close()}}  
                                        /> 
                                    : null}

                                    <ThemeButton title="Set End Time" onPress={() => setShowEndTime(true)} />
                                    {showEndTime ? <DateTimePicker 
                                        value={new Date()} 
                                        mode="time" onChange={(e, date) => {setFieldValue("endTime", date); close()}}  /> 
                                        : null}
                                </View>

                                <View style={{marginBlockStart: 42, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <ThemeButton title="Submit Event" onPress={() => handleSubmit()}  />
                                    <ThemeButton title="Reset" onPress={() => resetForm()}  />
                                </View>
                            </>
                        )
                    }
                }
            </Formik>
        </ScrollView>
    )
}