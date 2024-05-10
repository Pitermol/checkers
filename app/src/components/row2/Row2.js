import React from "react";
import ReactDOM from 'react-dom';
import './Row2.css';
import Cell_black from '../cell_black/Cell_black.js';
import Cell_white from '../cell_white/Cell_white.js';

class Row2 extends React.Component {
    constructor(props) {
        super(props);
        this.refs = this.props.refs;
        this.row_id = Number(this.props.id[1]);
        this.click_func = this.props.onCellClickRef;
        this.onCellClick = this.onCellClick.bind(this);
        this.state = {
            is_highlighted_row: Array(8).fill(0),
            checkers_row: Array(8).fill(0)
        }
    }
    onCellClick = (e) => {
        switch (e.target.id[2]) {
            case ("a"): {
                this.click_func(this.row_id, 0);
                break;
            };
            case ("b"): {
                this.click_func(this.row_id, 1);
                break;
            };
            case ("c"): {
                this.click_func(this.row_id, 2);
                break;
            };
            case ("d"): {
                this.click_func(this.row_id, 3);
                break;
            };
            case ("e"): {
                this.click_func(this.row_id, 4);
                break;
            };
            case ("f"): {
                this.click_func(this.row_id, 5);
                break;
            };
            case ("g"): {
                this.click_func(this.row_id, 6);
                break;
            };
            case ("h"): {
                this.click_func(this.row_id, 7);
                break;
            };
            
        }
    }
    render() {
        <tr className="row_2_wrapper">
            <Cell_black ref={this.refs[0]} id={"c" + String(this.row_id) + "a"} onClick={this.onCellClick} />
            <Cell_white ref={this.refs[1]} id={"c" + String(this.row_id) + "b"} onClick={this.onCellClick} />
            <Cell_black ref={this.refs[2]} id={"c" + String(this.row_id) + "c"} onClick={this.onCellClick} />
            <Cell_white ref={this.refs[3]} id={"c" + String(this.row_id) + "d"} onClick={this.onCellClick} />
            <Cell_black ref={this.refs[4]} id={"c" + String(this.row_id) + "e"} onClick={this.onCellClick} />
            <Cell_white ref={this.refs[5]} id={"c" + String(this.row_id) + "f"} onClick={this.onCellClick} />
            <Cell_black ref={this.refs[6]} id={"c" + String(this.row_id) + "g"} onClick={this.onCellClick} />
            <Cell_white ref={this.refs[7]} id={"c" + String(this.row_id) + "h"} onClick={this.onCellClick} />
        </tr>
    }
}

export default Row2;
