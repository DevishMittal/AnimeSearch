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
const Card = ({ title }) => {
    return (
    <div>
    <h2>{title}</h2>

        <button onClick={() => {setHasLiked(true)}}></button>
    </div>
    )
    }

const App = () => {
    const [hasLiked,setHasLiked ]  = useState(false);
    return (
        <div className="card-container">
        <Card title={"Hello"}/>
            <Card title={"Vite"}/>
            <Card title={"kahnnd"}/>
        </div>
            )
}

export default App
