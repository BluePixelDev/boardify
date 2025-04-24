
import "../src/App.css"
import type { StoryDefault } from "@ladle/react"
import React from "react"
import { Provider } from 'react-redux'
import { store } from "../src/store"

export default {
    decorators: [
        (Story: React.FC) => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ]
} satisfies StoryDefault