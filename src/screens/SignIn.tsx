
import {Center, Icon, Text } from "native-base";
import Logo from "../assets/logo.svg"
import {Button} from "../components/Button";
import { Fontisto} from "@expo/vector-icons"

import { useAuth } from "../hooks/useAuth";

export function SignIn(){
    const {signIn, user} = useAuth()
    return (
        <Center flex={1} bgColor="black.900">    
            <Logo/>

        
            <Button 
                type="SECONDARY"
                title="ENTRAR COM O GOOGLE"
                leftIcon={<Icon as = {Fontisto} name="google" color="white" size="md"/>}
                mt={12}
                onPress={SignIn}
            />
                <Text color="gray.200"  fontSize="sm" mt={10} textAlign="center">
                    Não utilizamos nenhuma informação além {'\n'}do seu e-mail para criação de sua conta.
                </Text>
      </Center>
    )
}