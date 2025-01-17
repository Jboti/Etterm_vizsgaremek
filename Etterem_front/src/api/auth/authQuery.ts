import axiosClient from "@/lib/axios"
import type { emailVertifyData, LoginData, LoginResponse, RegistrationData, ResetPasswordData, SetPasswordData, SetPasswordResponse } from "./auth"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { useRoute, useRouter } from "vue-router"
import { QUERY_KEYS } from "@/utils/queryKeys"


const registration = async (data: RegistrationData) => {
    const response = await axiosClient.post("http://localhost:3000/api/v1/create-user", data)
    console.log(response)
    console.log(response.status)
    console.log(response.data)
    return response.data
}

export const useRegistration = () => {
    const { push } = useRouter()
    
    return useMutation({
        mutationFn: registration,
        onSuccess() {
            push({ name: 'email-sent' })
        },
        // onError(error: any) {
        //     if (error.error === 'Username is already in use') {
        //         alert('The username is already taken. Please choose another one.')
        //     } else if (error.message === 'Email is already in use') {
        //         alert('The email is already registered. Please use another one.')
        //     }
        // },
    })
}

const emailVertification = async (data: emailVertifyData) => {
    const response = await axiosClient.patch("http://localhost:3000/api/v1/vertify-user", data)
    return response.data.data
}

export const useEmailVertification = () => {
    const {push} = useRouter()
    return useMutation({
        mutationFn: emailVertification,
        onSuccess() {
            push({name:'Főoldal'})
            
        },
    })
}


const putSetPassword = async (token: string, data: SetPasswordData) => {
    const response = await axiosClient.put(`http://localhost:3000/api/v1/set-password/${token}`, data)
    return response.data
}

export const usePutSetPassword = () => {
    const {push} = useRouter()
    return useMutation(
        {
            mutationFn: ({token, data} : { token: string, data: SetPasswordData }) => putSetPassword(token, data),
            onSuccess() {
                push({name:'Bejelentkezés'})
            },
        }
    )
}


const Login = async (data: LoginData) : Promise<LoginResponse> => {
    const response = await axiosClient.post('http://172.22.1.219/api/v1/login', data)
    return response.data.data
}

export const useLogin = () => {
    const {push} = useRouter()
    return useMutation({
        mutationFn:Login,
        onSuccess(data){
            localStorage.token = data.token
            push({name:'Home'})
        }
    })
}


const postPasswordReset = async ( data: ResetPasswordData) => {
    const response = await axiosClient.post(`http://172.22.1.219/api/v1/password-reset`, data)
    return response.data.data
}

export const usePostPasswordReset = () => {
    const {push} = useRouter()
    return useMutation(
        {
            mutationFn: postPasswordReset,
            onSuccess(data) {
                push({name: 'password-reset', params: {token: data.token}})
            },
        }
    )
}


const getPasswordReset = async () : Promise<SetPasswordResponse> => {
    const {params} = useRoute()
    const response = await axiosClient.get(`http://172.22.1.219/api/v1/password-reset/${params.token}`)
    return response.data
}

export const useGetPasswordReset = () => {
    return useQuery(
        {
            queryKey: [QUERY_KEYS.passwordReset],
            queryFn: getPasswordReset,
        }
    )
}


const putPasswordReset = async (token: string, data: SetPasswordData) => {
    const response = await axiosClient.put(`http://172.22.1.219/api/v1/password-reset/${token}`, data)
    return response.data
}

export const usePutPasswordReset = () => {
    const {push} = useRouter()
    return useMutation(
        {
            mutationFn: ({token, data} : { token: string, data: SetPasswordData }) => putPasswordReset(token, data),
            onSuccess() {
                push({name:'Bejelentkezés'})
            },
        }
    )
}