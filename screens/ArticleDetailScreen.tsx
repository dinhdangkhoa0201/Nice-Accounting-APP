import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Center,
    Heading,
    HStack,
    ScrollView,
    Skeleton,
    Spinner,
    Stack,
    Text,
    useToast,
    View,
    VStack
} from "native-base";
import {ArticleModel} from "../models/ArticleModel";
import {articleAPI} from "../api/ArticleAPI";
import Markdown from 'react-native-markdown-renderer';
import {SkeletonComponent} from "../components/SkeletonComponent";

export function ArticleDetailScreen({navigation, route}: any) {
    /**
     * START: Variable
     */
    const [article, setArticle] = useState<ArticleModel>();
    const toast = useToast();
    const toastIdRef = useRef();
    /**
     * END: Variable
     */

    /**
     * START: Function
     */
    useEffect(() => {
        if (route.params.id) {
            showToast();
            articleAPI.findById(route.params.id)
                .then(data => {
                    setArticle(data.object);
                    toast.close(toastIdRef.current);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    const showToast = () => {
        toastIdRef.current = toast.show({
            duration: null,
            render: () => {
                return (
                    <HStack space={2} justifyContent="center">
                        <Spinner accessibilityLabel="Loading data"/>
                        <Heading color="primary.500" fontSize="md">
                            Loading
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
        <View style={{padding: 10}} h={"100%"} bg={"info.300"}>
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
                        <Stack space={2}>
                            {
                                article ?
                                    <>
                                        <Heading size="md" ml="-1">
                                            {article.code} - {article.name}
                                        </Heading>
                                        <Text fontSize="xs" _light={{
                                            color: "violet.500"
                                        }} _dark={{
                                            color: "violet.400"
                                        }} fontWeight="500" ml="-0.5" mt="-1">
                                            Mô tả: {article.desc}
                                        </Text>
                                    </> :
                                    <Skeleton.Text px="3"/>
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <Box bg={"info.50"} h={"100%"} rounded={8} style={{padding: 5}}>
                {
                    article ?
                        <Markdown children={article.content}/> :
                        <SkeletonComponent/>
                }
            </Box>
        </View>
    )
}