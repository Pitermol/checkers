from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room

app = Flask(__name__)
socketio = SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
db = SQLAlchemy(app)

class Rooms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

lobby = "lobby"
tables = {}
game_states = {}

@socketio.on('connect')
def handle_connect():       #список комнат
    join_room(lobby)
    socketio.emit('tables', list(tables.keys()), room=lobby)

@socketio.on('join_table')
def handle_join_table(table_id):
    if table_id in tables: #комната есть и к ней получилось присоединиться
        join_room(table_id)
        socketio.emit('join_success', room=table_id)
    else:   #комнаты нет
        socketio.emit('join_error', 'Table does not exist', room=request.sid)

@socketio.on('create_table')    #создание стола
def handle_create_table(table_name):
    table_id = generate_unique_id()  
    tables[table_id] = table_name
    join_room(table_id)
    socketio.emit('table_created', table_id, room=request.sid)
    socketio.emit('tables', list(tables.keys()), room=lobby)

@socketio.on('make_move')       #обновления хода для пользователей
def handle_make_move(data):
    table_id = data['table_id']
    move = data['move']
    update_game_state(table_id, move)
    updated_state = game_states[table_id]
    socketio.emit('update_game_state', updated_state, room=table_id)


def update_game_state(table_id, move):      #непосредственно ходы(яма)
    current_state = game_states.get(table_id, {'board': [], 'turn': 1})  

    board = current_state['board']  
    turn = current_state['turn']  

    start_x, start_y = move['start']
    end_x, end_y = move['end']
    
    if abs(start_x - end_x) != 1 or abs(start_y - end_y) != 1: #на диагонали
        return
    if board[start_x][start_y] != turn:     #есть фигура там, где хотят начать ход
        return
    
    board[end_x][end_y] = turn
    board[start_x][start_y] = 0  
    
    turn = 3 - turn 

    game_states[table_id] = {'board': board, 'turn': turn}  


if __name__ == '__main__':
    socketio.run(app)