import {atom} from "recoil"

export enum ModalTypes {
    Login = "login",
    Register = "register",
    ForgotPass = "forgotpassword"

}
type AuthModalState = {
    isOpen : Boolean,
    type: ModalTypes,
}

const initialAuthModalState : AuthModalState = {
    isOpen: false,
    type: ModalTypes.Login
}
export const authModalState = atom<AuthModalState>({
    key:"authModalState",
    default:initialAuthModalState

})