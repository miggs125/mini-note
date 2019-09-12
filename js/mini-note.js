class Note{
    static noteCount = 0
    constructor(){
        this.position = {
            initial: {
                x: 10,
                y: 10
            },
            final: {
                x,y
            }
        }
        this.height = 150;
        this.width = 150;
        this.id = new Date().toDateString() + Note.noteCount;
        this.element = Note.createNoteElement();
        element.setAttribute('id', this.id);
        this.element.onmousedown = drawgMousedown

        Note.noteCount++;
    }

    static createNoteElement(){
        let note = document.createElement('div');
        let text = document.createElement('p');
        text.setAttribute('id', 'noteText'); // not sure if this is needed

        
        note.appendChild(text);
        text.innerText = 'Click me to start editing'
        text.setAttribute('contenteditable', 'true');
        
        return note;
    }

    editText(newText){
        this.element.firstChild.innerText = newText;
    }

    drag(e){
        e = e || window.event;
        e.preventDefault();
        diff = {x,y};
        this.position.final.x = this.position.initial.x - e.clientX;
        this.position.final.y = this.position.initial.y - e.clientY;
        this.setPosition();
    }

    setPosition(){
        this.element.style.top = (this.element.offsetTop - this.position.final.y)
        this.element.style.left = (this.element.offsetTop - this.position.final.x)
    }

    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // get current position
        this.position.initial.x = e.clientX;
        this.position.initial.y = e.clientY;
        document.onmousemove = drag;
        document.onmouseup = endDrag;
    }

    endDrag(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

window.onload = () => {
    let interval;
    window.addEventListener('DOMContentLoaded', () => {
      const fs = new Filer.FileSystem();
      let note = document.createElement('div');
      let text = document.createElement('p');
      let saveButton = document.createElement('button');
    
      function save() {
        fs.writeFile('/note', text.innerText, (err) => {
          if (err) throw err;
        });
      }
    
      saveButton.setAttribute('type', 'button');
      saveButton.innerText = 'Save';
      saveButton.onclick = save
    
      text.setAttribute('contenteditable', 'true');
      note.setAttribute('id', 'note');
    
      fs.readFile('/note', 'utf8', (err, data) => {
        if (!err && data !== '') text.innerText = data;
        else text.innerText = 'Welcome to mini-note!';
      });
    
      note.appendChild(text);
      note.appendChild(saveButton);
    
      document.body.appendChild(note);
      interval = setInterval(save, 3000);
    });
    
    window.addEventListener('unload', () => {
      if (interval) clearInterval(interval);
    });
}
