import React from "react";
import {VStack, Center, Skeleton} from "native-base";

export function SkeletonComponent() {
    return (
        <Center w="100%">
            <VStack w="100%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
                <Skeleton.Text px="4"/>
            </VStack>
        </Center>
    )
}