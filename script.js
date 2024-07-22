function execCmd(command) {
    document.execCommand(command, false, null);
}

function execCmdArg(command, arg) {
    document.execCommand(command, false, arg);
}

function addText() {
    const editor = document.getElementById('editor');
    const newText = document.createElement('div');
    newText.contentEditable = true;
    newText.style.border = '1px dashed #ccc';
    newText.style.padding = '5px';
    newText.style.margin = '10px 0';
    newText.style.cursor = 'move';
    newText.innerText = 'New Text';
    makeDraggable(newText);
    editor.appendChild(newText);
}

function addImage(input) {
    const editor = document.getElementById('editor');
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        img.style.cursor = 'move';
        makeDraggable(img);
        editor.appendChild(img);
    }
    
    reader.readAsDataURL(file);
}

function makeDraggable(element) {
    element.draggable = true;
    element.ondragstart = function(e) {
        e.dataTransfer.setData('text/plain', null); // required for Firefox
        const style = window.getComputedStyle(e.target, null);
        e.dataTransfer.setData('text/plain', 
            (parseInt(style.getPropertyValue("left"), 10) - e.clientX) + ',' + 
            (parseInt(style.getPropertyValue("top"), 10) - e.clientY));
    };

    element.ondragend = function(e) {
        const offset = e.dataTransfer.getData('text/plain').split(',');
        element.style.left = (e.clientX + parseInt(offset[0], 10)) + 'px';
        element.style.top = (e.clientY + parseInt(offset[1], 10)) + 'px';
        element.style.position = 'absolute';
    };
}

// Populate font family selector with Google Fonts API
window.onload = function() {
    const fontFamilySelector = document.getElementById('fontFamilySelector');
    const fontSizeSelector = document.getElementById('fontSizeSelector');

    const googleFonts = ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Merriweather', 'Ubuntu', 'Poppins', 'Playfair Display', 'Nunito', 'Quicksand', 'Dancing Script', 'Indie Flower'];
    WebFont.load({
        google: {
            families: googleFonts
        },
        active: function() {
            googleFonts.forEach(font => {
                const option = document.createElement('option');
                option.value = font;
                option.innerText = font;
                fontFamilySelector.appendChild(option);
            });

            fontFamilySelector.addEventListener('change', function() {
                execCmdArg('fontName', this.value);
            });
        }
    });

    for (let i = 1; i <= 32; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        fontSizeSelector.appendChild(option);
    }

    fontSizeSelector.addEventListener('change', function() {
        execCmdArg('fontSize', this.value);
    });
};

function changeBackgroundColor(color) {
    document.getElementById('editor').style.backgroundColor = color;
}
