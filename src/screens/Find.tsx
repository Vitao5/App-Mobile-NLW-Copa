
import  { Heading, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Option } from "../components/Option";
import {useState} from "react"
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";



export function Find(){
    const [findPool, setFindPool] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const toast = useToast()
    const {navigate} = useNavigation()

    async function findPooll(){
        try{
            setIsloading(true)
            if(!findPool.trim()){
                return toast.show({
                    title: 'Informe o código do bolão',
                    placement: 'top-left',
                    bgColor: 'red.500'
                })
            }
            await api.post('/pools/join', {findPool})
            toast.show({
                title: 'Você entrou no bolão.',
                placement: 'top-left',
                bgColor: 'green.500'
            })
            
            navigate('pools')
        }
        catch(error){
            setIsloading(false)
            if(error.response.data?.message){
                return toast.show({
                    title: `${error.response.data?.message}`,
                    placement: 'top-left',
                    bgColor: 'red.500'
                })
            }
    
        }
    }
    return (
        <VStack bgColor="black.900" flex={1}>
            <Header title="BUSCAR POR CÓDIGO" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
                 <Logo/>
                 <Heading color="white" fontFamily="heading" fontSize="xl" textAlign="center" my={12}>
                   Encontre um bolão através de {'\n'} um código único.
                 </Heading>

                 <Input 
                 rounded="full"
                 placeholder="Qual o código do bolão ?"
                 onChangeText={setFindPool} 
                 autoCapitalize="characters"
                 value={findPool}
                 maxLength={6}
                 />
                 
                 <Button title="BUSCAR BOLÃO" mt={10} onPress={findPooll} isLoading={isLoading} />

                <Option title="swsw" isSelected/>
            </VStack>
        </VStack>
    )
}