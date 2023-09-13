import React, { Component, ChangeEvent } from 'react';

interface Note {
  id: number;
  description: string;
}

interface AppState {
  notes: Note[];
  newNote: string;
}

class App extends Component<{}, AppState> {
  API_URL = "http://localhost:5038";

  constructor(props: {}) {
    super(props);
    this.state = {
      notes: [],
      newNote: "",
    };
  }

  componentDidMount() {
    this.refreshNotes();
  }

  refreshNotes() {
    fetch(this.API_URL + "/api/todoapp/GetNotes")
      .then((res) => res.json())
      .then((data: Note[]) => {
        this.setState({ notes: data });
      });
  }

  addClick() {
    const { newNote } = this.state;
    const data = new FormData();
    data.append("newNotes", newNote);

    fetch(this.API_URL + "/api/todoapp/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  deleteClick(id: number) {
    fetch(this.API_URL + "/api/todoapp/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  handleNewNoteChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ newNote: event.target.value });
  }

  render() {
    const { notes, newNote } = this.state;
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h2>Todo App</h2>
        <input
          id="newNotes"
          value={newNote}
          onChange={(e) => this.handleNewNoteChange(e)}
        />
        &nbsp;
        <button onClick={() => this.addClick()}>Add Notes</button>

        {notes.map((note) => (
          <p key={note.id}>
            <b>* {note.description}</b>&nbsp;
            <button onClick={() => this.deleteClick(note.id)}>Delete Notes</button>
          </p>
        ))}
      </div>
    );
  }
}

export default App;



