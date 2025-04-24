import DropdownItem from "./DropdownItem";

export default {
    title: 'Dropdown/DropdownItem',
    component: DropdownItem,
}

export const Default = () => (
    <DropdownItem label="Item 1" onClick={() => console.log('Item 1 clicked')} />
)

export const Nested = () => (
    <DropdownItem label="Item 1" onClick={() => console.log('Item 1 clicked')} expandOnHover={true} style={{ width: '200px' }}>
        <DropdownItem label="Subitem 1.1" onClick={() => console.log('Subitem 1.1 clicked')} style={{ width: '200px' }} />
        <DropdownItem label="Subitem 1.2" onClick={() => console.log('Subitem 1.2 clicked')} style={{ width: '200px' }} />
    </DropdownItem>
)