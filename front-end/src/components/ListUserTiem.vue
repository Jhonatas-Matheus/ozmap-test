<template>
    <li>
        <div class="display-info">
            <div><span>Nome: </span>{{ name }}</div>
            <div><span>Idade: </span>{{age}}</div>
            <div><span>Email: </span>{{email}}</div>
        </div>
        <div class="cntrl-btns">
            <button class="btn-edit" :id="id" @click="$event=> $emit('click:buttonEdit', $event.target.id)">Editar</button>
            <button class="btn-exclude" :id="id" @click="$event=> $emit('click:buttonExclude', $event.target.id)">Excluir</button>
        </div>
    </li>
</template>

<script lang="ts">
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        id:{
            type: String,
            required: true
        }
    },
    emits: ['click:buttonEdit', 'click:buttonExclude']

}
</script>


<style lang="scss">
            li {
                display: flex;
                width: 100%;
                min-height: 20%;

                .display-info {
                    span {
                        font-weight: bold;
                        color: #00D256;
                    }

                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 4rem;
                    // background-color: #00D256;
                    // border-bottom: 1px solid #f1f1f1;
                    border-top: 1px solid #f1f1f1;
                    width: 80%;
                    height:100%;
                }

                .cntrl-btns {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                    width: 20%;

                    button {
                        cursor: pointer;
                        border-radius: 5px;
                        border: none;
                        color: #f1f1f1;
                        padding: .5rem;
                        font-weight: 700;
                    }

                    .btn-edit {
                        background-color: #00D256;
                    }

                    .btn-exclude {
                        background-color: #dc3545;
                    }
                }

            }
</style>