import {  useToast, FlatList} from 'native-base';
import {useEffect, useState} from "react"
import { api } from '../services/api';
import {Game, GameProps} from '../components/Game'
import { Loading } from './Loading';
interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsloading] = useState(false)
  const [games, setGames] = useState<GameProps[]>([])
  const toast = useToast()
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  async function handleGuessConfirm(gameId: string) {
    try{
        
        if(firstTeamPoints.trim().length < 1 || secondTeamPoints.trim().length < 1){
          return toast.show({
            title: 'Não é possível enviar palpite em branco.',
            placement: 'top-left',
            bgColor: 'red.500'
        })
      }
      setIsloading(true)
     const a = await api.post(`pools/${poolId}/games/${gameId}/guess`,{
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

  console.log(a)
 
        fetchGames()
     }
     catch(error){
         setIsloading(false)
         return toast.show({
             title: 'Não foi possível enviar o palpite.',
             placement: 'top-left',
             bgColor: 'red.500'
         })
     }
     finally{
      toast.show({
        title: 'Palpite cadastrado com sucesso.',
        placement: 'top-left',
        bgColor: 'green.500'
    })
         setIsloading(false)
     }
}

  async function fetchGames() {
    try{
      setIsloading(false)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
      
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

  useEffect(()=>{
    fetchGames()
  },[poolId])

  if(isLoading){
    return <Loading/>
  }
  return (
    <FlatList
     data={games}
     keyExtractor={item => item.id}
     renderItem={({item})=>(
      <Game
        data={item}
        setFirstTeamPoints={setFirstTeamPoints}
        setSecondTeamPoints={setSecondTeamPoints}
        onGuessConfirm={()=> handleGuessConfirm(item.id)}
      />                     
     )}
     _contentContainerStyle={{pb:10}}
    />
  )
}
