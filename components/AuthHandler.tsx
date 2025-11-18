import { GetUser } from '@/utilities/api';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useState } from "react";

export interface MockUser {
    username: string,
    password: string,
    profile: string,
    isLogged: boolean
}

export interface MockUserContext {
    user: MockUser,

    logout: () => void
    login: (v: MockUser) => Promise<void>,
    checkToken: () => Promise<string | null>
}

const AuthHandlerContext = createContext<MockUserContext>({
    user: {username: "", password: "", profile: "", isLogged: false},
    logout: () => null,
    login: () => Promise.resolve(),
    checkToken: () => Promise.resolve("")

});
let fakeUser = {
    username: "123",
    password: "123",
    profile: "",
    isLogged: true
}

const AuthHandler = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<MockUser>({username: "", password: "", profile: "", isLogged: false})

    async function login(v: MockUser) {
        const user = await GetUser();
        if(user)
            fakeUser = JSON.parse(user);

        if(v.username === fakeUser.username && v.password === fakeUser.password) {
            setUser(fakeUser)
            SecureStore.setItemAsync("token", (Math.random() * 999999).toString())
            return Promise.resolve()
        }
        else {
            return Promise.reject("Wrong credentials")
        }
    }

    function logout() {
        setUser({username: "", password: "", profile: "", isLogged: false})
        SecureStore.deleteItemAsync("token")
    }

    async function checkToken() {
        return await SecureStore.getItemAsync("token") ?? null;
    }
    
    return(
        <AuthHandlerContext.Provider value={{ user, login: login, logout: logout, checkToken }}>{ children }</AuthHandlerContext.Provider>
    )
};

export { AuthHandler, AuthHandlerContext };

