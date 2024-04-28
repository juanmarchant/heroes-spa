import { fireEvent, render, screen } from "@testing-library/react"
import { HeroPage } from "../../src/heroes/pages/HeroPage"
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))


describe('Pruebas en <HeroPage/>', () => {


    test('debe mostar al heroe en caso de que se encuentre', () => {

        const hero = 'marvel-hulk'

        render(
            <MemoryRouter initialEntries={[`/hero/${hero}`]}>
                <Routes>
                    <Route path="hero/:id" element={
                        <HeroPage />
                    } />
                    <Route path="/marvel" element={<h1>Marvel Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        const imgElement = screen.getByRole('img');

        expect(imgElement.src).toContain(`/assets/heroes/${hero}.jpg`)
        expect(screen.getByText('Hulk')).toBeTruthy();
        // screen.debug();
    })

    test('debe de navegar a /marvel en caso de que el heroe no se encuentre', () => {

        const hero = 'notFound'

        render(
            <MemoryRouter initialEntries={[`/hero/${hero}`]}>
                <Routes>
                    <Route path="hero/:id" element={
                        <HeroPage />
                    } />
                    <Route path="/marvel" element={<h1>Marvel Page</h1>} />
                </Routes>
            </MemoryRouter>
        )


        expect(screen.getByText('Marvel Page')).toBeTruthy();
        // screen.debug();
    })

    test('debe navegar a la pagina anterior cuando el boton de regresar sea clickeado', () => {
        render(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        )

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockedUseNavigate).toHaveBeenCalledWith(-1)

        // screen.debug();
    })

    test('debe hacer match con el snapshot', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();
        // screen.debug();
    })
})