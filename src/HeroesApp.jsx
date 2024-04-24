import { AppRouter } from "./router/AppRouter"
import { AuthProvider } from "./auth/context/AuthProvider"


export const HeroesApp = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
