import React from "react";
import {NativeBaseProvider} from "native-base"
import {Navigation} from "./navigation/Navigation";
import { LogBox } from 'react-native';

export default function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    return (
        <NativeBaseProvider>
            <Navigation/>
        </NativeBaseProvider>
    );
}
