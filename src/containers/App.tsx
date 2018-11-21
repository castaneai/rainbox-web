import React, { Component } from 'react'
import SearchForm from "../components/SearchForm";

interface Props {
    inputValue: string
}

class App extends Component<Props> {
    handleChange(nextValue: string) {
        console.log(`handleChange: ${nextValue}`)
    }

    render() {
        return <div>
            <header>
                <h1>rainbox</h1>
            </header>
            <section>
                <SearchForm value={this.props.inputValue} onChange={this.handleChange} />
            </section>
        </div>
    }
}

export default App