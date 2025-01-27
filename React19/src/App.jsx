import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//traditional class components
// class classnames extends React.Component {
//     render () {
//         return <h2>Class Components</h2>
//     }
// }

//new way
const Card = () => {
    return (
    <div>
    <h2>Card Component</h2>
    </div>
    )
    }

const App = () => {
    return (
        <div>
        <Card />
        <h2>Hi</h2>
        </div>
            )
}

export default App
