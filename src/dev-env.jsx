import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import $Panel from './components/panel'
import $Field from './components/field'
import $Meter from './components/meter'
import $Button from './components/button'
import $Header from './components/header'
import $Label from './components/label'

const $InteractiveField = ({react}) => {
    const [checked, setChecked] = react.useState(false)
    return <$Field label="Clickety Rickety" checked={checked} onToggle={setChecked} />
}

const noop = (...args) => {
    console.log('noop', args)
    window.alert("Results: " + JSON.stringify(args, null, 2))
}

const $PanelExample = ({label, children, panelProps}) => {
    const [showing, setShowing] = React.useState(false)
    const changingLabel = (showing ? "Hide" : "Show") + " Example " + label

    let toRender = null
    let finalPanelProps = panelProps || {}

    if (showing) {
        toRender = <$Panel title="Hello" react={React} onClose={() => setShowing(false)} {...finalPanelProps}>
            {children}
        </$Panel>
    }

    return <div>
        <$Button onClick={() => setShowing(!showing)} label={changingLabel}/>
        {toRender}
    </div>
}

const $PanelOutsideState = () => {
    const [showing, setShowing] = React.useState(false)
    const [pos, setPos] = React.useState({top: 700, left: 700})
    const [size, setSize] = React.useState({width: 600, height: 300})

    const changingLabel = (showing ? "Hide" : "Show") + " With State"

    let toRender = null
    let finalPanelProps = {
        initialPosition: pos,
        initialSize: size,
        onPositionChange: (new_pos) => setPos(new_pos),
        onSizeChange: (new_size) => setSize(new_size),
    }

    if (showing) {
        toRender = <$Panel title="Hello" react={React} onClose={() => setShowing(false)} {...finalPanelProps}>
            <div>Position</div>
            <pre>{JSON.stringify(pos, null, 2)}</pre>
            <div>Size</div>
            <pre>{JSON.stringify(size, null, 2)}</pre>
        </$Panel>
    }

    return <div>
        <$Button onClick={() => setShowing(!showing)} label={changingLabel}/>
        <div>Position</div>
        <pre>{JSON.stringify(pos, null, 2)}</pre>
        <div>Size</div>
        <pre>{JSON.stringify(size, null, 2)}</pre>
        {toRender}
    </div>
}

const _examples = {
    "panel": [
        <$PanelExample label="Barebones">
            <h3>Waddup world</h3>
        </$PanelExample>,
        <$PanelExample label="With stuff">
            <h3>Waddup world</h3>
            <$InteractiveField react={React}/>
            <$Meter label="minGood Test 75" value={75} gradient="minGood" />
            <$Button label="Test Button"/>
        </$PanelExample>,
        <$PanelExample label="With initial position and size" panelProps={{initialPosition: {top: 500, left: 500}, initialSize: {width: 300, height: 100}}}>
            <div>Hello</div>
        </$PanelExample>,
        <$PanelOutsideState/>
    ],
    "field": [
        <$Field label="Left-hand Traffic" checked={true} onToggle={noop}/>,
        <$Field label="Unlimited Money" checked={false} onToggle={noop}/>,
        <$InteractiveField react={React}/>
    ],
    "meter": [
        <$Meter label="maxGood Test 25" value={25} gradient="maxGood" />,
        <$Meter label="maxGood Test 50" value={50} gradient="maxGood" />,
        <$Meter label="maxGood Test 75" value={75} gradient="maxGood" />,
        <$Meter label="maxGood Test 100" value={100} gradient="maxGood" />,
        <hr/>,
        <$Meter label="minGood Test 25" value={25} gradient="minGood" />,
        <$Meter label="minGood Test 50" value={50} gradient="minGood" />,
        <$Meter label="minGood Test 75" value={75} gradient="minGood" />,
        <$Meter label="minGood Test 100" value={100} gradient="minGood" />,
    ],
    "button": [
        <$Button label="Test Button"/>,
        <$Button label="window.alert" onClick={() => window.alert('hello there')}/>
    ],
    "header": [
        <$Header>Test Header</$Header>
    ],
    "label": [
        <$Label>Test Label</$Label>
    ]
}

const currentPage = () => {
    return window.location.hash.substring(1)
}


const $App = () => {
    const [examples, setExamples] = useState(_examples);

    const [selected, setSelected] = useState(null);

    React.useEffect(() => {
        const handleHashChange = () => {
            setSelected(currentPage())
        }
        setSelected(currentPage())

        window.addEventListener('hashchange', handleHashChange)

        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    })

    const $components_keys = Object.keys(examples).map((k) => {
        const color = selected === k ? "#526DE4" : "#455FCF"
        return <div onClick={() => window.location.hash = k}
                    style={{display: "block", color: color}}
                >
            {k} {selected === k ? "<" : ""}
        </div>
    })

    const selected_examples = examples[selected] || []

    const $examples = selected_examples.map((example) => {
        return <div style={{margin: 10, padding: 10}}>
            {example}
        </div>
    })

    return <div style={{display: "flex", flexDirection: 'row'}}>
        <div id="sidebar" style={{width: "20%"}}>
            <div><strong>Components</strong></div>
            <div style={{marginTop: 10, marginBottom: 10}}>
                <div>Currently selected:</div>
                <div>{selected || "*None*"}</div>
            </div>
            <div>
                <div>These are the components:</div>
                <div>{$components_keys}</div>
            </div>
        </div>
        <div id="preview" style={{width: "50%"}}>
            <div style={{borderBottom: "2px solid #5d6170"}}><strong>Preview</strong></div>
            <div>{$examples}</div>
        </div>
    </div>
}

ReactDOM.render(<$App/>, document.querySelector('#root'))