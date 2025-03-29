type DialogConatainerProps = {
    children: JSX.Element | JSX.Element[]
}

export default function DialogContainer(props: DialogConatainerProps) {
    return <div className={"dialog-container"}>
        {props.children}
    </div>
}