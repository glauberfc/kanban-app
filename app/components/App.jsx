import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';

class App extends React.Component {
  render() {
    const { notes } = this.props;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activeNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
      </div>
    )
  }

  addNote = () => {
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id: uuid.v4(),
          task: 'New Task'
        }
      ]
    })
  }

  deleteNote = (id, e) => {
    e.stopPropagation()

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }
  
  activeNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.editing = true;
        }
  
        return note;
      })
    });
  }
  
  editNote = (id, task) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.editing = false;
          note.task = task;
        }
  
        return note;
      })
    });
  }
}

export default connect(({ notes }) => ({
  notes
}))(App);
