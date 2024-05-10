import "./Game_field.css";
import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import Row1 from '../row1/Row1.js';
import Row2 from '../row2/Row2.js';

class Game_field extends React.Component {
    constructor(props) {
        super(props);
        this.cells = Array(8).fill(Array(8).fill(React.createRef()));
        this.is_white = this.props.is_white;
        this.state = {
            is_highlighted: Array(8).fill(Array(8).fill(0)),
            checkers: [[]],
            is_my_turn: false,
            chosen_check: [-1, -1]
        }
        if (this.is_white) {
            this.setState({checkers: [
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1]
            ], is_my_turn: true});
        } else {
            this.setState({checkers: [
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2]
            ]});
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.cells[i][j].current.setState({checker_cell: this.state.checkers[i][j]})
            }
        }
        this.onCellClick = this.onCellClick.bind(this);
    }
    onCellClick(row, col) {
        if (this.state.is_highlighted[0].filter((el) => el != 0).length + this.state.is_highlighted[1].filter((el) => el != 0).length + 
        this.state.is_highlighted[2].filter((el) => el != 0).length + this.state.is_highlighted[3].filter((el) => el != 0).length + 
        this.state.is_highlighted[4].filter((el) => el != 0).length + this.state.is_highlighted[5].filter((el) => el != 0).length + 
        this.state.is_highlighted[6].filter((el) => el != 0).length + this.state.is_highlighted[7].filter((el) => el != 0).length == 0) {
            if ((((this.state.checkers[row][col] == 1 || this.state.checkers[row][col] == 3) && this.props.is_white) || ((this.state.checkers[row][col] == 2 || this.state.checkers[row][col] == 4) && !this.is_white)) && (this.state.is_my_turn)) {
                let cur_is_highlighted = this.state.is_highlighted;
                let is_eating = false;
                cur_is_highlighted[row][col] = 2;
                this.setState({chosen_check: [row, col]})
                if (this.state.checkers[row][col] < 3) {
                    if (this.is_white) {
                        if (row != 7) {
                            if (col != 0) {
                                if (this.state.checkers[row+1][col-1] == 0) {
                                    cur_is_highlighted[row+1][col-1] = 1;
                                } else if ((this.state.checkers[row+1][col-1] == 2 || this.state.checkers[row+1][col-1] == 4) && row != 6 && col != 1) {
                                    cur_is_highlighted[row+2][col-2] = 1;
                                    cur_is_highlighted[row+1][col-1] = 3;
                                    is_eating = true;
                                }
                            }
                        }
                        if (row != 7) {
                            if (col != 7) {
                                if (this.state.checkers[row+1][col+1] == 0) {
                                    cur_is_highlighted[row+1][col+1] = 1
                                } else if ((this.state.checkers[row+1][col+1] == 2 || this.state.checkers[row+1][col+1] == 4) && row != 6 && col != 6) {
                                    cur_is_highlighted[row+2][col+2] = 1;
                                    cur_is_highlighted[row+1][col+1] = 3;
                                    is_eating = true
                                }
                            }
                        }
                        if (this.state.checkers[row-1][col-1] == 2 || this.state.checkers[row-1][col-1] == 4) {
                            if (row >= 2 && col >= 2) {
                                cur_is_highlighted[row-2][col-2] = 1;
                                cur_is_highlighted[row-1][col-1] = 3;
                            }
                        }
                        if (this.state.checkers[row-1][col+1] == 2 || this.state.checkers[row-1][col+1] == 4) {
                            if (row >= 2 && col >= 2) {
                                cur_is_highlighted[row-2][col+2] = 1;
                                cur_is_highlighted[row-1][col+1] = 3;
                            }
                        }
                    } else {
                        if (row != 0) {
                            if (col != 0) {
                                if (this.state.checkers[row-1][col-1] == 0) {
                                    cur_is_highlighted[row-1][col-1] = 1;
                                } else if ((this.state.checkers[row-1][col-1] == 1 || this.state.checkers[row-1][col-1] == 3) && row != 1 && col != 1) {
                                    cur_is_highlighted[row-2][col-2] = 1;
                                    cur_is_highlighted[row-1][col-1] = 3;
                                    is_eating = true;
                                }
                            }
                        }
                        if (row != 0) {
                            if (col != 7) {
                                if (this.state.checkers[row-1][col+1] == 0) {
                                    cur_is_highlighted[row-1][col+1] = 1
                                } else if ((this.state.checkers[row-1][col+1] == 1 || this.state.checkers[row-1][col+1] == 3) && row != 1 && col != 6) {
                                    cur_is_highlighted[row-2][col+2] = 1;
                                    cur_is_highlighted[row-1][col+1] = 3;
                                    is_eating = true
                                }
                            }
                        }
                        if (row <= 6 && col >= 2) {
                            if (this.state.checkers[row+1][col-1] == 1 || this.state.checkers[row+1][col-1] == 3) {
                                cur_is_highlighted[row+2][col-2] = 1;
                                cur_is_highlighted[row+1][col-1] = 3;
                            }
                        }
                        if (row <= 6 && col >= 2) {
                            if (this.state.checkers[row+1][col+1] == 1 || this.state.checkers[row+1][col+1] == 3) {
                                cur_is_highlighted[row+2][col+2] = 1;
                                cur_is_highlighted[row+1][col+1] = 3;
                            }
                        }
                    }
                } else { // Для дамок
                    cur_row = row + 1;
                    cur_col = col + 1;
                    while (cur_row < 8 && cur_col < 8 && this.checkers[row][col] == 0) {
                        cur_is_highlighted[cur_row][cur_col] = 1;
                        cur_row++;
                        cur_col++;
                    };
                    if ((this.is_white && (this.checkers[cur_row][cur_col] == 2 || this.checkers[cur_row][cur_col] == 4)) || (!this.is_white && (this.checkers[cur_row][cur_col] == 1 || this.checkers[cur_row][cur_col] == 3))) {
                        if (cur_row < 7 && cur_col < 7) {
                            if (this.checkers[cur_row + 1][cur_col + 1] == 0) {
                                cur_is_highlighted[cur_row][cur_col] = 3;
                                cur_is_highlighted[cur_row+1][cur_col+1] = 1;
                            }
                        }
                    }

                    cur_row = row - 1;
                    cur_col = col - 1;
                    while (cur_row >= 0 && cur_col >= 0 && this.checkers[row][col] == 0) {
                        cur_is_highlighted[cur_row][cur_col] = 1;
                        cur_row--;
                        cur_col--;
                    };
                    if ((this.is_white && (this.checkers[cur_row][cur_col] == 2 || this.checkers[cur_row][cur_col] == 4)) || (!this.is_white && (this.checkers[cur_row][cur_col] == 1 || this.checkers[cur_row][cur_col] == 3))) {
                        if (cur_row > 0 && cur_col > 0) {
                            if (this.checkers[cur_row - 1][cur_col - 1] == 0) {
                                cur_is_highlighted[cur_row][cur_col] = 3;
                                cur_is_highlighted[cur_row-1][cur_col-1] = 1;
                            }
                        }
                    }

                    cur_row = row + 1;
                    cur_col = col - 1;
                    while (cur_row < 8 && cur_col >= 0 && this.checkers[row][col] == 0) {
                        cur_is_highlighted[cur_row][cur_col] = 1;
                        cur_row++;
                        cur_col--;
                    };
                    if ((this.is_white && (this.checkers[cur_row][cur_col] == 2 || this.checkers[cur_row][cur_col] == 4)) || (!this.is_white && (this.checkers[cur_row][cur_col] == 1 || this.checkers[cur_row][cur_col] == 3))) {
                        if (cur_row < 7 && cur_col > 0) {
                            if (this.checkers[cur_row + 1][cur_col - 1] == 0) {
                                cur_is_highlighted[cur_row][cur_col] = 3;
                                cur_is_highlighted[cur_row+1][cur_col-1] = 1;
                            }
                        }
                    }

                    cur_row = row - 1;
                    cur_col = col + 1;
                    while (cur_row >= 0 && cur_col < 8 && this.checkers[row][col] == 0) {
                        cur_is_highlighted[cur_row][cur_col] = 1;
                        cur_row--;
                        cur_col++;
                    };
                    if ((this.is_white && (this.checkers[cur_row][cur_col] == 2 || this.checkers[cur_row][cur_col] == 4)) || (!this.is_white && (this.checkers[cur_row][cur_col] == 1 || this.checkers[cur_row][cur_col] == 3))) {
                        if (cur_row > 0 && cur_col < 7) {
                            if (this.checkers[cur_row - 1][cur_col + 1] == 0) {
                                cur_is_highlighted[cur_row][cur_col] = 3;
                                cur_is_highlighted[cur_row-1][cur_col+1] = 1;
                            }
                        }
                    }
                }
                this.setState({is_highlighted: cur_is_highlighted});
            }
        } else {
            if (this.state.is_highlighted[row][col] == 1) {
                if (row - this.state.chosen_check[0] > 0 && col - this.state.chosen_check[1] > 0) {
                    cur_row = this.state.chosen_check[0];
                    cur_col = this.state.chosen_check[1];
                    let is_eating = [-1, -1];
                    while (cur_row != row && cur_col != col && this.state.checkers[cur_row][cur_col] == 0) {
                        cur_row++;
                        cur_col++;
                    }
                    if (cur_row != row && cur_col != col) {
                        is_eating = [cur_row, cur_col];
                    }
                } else if (row - this.state.chosen_check[0] < 0 && col - this.state.chosen_check[1] > 0) {
                    cur_row = this.state.chosen_check[0];
                    cur_col = this.state.chosen_check[1];
                    let is_eating = [-1, -1];
                    while (cur_row != row && cur_col != col && this.state.checkers[cur_row][cur_col] == 0) {
                        cur_row--;
                        cur_col++;
                    }
                    if (cur_row != row && cur_col != col) {
                        is_eating = [cur_row, cur_col];
                    }
                } else if (row - this.state.chosen_check[0] > 0 && col - this.state.chosen_check[1] < 0) {
                    cur_row = this.state.chosen_check[0];
                    cur_col = this.state.chosen_check[1];
                    let is_eating = [-1, -1];
                    while (cur_row != row && cur_col != col && this.state.checkers[cur_row][cur_col] == 0) {
                        cur_row++;
                        cur_col--;
                    }
                    if (cur_row != row && cur_col != col) {
                        is_eating = [cur_row, cur_col];
                    }
                } else {
                    cur_row = this.state.chosen_check[0];
                    cur_col = this.state.chosen_check[1];
                    let is_eating = [-1, -1];
                    while (cur_row != row && cur_col != col && this.state.checkers[cur_row][cur_col] == 0) {
                        cur_row--;
                        cur_col--;
                    }
                    if (cur_row != row && cur_col != col) {
                        is_eating = [cur_row, cur_col];
                    }
                }
                // Отправка на сервер хода (+ съеденье) + конец хода
                is_eating = [-1, -1];
                this.setState({chosen_check: [-1, -1]});
                let cur_is_highlighted = this.state.is_highlighted;
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        cur_is_highlighted[i][j] = 0;
                    }
                }
                this.setState({is_highlighted: cur_is_highlighted, is_my_turn: false});
            } else if (this.state.is_highlighted[row][col] == 2) {
                is_eating = [-1, -1];
                this.setState({chosen_check: [-1, -1]});
                let cur_is_highlighted = this.state.is_highlighted;
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        cur_is_highlighted[i][j] = 0;
                    }
                }
                this.setState({is_highlighted: cur_is_highlighted})
            }
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.cells[i][j].current.setState({checker_cell: this.state.checkers[i][j], is_highlighted_cell: this.state.is_highlighted[i][j]})
            }
        }
    }
    render() {
        return (
            <div className="field_wrapper">
                <table>
                    <Row1 refs={this.cells[7]} id="r7" onCellClickRef={this.onCellClick} />
                    <Row2 refs={this.cells[6]} id="r6" onCellClickRef={this.onCellClick} />
                    <Row1 refs={this.cells[5]} id="r5" onCellClickRef={this.onCellClick} />
                    <Row2 refs={this.cells[4]} id="r4" onCellClickRef={this.onCellClick} />
                    <Row1 refs={this.cells[3]} id="r3" onCellClickRef={this.onCellClick} />
                    <Row2 refs={this.cells[2]} id="r2" onCellClickRef={this.onCellClick} />
                    <Row1 refs={this.cells[1]} id="r1" onCellClickRef={this.onCellClick} />
                    <Row2 refs={this.cells[0]} id="r0" onCellClickRef={this.onCellClick} />
                </table>
            </div>
    )
    }
}

export default Game_field;
