
import  { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Option } from "../components/Option";

export function New(){
    return (
        <VStack bgColor="black.900" flex={1}>
            <Header title="CRIE UM NOVO BOLÃO"/>
            <VStack mt={8} mx={5} alignItems="center">
                 <Logo/>
                 <Heading color="white" fontFamily="heading" fontSize="xl" textAlign="center" my={12}>
                    Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
                 </Heading>
                 <Input rounded="full" placeholder="Qual vai ser o nome do bolão ?"/>
                 <Button title="CRIAR MEU BOLÃO" mt={10}/>
                 <Text color="gray.200"  fontSize="sm" mt={10} textAlign="center">
                 Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
                <Option title="swsw" isSelected/>
            </VStack>
        </VStack>
    )
}