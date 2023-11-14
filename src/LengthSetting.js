import React from "react";

class LengthSetting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            length: 0
        }

        this.add = this.add.bind(this);
    }

    componentDidMount() {
        this.setState({
            length: this.props.init
        })
    }

    add(number) {
        if (!this.props.hasStarted) {
            this.setState(state => ({
                length: Math.max(eval(state.length + number), 1)
            }))
        }
    }

    render() {
        return <div>
            <p>{this.props.name} Length</p>
            <i onClick={e => this.add(-1)}>Down</i>
            <p>{this.state.length}</p>
            <i onClick={e => this.add(1)}>Up</i>
        </div>
    }
}

export default LengthSetting;