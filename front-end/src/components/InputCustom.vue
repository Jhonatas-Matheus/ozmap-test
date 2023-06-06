<template>
    <label :for="inputTitle">
        <p>{{ inputTitle }}:</p>
        <input :type="inputType" :name="inputTitle" :placeholder="inputPlaceHolder" :value="modelValue" @input="$event =>$emit('update:modelValue', $event.target.value)">
    </label>
</template>


<style lang="scss">
label{
    p{
        font-weight: 700;
        transition: .5s;
        color: #f1f1f1;
    }
    &:focus-within{
        p{
            color: #00D256;
        }
    }
    input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #f1f1f1;
        padding: .5rem;
        transition: .5s;
        color: #f1f1f1;
        &:focus {
            outline: none;
            border-bottom: 1px solid #00D256;
        }
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
type valuetype = string | number

export default defineComponent({
    props: {
        inputTitle: {
            type: String,
            required: true
        },
        inputPlaceHolder: {
            type: String,
            required: true
        },
        inputType: {
            type: String,
            required: true
        },
        modelValue:{}
    },
    emits:['update:modelValue'],

})
</script>