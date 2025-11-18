import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps, useContext } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StylingContext } from './ThemeHandler';

interface ThemeIconInterface {
    icon: ComponentProps<typeof Ionicons>["name"];
    size: number;
    color?: string;
    style?: StyleProp<TextStyle>
}

export default function ThemeIcon(props: ThemeIconInterface) {
    const {styling} = useContext(StylingContext)
    return <Ionicons name={props.icon} size={props.size} color={props.color ?? styling.text} style={props.style}></Ionicons>
}