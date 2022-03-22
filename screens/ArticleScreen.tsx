import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    AspectRatio,
    Badge,
    Box, Button,
    Center,
    Heading,
    HStack,
    Icon,
    Image,
    Pressable,
    Skeleton,
    Spinner,
    Stack,
    Text,
    useToast,
    View
} from "native-base";
import {FlatList} from "react-native";
import {ArticleModel} from "../models/ArticleModel";
import {ScreenName} from "../constants/ScreenName";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {categoryAPI} from "../api/CategoryAPI";
import {CategoryModel} from "../models/CategoryModel";
import {articleAPI} from "../api/ArticleAPI";
export function ArticleScreen({navigation, route}: any) {
    /**
     * START: Variable
     */
    const [category, setCategory] = useState<CategoryModel>();
    const [listArticle, setListArticle] = useState<Array<ArticleModel>>()
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
        setCategory(null);
        setListArticle([]);
        if (route.params.id) {
            categoryAPI.findById(route.params.id)
                .then(data => {
                    setCategory(data.object);
                })
                .catch(error => {

                })
            showToast("Loading data");
            articleAPI.findByCategoryId(route.params.id)
                .then(data => {
                    if (data.object) {
                        setListArticle(data.object);
                        toast.close(toastIdRef.current);
                    } else {
                        showToast("No data");
                    }
                })
                .catch(error => {

                })
        }
    }

    const renderItem = ({item}: any) => (
        <Item id={item.id} code={item.code} title={item.name}/>
    );

    const Item = ({id, code, title}: any) => (
        <Box alignItems="center">
            <Pressable w="100%" onPress={() => navigation.navigate(ScreenName.ArticleDetailScreen, {id: id})} mb={2}>
                {({
                      isHovered,
                      isFocused,
                      isPressed
                  }) => {
                    return <Box key={id} borderWidth="1" borderColor="coolGray.300" shadow="3"
                                bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "warning.400"} p="3"
                                rounded="8" style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <Text color="coolGray.800" fontWeight="light" fontSize="lg">
                            {code} - {title}
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
    /**
     * END: Function
     */

    return (
        <View style={{padding: 10}} h={"100%"} bg={"warning.100"}>
            <Box alignItems="center">
                <Box w={"100%"} rounded="8" overflow="hidden" mb={2} borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Stack p="4" space={3}>
                        {
                            category ?
                                <>
                                    <Stack space={2}>
                                        <Heading size="md" ml="-1">
                                            {category?.name}
                                        </Heading>
                                        <Text fontSize="xs" _light={{
                                            color: "violet.500"
                                        }} _dark={{
                                            color: "violet.400"
                                        }} fontWeight="500" ml="-0.5" mt="-1">
                                            Mô tả: {category?.desc}
                                        </Text>
                                    </Stack>
                                </> :
                                <Skeleton.Text px={3}/>
                        }
                    </Stack>
                </Box>
            </Box>
            {
                listArticle ?
                    <FlatList data={listArticle}
                              renderItem={renderItem}/> :
                    <SkeletonComponent/>
            }
        </View>
    )
}

import {SkeletonComponent} from "../components/SkeletonComponent";
