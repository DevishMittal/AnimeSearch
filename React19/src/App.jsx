import React, {useState} from 'react'
import Search from "./components/Search.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <main>
            <div className="pattern">
                <div className="wrapper">
                    <header>
                        <img src="./hero.png" alt="Hero Banner" />
                        <h1>
                            Find The right <span className="text-gradient">Anime </span>for you
                        </h1>
                    </header>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <h1 className="text-white"></h1>
                </div>
            </div>
        </main>
    )
}
export default App
