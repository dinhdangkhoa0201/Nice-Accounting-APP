import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {ScreenName} from "../constants/ScreenName";
import {CategoryScreen} from "../screens/CategoryScreen";
import {ArticleScreen} from "../screens/ArticleScreen";
import {ArticleDetailScreen} from "../screens/ArticleDetailScreen";

const Stack = createNativeStackNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ScreenName.CategoryScreen}>
                <Stack.Screen name={ScreenName.CategoryScreen}
                              options={{
                                  title: "Loại Tài Khoản",
                              }}
                              component={CategoryScreen}/>
                <Stack.Screen name={ScreenName.ArticleScreen}
                              options={{
                                  title: "Danh Sách Tài Khoản"
                              }}
                              component={ArticleScreen}/>
                <Stack.Screen name={ScreenName.ArticleDetailScreen}
                              options={{
                                  title: "Nội Dung"
                              }}
                              component={ArticleDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

