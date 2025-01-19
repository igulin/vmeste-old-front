import instance from "@/axios";
import {IResetPassword, ISupportPayload, PropsWithAccessToken, UserDataType, UserSupportType} from "@/api/types";


const AuthService = {
    async login(email: string, password: string) {
        const { data, status, headers } = await instance.post<PropsWithAccessToken<UserDataType>>('/login', {
            email: email,
            password: password
        })

        return data
    },
    async authAccountMe() {
        const {data} = await instance.get('api/auth/user')

        return data ? data : null
    },
    async sendSupportMessage(payload: ISupportPayload) {
        const {data} = await instance.post<UserSupportType>('support/send-message', {
            email: payload.email,
            text: payload.text
        })

        return data ? data : null
    },
    async resetPassword(payload: IResetPassword) {
        const {data} = await instance.post(`/reset-password/${payload.hash}/${payload.token}`, {
            newPassword: payload.newPassword,
            againNewPassword: payload.againPassword
        })

        return data
    },
    async resetPasswordByEmail(email: string) {
        const {data} = await instance.post('/reset-password/', {
            email: email
        })

        return data
    },
    async logout() {
        const {data} = await instance.post('/logout')

        return data
    }
}

export default AuthService