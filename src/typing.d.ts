declare type Mode = 'light' | 'dark'

declare type LangType = 'zh' | 'en'

declare type ColorFormat = 'hex' | 'rgb' | 'hsl'

declare interface Theme {
    mode: Mode
    name: string
    background: string
    body: string
    font: string
    selection: string
    line: string
    accents: string[]

    accent: string
}
