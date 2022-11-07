
import  { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Option } from "../components/Option";
import { useState } from "react";
import { api } from "../services/api";



export default function New(){
    const [title, setTitle] = useState('')
    const toast = useToast()
    const [isLoading, setIsloading] = useState(false)
    async function handlePoolCreate(){
        if(!title.trim()){
            setTitle('')
            return toast.show({
                title: 'Informe o nome do bolão',
                placement: 'top-left',
                bgColor: 'red.500'
            })
        }

        
        try{
            setIsloading(true)

           const codigoPool = await api.post('/pools', {title: title.toUpperCase()})
           if(codigoPool.data.code){
            setTitle('')
            
            return toast.show({
                title: 'Sucesso ao criar um bolão.',
                placement: 'top-left',
                bgColor: 'green.500'
            })
           }
        }
        catch(error){
            return toast.show({
                title: 'Ocorreu um erro ao criar bolão.',
                placement: 'top-left',
                bgColor: 'red.500'
            })
        }
        finally{
            setIsloading(false)
        }
        
    }

    return (
        <VStack bgColor="black.900" flex={1}>
            <Header title="CRIE UM NOVO BOLÃO"/>
            <VStack mt={8} mx={5} alignItems="center">
                 <Logo/>

                 <Heading color="white" fontFamily="heading" fontSize="xl" textAlign="center" my={12}>
                    Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
                 </Heading>

                 <Input 
                 rounded="full"
                 placeholder="Qual vai ser o nome do bolão ?"  
                 onChangeText={setTitle}
                 value={title}
                 />

                 <Button 
                 title="CRIAR MEU BOLÃO" 
                 mt={10} 
                 onPress={handlePoolCreate}
                 isLoading={isLoading}
                 />

                 <Text color="gray.200"  fontSize="sm" mt={10} textAlign="center">
                 Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
                <Option title="swsw" isSelected/>
            </VStack>
        </VStack>
    )
}