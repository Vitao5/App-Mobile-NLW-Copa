import { ReactNode,createContext, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Home } from "../screens/New";
import { SignIn } from "../screens/SignIn";


WebBrowser.maybeCompleteAuthSession()

interface UserProps {
    name: string,
    avatarUrl: string
}

interface AuthProviderProps{
    children: ReactNode
}

export interface AuthContextDataProps{
    user: UserProps;
    signIn: () => Promise<void>,
    isUserLoading: boolean
}

//AuthContext serve para armazenar o contexto
export const  AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthProviderProps){
   
   const [user, setUser] = useState<UserProps>({} as UserProps)
   const [isUserLoading, setUserLoading] = useState(false)

   const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '475647063875-kv9ag74fhqnee9clvpoiesov1i7vaf31.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes:['profile', 'email']
    })

     async function signIn() {
        try{
            setUserLoading(true)
            await promptAsync()
        }
        catch (error){
            console.log(error)
        }
        finally{
            setUserLoading(false)
        }
     }

     async function signInWithGoogle(access_Token: string) {
        console.log(access_Token)
        access_Token ? <Home/> : <SignIn/>
     }

     useEffect(()=>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken)
        }
     }, [response])

     return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
           {children}
        </AuthContext.Provider>
     )
}