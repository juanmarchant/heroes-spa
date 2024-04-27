import { authReducer, types } from '../../../src/auth'


describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false })
    })

    test('debe de (login) llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Juan marchant'
            }
        }


        const { logged, user } = authReducer({ logged: true }, action)

        expect(logged).toBeTruthy();
        expect(user).toEqual(action.payload)


    })

    test('debe de logout borrar el name del usuario y logged en fase  ', () => {

        const action = {
            type: types.logout,
        }
        const { logged, user } = authReducer({ logged: true }, action)

        expect(logged).not.toBeTruthy();
    })
})