import React, { Component } from "react";

interface Props {
    value: string
    onChange: (value: string) => void
}

class SearchForm extends Component<Props> {
    private input: HTMLInputElement | null = null

    private getInputValue() {
        if (this.input === null) {
            return ''
        }
        return this.input.value
    }

    handleGoClick() {
        this.props.onChange(this.getInputValue())
    }

    render() {
        return (
            <div>
                <input type="text" ref={input => this.input = input} />
                <button onClick={this.handleGoClick}>Go</button>
            </div>
        )
    }
}

export default SearchForm