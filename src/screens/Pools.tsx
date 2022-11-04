
import  {Icon, Text, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import {Fontisto} from "@expo/vector-icons"

export function Pools(){
    return (
        <VStack bgColor="black.900" flex={1}>
            <Header title="MEUS  BOLÕES"/>
            <VStack mt={8} mx={5} borderBottomWidth={2} borderBottomColor="gray.600" pb={4} mb={4}>
                 <Button 
                 title="BUSCAR BOLÃO POR CÓDIGO" 
                 leftIcon={<Icon as = {Fontisto} name="search" color="gray.600" size="md" marginRight={5}/>}
                 />
                 <Text color="gray.200"  fontSize="sm" mt={10} textAlign="center">Você ainda não está participando de nenhum bolão, que tal buscar um por código ou criar um novo?</Text>
            </VStack>
        </VStack>
    )
}