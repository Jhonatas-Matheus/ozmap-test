<template>
    <div class="container">
        <main class="left-side">
            <h1>Project Test Ozmap</h1>
            <UserList v-if="users.length > 0">
                <ListUserTiem v-for="user in users" :age="user._age" :id="user._id" :name="user._name" :email="user._email"
                    :key="user._email" @click:button-edit="setCurrentUserId($event)"
                    @click:button-exclude="deleteUser($event)" />
            </UserList>
            <button class="api-btn-redirect" @click="redirectToApi">Documentação API</button>
        </main>
        <aside class="right-side">
            <form @submit.prevent="handleSubmit">
                <h2>{{ textFormTitle }}</h2>
                <InputCustom input-title="Nome" input-place-holder="Ex: John Doe" input-type="text" v-model="name" />
                <InputCustom input-title="Email" input-place-holder="Ex: johndoe@mail.com" input-type="email"
                    v-model="email" />
                <InputCustom input-title="Idade" input-place-holder="Ex: 24" input-type="number" v-model="age" />
                <button class="btn-submit" type="submit">
                    {{ textButton }}
                </button>
            </form>
        </aside>
    </div>
</template>
<style lang="scss">
.container {
    display: flex;
    width: 80%;
    height: 70%;
    margin: auto;
    background-color: #1e1e1e;

    .left-side {
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 70%;
        height: 100%;

        h1 {
            white-space: nowrap;
            width: min-content;
            margin: 2rem;
            border-bottom: 2px solid #00D256;
            color: #f1f1f1;
        }
        .api-btn-redirect{
            position: absolute;
            top: 2rem;
            right: 2rem;
            background-color: #007BFF;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: #f1f1f1;
            font-weight: 700;
            padding: 1rem;
        }


    }

    .right-side {
        display: flex;

        form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin: auto;

            h2 {
                color: #f1f1f1;
                margin-bottom: 2rem;
                text-align: center;
            }

            .btn-submit {
                background-color: #00D256;
                border: none;
                padding: 1rem;
                border-radius: 5px;
                color: #f1f1f1;
                font-weight: 700;
            }
        }

        width: 30%;
        height: 100%;
        border-left: 1px solid #f1f1f1;
        // background-color: green;
    }
}
</style>
<script lang="ts">
import InputCustom from './InputCustom.vue';
import ListUserTiem from './ListUserTiem.vue';
import UserList from './UserList.vue';
import axios, { AxiosError } from 'axios'
interface IUserInput {
    name: string,
    email: string,
    age: number
}
export default {
    components: { ListUserTiem, UserList, InputCustom },
    data() {
        return {
            name: '',
            email: '',
            age: null,
            users: [] as { _id: string, _name: string, _age: number, _email: string }[],
            typeSubmit: 'create',
            currentUserId: '',
            textButton: 'Criar',
            textFormTitle: 'Criar Usuário'
        }
    },
    methods: {
        redirectToApi(){
            window.open('http://localhost:3000/docs','_blank')
        },
        handleSubmit() {
            const userData = {} as IUserInput
            if (this.name) {
                userData.name = this.name;
            }

            if (this.email) {
                userData.email = this.email;
            }

            if (this.age) {
                userData.age = this.age;
            }

            switch (this.typeSubmit) {
                case 'create':
                    this.createUser(userData)
                    break
                case 'update':
                    this.updateUser(this.currentUserId, userData)
                    break
            }
            this.typeSubmit = 'create'
            this.textButton = 'Criar'
            this.textFormTitle = 'Criar Usuário'
            this.name = ''
            this.email = ''
            this.age = null
        },
        setCurrentUserId(id: string) {
            this.currentUserId = id
            this.typeSubmit = 'update'
            this.textButton = 'Atualizar'
            this.textFormTitle = 'Atualizar Usuário'
        },
        async createUser(payload: IUserInput) {
            try {
                const response = await axios.post<{ _id: string, _name: string, _age: number, _email: string }[]>(`http://localhost:3000/user`, payload)
                this.getUsers()
            } catch (error: any) {
                console.log(error)
                //@ts-ignore
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
            }
        },
        async getUsers() {
            const response = await axios.get<{ _id: string, _name: string, _age: number, _email: string }[]>('http://localhost:3000/user')
            this.users = response.data
        },
        async updateUser(id: string, payload: IUserInput) {
            try {
                const response = await axios.patch<{ _id: string, _name: string, _age: number, _email: string }[]>(`http://localhost:3000/user/${id}`, payload)
                this.getUsers()
            } catch (error:any ) {
                //@ts-ignore

                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
            }
        },
        async deleteUser(id: string) {
            try {
                const response = await axios.delete(`http://localhost:3000/user/${id}`)
                this.getUsers()
            } catch (error:any) {
                //@ts-ignore
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
            }
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>