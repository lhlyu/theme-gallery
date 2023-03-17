<template>
    <Field label="theme">
        <div class="theme">
            <select v-model="site.name" @change="changeTheme">
                <option v-for="t in themes" :value="t.name">{{ t.mode }} - {{ t.name }}</option>
            </select>
        </div>
    </Field>
</template>

<script setup lang="ts">
import Field from '../field/index.vue'
import useTheme from '../../hooks/useTheme'
import useSiteStore from '../../stores/site'
import { themes } from '../../themes'

const { lineColor, accentColor } = useTheme()

const site = useSiteStore()

const changeTheme = () => {
    site.changeTheme(site.name)
}
</script>

<style scoped lang="scss">
.theme {
    margin-top: 6px;
    padding: 0 6px;
    border: 1px solid v-bind(lineColor);
    height: 30px;
    width: 100%;

    box-sizing: border-box;
    border-radius: 4px;
    select {
        border: 0;
        height: 100%;
        width: 100%;
        outline: none;
        background-color: transparent;
        color: inherit;
    }
}
</style>
