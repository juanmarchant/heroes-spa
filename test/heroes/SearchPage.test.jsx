import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../src/heroes/pages/SearchPage"


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en SearchPage', () => {

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();
    })

    test('debe de mostrar a batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )
        const inputElement = screen.getByRole('textbox');
        expect(inputElement.value).toBe('batman')

        const imgElement = screen.getByRole('img');
        expect(imgElement.src).toContain('/assets/heroes/dc-batman.jpg')

        // screen.debug();
    })

    test('debe de mostrar un error si no se encuentra el heroe', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const status = screen.getByLabelText('initial-danger')

        // screen.debug();
        expect(status.innerHTML).toBe('No hero with <b>batman123</b>');
    })

    test('debe de llamar el navigate a la pantalla nueva', () => {


        const inputValue = 'superman'
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { name: 'searchText', value: inputValue } })

        const formElement = screen.getByLabelText('form');
        fireEvent.submit(formElement);

        expect(mockUseNavigate).toHaveBeenCalledWith('?q=superman');
    })
})