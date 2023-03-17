import { defineStore } from 'pinia'
import i18n from '../i18n'
import { themes } from '../themes'

const defaultTheme: Theme = {
    mode: 'dark',
    name: 'dracula',
    background: '#282a36',
    body: '#282a36',
    font: '#f8f8f2',
    selection: '#44475a',
    line: '#44475a',
    accents: ['#ff79c6', '#f1fa8c', '#ff5555', '#bd93f9', '#ffb86c', '#50fa7b', '#8be9fd'],
    accent: '#ff79c6'
}

const useSiteStore = defineStore({
    id: 'site',
    state: (): Theme => ({
        ...defaultTheme
    }),
    getters: {},
    actions: {
        changeTheme(name: string) {
            this.$state = {
                ...themes[name]
            }
        },
        setLang(lang: LangType) {
            document.documentElement.setAttribute('lang', lang)
            i18n.global.locale = lang
        }
    },
    // 启用持久化
    persist: {
        key: 'theme-gallery',
        storage: window.sessionStorage
    }
})

export default useSiteStore
