import React from "react";
import ReactDOM from 'react-dom';
import './Cell_white.css';
import black from '../../static/black.png';
import white from '../../static/white.png';
import black_king from '../../static/black_king.png';
import white_king from '../../static/white_king.png';

class Cell_white extends React.Component {
    constructor() {
        this.state = {
            checker_cell: 0,  // 0 - нет шашки, 1 - белая, 2 - черная, 3 - белая дамка, 4 - черная дамка
            is_highlighted_cell: 0
        }
    }
    
    render() {
        <td className="cell_white_wrapper" style={border=this.state.is_highlighted_cell == 1 ? "6px ridge #43a60e;" : this.state.is_highlighted_cell == 2 ? "6px ridge #b39500" : this.state.is_highlighted_cell == 3 ? "6px ridge #991400" : "4px groove #a68a0e;"}>
            {this.state.checker_cell == 1 ? 
            <img src={white}></img> : 
            this.state.checker_cell == 2 ? 
            <img src={black}></img> : 
            this.state.checker_cell == 3 ? 
            <img src={white_king}></img> : 
            this.state.checker_cell == 4 ? 
            <img src={black_king}></img> : ""}
        </td>
    }
}

export default Cell_white;
