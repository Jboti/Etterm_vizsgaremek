<script lang="ts" setup>
import type { SetPasswordData } from '@/api/auth/auth';
import { useGetPasswordReset, useGetSetPassword, usePutPasswordReset, usePutSetPassword } from '@/api/auth/authQuery';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { data } = useGetPasswordReset()

const { back } = useRouter()
const { params }= useRoute()

const {mutate, isPending} = usePutPasswordReset()

const setPasswordDataRef = ref<SetPasswordData>({
    password: '',
    password_confirmation: '',
})
</script>


<template>
    <v-card v-if="data?.status === 'success'">
        <v-card-title>Új jelszó beállítás</v-card-title>
        <v-card-text>
            <v-text-field v-model="setPasswordDataRef.password" label="Jelszó" variant="outlined" type="password"></v-text-field>
            <v-text-field v-model="setPasswordDataRef.password_confirmation" label="Jelszó megerősítése" variant="outlined" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="() =>{
                mutate({token: String(params.token), data :setPasswordDataRef})
            }" :loading="isPending">
                Küldés
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-else>
        <v-card-title>Hiba</v-card-title>
        <v-card-text>Kérjük próbálja meg újra!</v-card-text>
        <v-card-actions>
            <v-btn @click="() => {back()}">Vissza</v-btn>
        </v-card-actions>
    </v-card>
</template>