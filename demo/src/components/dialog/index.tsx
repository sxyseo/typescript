import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.scss';

interface propsInterface {
    [index: string]: string;
    trigger: string;
    title: string;
    message: string;
}

export class DialogComponent extends React.Component<any, any> {
    constructor(props:propsInterface) {
        super();
        this.state = {item: null, show: false};
        document.getElementById(props.trigger).addEventListener('click', this.show.bind(this), false);
    }
    show(e: any) {
        e.preventDefault();
        this.setState({show: true});
    }
    close(e: any) {
        e.preventDefault();
        this.setState({show: false});
    }
    render() {
        return (
            <div className="dialog" style={{display: this.state.show === false ? 'none' : 'block'}}>
                <div className="dialog-overlayer">
                    <div className="dialog-box">
                        <div className="dialog-head">
                            <a href="javascript:;" className="dialog-close" onClick={this.close.bind(this)}>X</a>
                            {this.props.title}
                        </div>
                        <div className="dialog-content">{this.props.message}</div>
                        <div className="dialog-foot"></div>
                    </div>
                </div>
            </div>
        );
    }
}