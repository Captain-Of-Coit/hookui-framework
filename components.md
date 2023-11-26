# Components

## `$Panel`

```jsx
<$Panel title="Hello" react={React}>
    <h3>Waddup world</h3>
</$Panel>
```

## `$Meter`

```jsx
<$Meter label="Electricity Availability" value={75} gradient="maxGood" />

<$Meter label="Fire Hazard" value={25} gradient="minGood" />
```

## `$Field`

```jsx
const $InteractiveField = ({react}) => {
    const [checked, setChecked] = react.useState(false)
    return <$Field label="Toggle Me" checked={checked} onToggle={setChecked} />
}
```