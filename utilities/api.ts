import { MockUser } from "@/components/AuthHandler";
import * as SecureStorage from "expo-secure-store";

export function UpdateUser(v: MockUser) {
    SecureStorage.setItemAsync("user", JSON.stringify(v));
}

export function GetUser() {
    return SecureStorage.getItemAsync("user");
}