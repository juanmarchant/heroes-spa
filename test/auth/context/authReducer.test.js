import { authReducer } from '../../../src/auth'
describe('Pruebas en authReducer', () => {


    test('debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false })
    })
})