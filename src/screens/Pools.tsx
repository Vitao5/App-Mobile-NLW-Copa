import { useNavigation,useFocusEffect } from "@react-navigation/native";
import  {Icon, VStack, useToast, FlatList } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import {Fontisto} from "@expo/vector-icons"
import { api } from "../services/api";
import {useCallback, useState} from "react"
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";



export function Pools(){
    const [isLoading, setIsloading] = useState(true)
    const [pools, setPools] = useState<PoolCardProps[]>([])
    const {navigate} = useNavigation()
    const toast = useToast()

    async function fetchPools(){
        try{
           setIsloading(false)
    
               const response = await api.get('/pools')
               setPools(response.data.pools)

           
        }
        catch(error){
            setIsloading(false)
            return toast.show({
                title: 'Ocorreu um erro ao buscar os bolões.',
                placement: 'top-left',
                bgColor: 'red.500'
            })
        }
        finally{
            setIsloading(false)
        }
    }

    useFocusEffect(useCallback(()=>{
        fetchPools()
    },[]))
    return (
        <VStack bgColor="black.900" flex={1}>
            <Header title="MEUS  BOLÕES"/>
            <VStack mt={8} mx={5} borderBottomWidth={2} borderBottomColor="gray.600" pb={4} mb={4}>
                 <Button 
                 title="BUSCAR BOLÃO POR CÓDIGO" 
                 leftIcon={<Icon as = {Fontisto} name="search" color="gray.600" size="md" marginRight={5}/>}
                 onPress={()=> navigate('find')}
                 isLoading={isLoading}
                 />
                 
            </VStack>
           

            { isLoading ? <Loading/> :
            <FlatList
              data={pools}
              keyExtractor={item => item.id}
              renderItem={({item})=> (
              <PoolCard 
              data={item}
              onPress={()=> navigate('details', {id: item.id})}
              />
              ) }
              px={5}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{
                pb:10
              }}
              ListEmptyComponent={()=> <EmptyPoolList/>}
            />}
        
        </VStack>
    )
}