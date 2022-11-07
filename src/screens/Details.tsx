import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import {useEffect, useState} from "react"
import { Loading } from "../components/Loading";
import {PoolCardProps} from "../components/PoolCard"
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import {Share} from "react-native"
import { Guesses } from "../components/Guesses";


interface RouteParams{
    id: string
}

export default function Details(){
    
    const route = useRoute()
    const [optionSelect, setOptionsSelected] = useState<'guesses' | 'ranking'>('guesses')
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)
    const {id } = route.params as RouteParams
    const [isLoading, setIsloading] = useState(false)
    const toast = useToast()


    async function findBolao() {
        try{
            setIsloading(false)
     
                const response = await api.get(`/pools/${id}`)
                setPoolDetails(response.data.pool)
            
         }
         catch(error){
             setIsloading(false)
             return toast.show({
                 title: 'Ocorreu um erro ao buscar o bolão.',
                 placement: 'top-left',
                 bgColor: 'red.500'
             })
         }
         finally{
             setIsloading(false)
         }
    }


    async function handleCodeShare() {
        await Share.share({
          message: `Use o código ${poolDetails.code} para entrar no meu bolão NLW Copa`
        })
    }

    if(isLoading){ return (<Loading/>)}


    useEffect(()=>{
        findBolao()
    },[id])

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header 
                title={poolDetails.title} 
                showBackButton 
                showShareButton
                onShare={handleCodeShare}
            />
                      
            {
                poolDetails._count?.participants > 0 ? 
                <VStack px={5} flex={1}>
                    
                    <PoolHeader data={poolDetails}/>
                        <HStack bgColor="gray.900" p={5} rounded="sm" >
                            <Option 
                            title="Seus palpites" 
                            isSelected={optionSelect === 'guesses'}
                            onPress={()=> setOptionsSelected('guesses')}
                            />

                            <Option 
                            title="Ranking do grupo" 
                            isSelected={optionSelect === 'ranking'}
                            onPress={()=> setOptionsSelected('ranking')}
                            />
                        </HStack>              
                     <Guesses poolId={poolDetails.id}/>
                </VStack>

                :
                <EmptyMyPoolList code={poolDetails.code}/>
            }

        </VStack>
    )
}