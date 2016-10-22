import * as React from "react";
import * as ReactDOM from "react-dom";
import { TimePicker } from "./components/timePicker";

export class CustimizeList extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            wheelviewDisplay: false,
            time : '00:00'
        }
    }
    showTimePicker (type: any) {
        this.setState({
            wheelviewDisplay: true
        });
    }
    getPickedData(time: any) {
        this.setState({
            wheelviewDisplay: false,
            time: time
        });
    }
    change () {
    }
    render () {
        const [ hour, minute ] = this.state.time.split(':');
        return (
            <div>
                <input type="text" value={this.state.time} onChange={this.change} onClick={this.showTimePicker.bind(this)}/>
                <TimePicker
                    hour={+hour}
                    minute={+minute}
                    wheelviewDisplay={this.state.wheelviewDisplay}
                    getPickedData={this.getPickedData.bind(this)}
                />
            </div>
        )
    }
}
ReactDOM.render(
    <CustimizeList />,
    document.getElementById('container')
)
