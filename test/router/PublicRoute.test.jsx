import { render, screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Route, Routes } from "react-router-dom"



describe('Haciendo pruebas en PublicRoute', () => {

    test('debe de mostrar el children si no estoy autenticado', () => {

        const contextValue = {
            logged: false
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Rutas Publicas</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Rutas Publicas')).toBeTruthy();
        // screen.debug();
    })

    test('debe de navegar si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Juan'
            }
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Rutas Publicas</h1>
                            </PublicRoute>
                        } />

                        <Route path="marvel" element={<h1>Pagina Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
        // screen.debug();
    })
})