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
            this.setState(state => {
                var newLength = eval(state.length + number);
                if (newLength > 0 && newLength <= 60) {
                    return {
                        length: newLength
                    }
                }
                return {
                    length: state.length
                }
            })
        }
    }

    render() {
        return <div className="length-control">
            <p id={`${this.props.name.toLowerCase()}-label`}>{this.props.name} Length</p>
            <button className="btn-level">
                <i id={`${this.props.name.toLowerCase()}-decrement`} className="fa fa-arrow-down fa-2x" onClick={e => this.add(-1)}></i>
            </button>
            <p className="btn-level" id={`${this.props.name.toLowerCase()}-length`}>{this.state.length}</p>
            <button className="btn-level">
                <i id={`${this.props.name.toLowerCase()}-increment`} className="fa fa-arrow-up fa-2x" onClick={e => this.add(1)}></i>
            </button>
        </div>
    }
}

export default LengthSetting;