<template>
    <section>
        <aside>
            <Select></Select>
            <ColorInput label="background" v-model="site.background" />
            <ColorInput label="body" v-model="site.body" />
            <ColorInput label="font" v-model="site.font" />
            <ColorInput label="selection" v-model="site.selection" />
            <ColorInput label="line" v-model="site.line" />
            <Accent label="accent" :accents="site.accents"></Accent>
            <button @click="reset">{{ $t('reset') }}</button>
        </aside>
        <main>
            <article>
                <div>
                    <a :class="{ 'a-selected': i18n.global.locale === 'zh' }" @click="changeLang('zh')">中文</a>
                    <a :class="{ 'a-selected': i18n.global.locale === 'en' }" @click="changeLang('en')">English</a>
                </div>
                <h1>{{ $t('title') }}</h1>
                <p>{{ $t('desc') }}</p>
                <h4>
                    {{ $t('currentTheme') }}: <strong>{{ site.name }}</strong>
                </h4>
                <div>
                    <a :class="{ 'color-format-selected': colorFormat === 'hex' }" class="color-format" @click="changeColorFormat('hex')">hex</a>
                    <a :class="{ 'color-format-selected': colorFormat === 'rgb' }" class="color-format" @click="changeColorFormat('rgb')">rgb</a>
                    <a :class="{ 'color-format-selected': colorFormat === 'hsl' }" class="color-format" @click="changeColorFormat('hsl')">hsl</a>
                </div>
                <code>
                    <pre>{{ code }}</pre>
                </code>
            </article>
        </main>
    </section>
</template>

<script lang="ts" setup>
import { colord } from 'colord'
import i18n from './i18n'
import useSiteStore from './stores/site'
import useTheme from './hooks/useTheme'
import Select from './components/select/index.vue'
import ColorInput from './components/color-input/index.vue'
import Accent from './components/accent/index.vue'
import { ref } from 'vue'

const site = useSiteStore()

const { backgroundColor, bodyColor, fontColor, selectionColor, lineColor, accentColor } = useTheme()

const reset = () => {
    site.$reset()
}

const changeLang = (lang: LangType) => {
    site.setLang(lang)
}

const colorFormatHandlers = {
    hex: (c: string): string => {
        return colord(c).toHex()
    },
    rgb: (c: string): string => {
        return colord(c).toRgbString()
    },
    hsl: (c: string): string => {
        return colord(c).toHslString()
    }
}

const colorFormat = ref<ColorFormat>('hex')
const code = ref(JSON.stringify(site.$state, null, '  '))
const changeColorFormat = (fmt: ColorFormat) => {
    colorFormat.value = fmt
    const handler = colorFormatHandlers[fmt]

    const state: Record<string, any> = {
        mode: 'dark',
        name: 'dracula',
        background: handler(site.background),
        body: handler(site.body),
        font: handler(site.font),
        selection: handler(site.selection),
        line: handler(site.line),
        accents: site.accents.map(value => handler(value)),
        accent: handler(site.accent)
    }

    code.value = JSON.stringify(state, null, '  ')
}
</script>

<style lang="scss">
body {
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    letter-spacing: 1px;

    section {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: v-bind(backgroundColor) !important;
        color: v-bind(fontColor) !important;
        caret-color: v-bind(fontColor) !important;

        aside {
            width: 400px;
            height: 100%;
            overflow: auto;
            border-right: 1px solid v-bind(lineColor);
            background-color: transparent;
            padding: 20px;
            box-sizing: border-box;

            button {
                margin-top: 20px;
                height: 30px;
                width: 100px;
                border: 1px solid v-bind(lineColor);
                background-color: transparent;
                color: inherit;
                border-radius: 4px;
                cursor: pointer;
                transition: box-shadow 0.2s linear;

                &:hover {
                    box-shadow: 0 0 1px 1px v-bind(lineColor);
                }
            }
        }
        main {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 20px;
            box-sizing: border-box;

            article {
                width: 70%;
                height: 96%;
                border-radius: 10px;
                overflow: auto;
                background-color: v-bind(bodyColor);

                a {
                    margin-right: 10px;
                    cursor: pointer;
                    transition: all 0.2s linear;

                    &:hover {
                        color: v-bind(accentColor);
                    }
                }

                .a-selected {
                    border-bottom: 1px solid v-bind(lineColor);
                }

                h1 {
                    color: v-bind(accentColor);
                    border-bottom: 2px dashed v-bind(lineColor);
                    padding-bottom: 5px;
                }

                strong {
                    color: v-bind(accentColor);
                }

                .color-format {
                    display: inline-block;
                    border: 1px solid v-bind(lineColor);
                    height: 30px;
                    width: 100px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 4px;
                }
                .color-format-selected {
                    border: 1px solid v-bind(accentColor);
                    color: v-bind(accentColor);
                }
                code {
                    font-size: 14px;
                    line-height: 1.6;
                }
            }
        }
    }
}

::selection {
    background-color: v-bind(selectionColor) !important;
}
</style>
