
import  { Heading, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Option } from "../components/Option";

export function Find(){
    return (
        <VStack bgColor="black.900" flex={1}>
            <Header title="BUSCAR POR CÓDIGO" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
                 <Logo/>
                 <Heading color="white" fontFamily="heading" fontSize="xl" textAlign="center" my={12}>
                   Encontre um bolão através de {'\n'} um código único.
                 </Heading>
                 <Input rounded="full" placeholder="Qual o código do bolão ?"/>
                 <Button title="BUSCAR BOLÃO" mt={10}/>
                <Option title="swsw" isSelected/>
            </VStack>
        </VStack>
    )
}