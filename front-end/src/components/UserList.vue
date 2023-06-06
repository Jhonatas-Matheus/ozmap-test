<template>
    <ul>
        <slot></slot>
    </ul>
</template>

<script lang="ts">
export default{}
</script>
<style lang="scss">
        ul {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            color: #f1f1f1;
            height: 100%;
            margin: 2rem;
            padding: 2rem 0;
            overflow-y: auto;
            overflow-x: hidden;

            &::-webkit-scrollbar-thumb {
                height: 30px;
                background-color: #f1f1f1;
                border-radius: 20px;
            }

            &::-webkit-scrollbar {

                width: 3px;
            }



            // background-color: #f1f1f1;
        }
</style>