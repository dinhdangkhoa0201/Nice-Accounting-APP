import React, {useEffect, useLayoutEffect, useState} from "react";
import {
    Box, Button,
    Center,
    Heading,
    HStack,
    Icon,
    Pressable,
    ScrollView,
    Spinner,
    Text,
    useToast,
    View,
    VStack
} from "native-base";
import {CategoryModel} from "../models/CategoryModel";
import {categoryAPI} from "../api/CategoryAPI";
import {FlatList, SafeAreaView} from "react-native";
import {serverConstant} from "../components/ServerConstant";
import {AntDesign, FontAwesome5, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {ScreenName} from "../constants/ScreenName";
import {SkeletonComponent} from "../components/SkeletonComponent";
import {SafeAreaConsumer} from "react-native-safe-area-context";
import {useRef} from "react";

export function CategoryScreen({navigation}: any) {
    /**
     * START: Variable
     */
    const [lisCategory, setListCategory] = useState<Array<CategoryModel>>();
    const toast = useToast();
    const toastIdRef = useRef();
    /**
     * END: Variable
     */
    /**
     * START: Function
     */

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button bg={"white"} leftIcon={<Icon as={Ionicons} name={"refresh-outline"}/>}
                        onPress={() => loadData()} size={"xs"}/>
            ),
        })
    })

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        showToast("Loading data");
        setListCategory([]);
        categoryAPI.findAll()
            .then(data => {
                if (data.object) {
                    setListCategory(data.object);
                    toast.close(toastIdRef.current);
                } else {
                    showToast("No data");
                }
            })
            .catch(error => {
                console.log(error.message);
                console.log(error);
            })
    }

    /**
     * END: Function
     */

    const renderItem = ({item}: any) => (
        <Item id={item.id} title={item.name}/>
    );

    const Item = ({id, title}: any) => (
        <Box alignItems="center">
            <Pressable w="100%" onPress={() => navigation.navigate(ScreenName.ArticleScreen, {id: id})} mb={2}>
                {({
                      isHovered,
                      isFocused,
                      isPressed
                  }) => {
                    return <Box key={id} borderWidth="1" borderColor="coolGray.300" shadow="3"
                                bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "primary.400"} p="3"
                                rounded="8" style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <Text color="coolGray.800" fontWeight="light" fontSize="lg">
                            {title}
                        </Text>
                    </Box>;
                }}
            </Pressable>
        </Box>
    )

    const showToast = (msg: string) => {
        toastIdRef.current = toast.show({
            render: () => {
                return (
                    <HStack space={2} justifyContent="center">
                        <Spinner accessibilityLabel="Loading data"/>
                        <Heading color="primary.500" fontSize="md">
                            {msg}
                        </Heading>
                    </HStack>
                )
            },
        })
    }

    return (
        <View style={{padding: 10}} bg={"primary.200"} h={"100%"}>
            {
                lisCategory ?
                    <FlatList data={lisCategory}
                              renderItem={renderItem}/> :
                    <SkeletonComponent/>
            }
        </View>
    )
}