import {NavigationContainer} from "@react-navigation/native"
import AppRoutes from "./app.routes"
import { useAuth } from "../hooks/useAuth"

import { SignIn } from "../screens/SignIn"
import { Box } from "native-base"
 
export default function Routes(){
  const {user} = useAuth()
    return(
        <Box flex={1} bg="grey.900">
          <NavigationContainer>
            {user.name ? <AppRoutes/> : <SignIn/>}
          </NavigationContainer>
        </Box>
    )
 }