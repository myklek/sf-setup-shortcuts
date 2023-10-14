
const saveOptions = () => {
    const likesColor = document.getElementById('like').checked;
    const text = document.getElementById('textBox').value;

    chrome.storage.sync.set(
        { likesColor: likesColor,shortCuts: [{name: "someName",link: 'url'},{name: "someName2",link: 'url2'}] },
        () => {

            function saveOptionsLabel() {
                const status = document.getElementById('status');
                status.textContent = 'Options saved.';
                setTimeout(() => {
                    status.textContent = '';
                }, 750);
            }

            saveOptionsLabel();
        }
    );
};


const restoreOptions = () => {
    chrome.storage.sync.get(
        ['likesColor','shortCuts'],
        (items) => {
            console.log(items);
            console.log('restore');
            document.getElementById('like').checked = items.likesColor;
            document.getElementById('shortCuts').textContent = items.shortCuts;
            items.shortCuts.forEach((item) => {
                addShortcutLabel(item.name,item.link);
            }   );

        }
    );
};


const addShortcutLabel = (name,link) => {
    // create a new div element
    const newDiv = document.createElement("div");
    //create input field
    const shortcutName = document.createElement("p");
    shortcutName.textContent = name;
    const shortcutLink = document.createElement("p");
    shortcutLink.textContent = link;
    newDiv.appendChild(shortcutName);
    newDiv.appendChild(shortcutLink);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("save");
    document.body.insertBefore(newDiv, currentDiv);
}


const addElement = () => {
    // create a new div element
    const newDiv = document.createElement("div");
    //create input field
    const shortcutName = document.createElement("input");
    const shortcutLink = document.createElement("input");
    newDiv.appendChild(shortcutName);
    newDiv.appendChild(shortcutLink);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("save");
    document.body.insertBefore(newDiv, currentDiv);
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('addRow').addEventListener('click', addElement);
