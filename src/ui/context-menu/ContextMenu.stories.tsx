import ContextMenu from "./ContextMenu";

export default {
    title: "UI/Context Menu",
    component: ContextMenu,
    tags: ["autodocs"],
}

export const Default = () => {
    return (
        <ContextMenu
            x={100}
            y={100}
            items={[
                {
                 
                    label: "Item 1",
                    path: "Item 1",
                    action: () => console.log("Item 1 clicked"),
                },
                {
                    label: "Item 2",
                    path: "Item 2",
                    action: () => console.log("Item 2 clicked"),
                    children: [
                        {
                            label: "Sub Item 1",
                            path: "Sub Item 1",
                            action: () => console.log("Sub Item 1 clicked"),
                        },
                        {
                            label: "Sub Item 2",
                            path: "Sub Item 2",

                            children: [
                                {
                                    label: "Sub Sub Item 1",
                                    path: "Sub Sub Item 1",
                                    action: () => console.log("Sub Sub Item 1 clicked"),
                                },
                            ]
                        },
                    ],
                },
            ]}
            onClose={() => console.log("Context menu closed")}
        />
    )
}
