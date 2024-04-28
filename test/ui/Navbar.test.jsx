import { fireEvent, render, screen } from "@testing-library/react"

import { Navbar } from "../../src/ui"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../src/auth"

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))


describe('Pruebas en <Navbar/>', () => {
    test('debe de mostrar el nombre de usuario', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Juan Marchant'
            }
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>

        )

        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
        // screen.debug();
    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        const setLogoutMock = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Juan Marchant'
            },
            logout: setLogoutMock
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>

        )

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement)

        expect(contextValue.logout).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", { "replace": true }
        );
    })
})