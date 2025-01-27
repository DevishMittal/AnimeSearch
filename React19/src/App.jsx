import {useEffect, useState} from 'react'
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
const Card = ({title}) => {
    useEffect(() => {
        console.log(`${title} got ${hasLiked}`)
    })
    const [hasLiked, setHasLiked] = useState(false);
    const [count, setCount] = useState(0);
    return (
        <div className="card" onClick={() => setCount(count + 1)}>
            <h2>{title}</h2>

            <button onClick={() => {
                setHasLiked(!hasLiked)
            }}> {hasLiked ? '❤️' : '🤍'} </button>
        </div>
    )
}

const App = () => {

    return (
        <div className="card-container">
            <Card title={"Demon Slayer"}/>
            <Card title={"Attack On Titan"}/>
            <Card title={"Your lie in April"}/>
        </div>
    )
}

export default App
