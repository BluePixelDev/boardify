
import "i18next"
import en from "@locales/en/translation.json"
import cs from "@locales/cs/translation.json"


declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            en: typeof en
            cs: typeof cs
        }
    }
}

export interface FeatureItem {
    title: string
    description: string
    icon: string
}