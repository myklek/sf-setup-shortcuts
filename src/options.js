
function saveShortcutNotification() {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
        status.textContent = '';
    }, 750);
}


const refreshShortcutsTable = () => {
    chrome.storage.sync.get(
        ['shortCuts'],
        (items) => {
            //remove table if it exists
            const table = document.getElementById("shortCuts");
            table.remove();
            //create table
            createTable(items);
        }
    );
};

const saveNewShortcut = (name,link) => {
    chrome.storage.sync.get(
        ['shortCuts'],
        (items) => {

            if(items.shortCuts == null){
                items.shortCuts = [];
            }
            items.shortCuts.push({name:name,link:link});

            chrome.storage.sync.set(
                { shortCuts: items.shortCuts },
                () => {
                    saveShortcutNotification();
                    refreshShortcutsTable();
                }
            );


        }
    );
};
//modify shortcut function
const editShortcut = (newName,newLink,oldName,oldLink) => {
    // if new and old are the same do nothing
    // else update the shortcut
    if(newName === oldName && newLink === oldLink){
        return;
    }

        chrome.storage.sync.get(
            ['shortCuts'],
            (items) => {

                if(items.shortCuts == null){
                    items.shortCuts = [];
                }
                items.shortCuts.forEach((item) => {
                    if(item.name === oldName && item.link === oldLink){
                        item.name = newName;
                        item.link = newLink;

                        chrome.storage.sync.set(
                            { shortCuts: items.shortCuts },
                            () => {
                                refreshShortcutsTable()
                                saveShortcutNotification();
                            }
                        );
                    }
                });


            });
}


const removeShortcut = (name,link) => {

chrome.storage.sync.get(
        ['shortCuts'],
        (items) => {

                if(items.shortCuts == null){
                    items.shortCuts = [];
                }
                items.shortCuts = items.shortCuts.filter((item) => {
                    return item.name !== name || item.link !== link
                });

                chrome.storage.sync.set(
                    { shortCuts: items.shortCuts },
                    () => {
                        refreshShortcutsTable()
                        saveShortcutNotification();
                    }
                );
        });

}


const saveAll = () => {
    chrome.storage.sync.set(
        // { shortCuts: [{name: 'test',link: 'test'}] },
        { shortCuts:null },
        () => {
        }
    );
}

const createTable = (items) => {
    //create table and put items inside of it with table headers of name and link
    // also add a remove button for each row
    //add table id to table "shortCuts"

    const table = document.createElement("table");
    table.id = "shortCuts";
    const tableHeader = document.createElement("tr");
    const nameHeader = document.createElement("th");
    const linkHeader = document.createElement("th");
    const removeHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    linkHeader.textContent = "Link";
    removeHeader.textContent = "Options";
    tableHeader.appendChild(nameHeader);
    tableHeader.appendChild(linkHeader);
    tableHeader.appendChild(removeHeader);
    table.appendChild(tableHeader);
    const currentDiv = document.getElementById("addRow");
    document.body.insertBefore(table, currentDiv);
    items.shortCuts.forEach((item) => {
        addRowToTable(item, table);
    });




}

function addRowToTable(item, table) {
    const tableRow = document.createElement("tr");
    const name = document.createElement("td");
    const link = document.createElement("td");
    const remove = document.createElement("td");
    const removeButton = document.createElement("button");
    name.textContent = item.name;
    link.textContent = item.link;
    name.contentEditable = "true";
    link.contentEditable = "true";




    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
        //remove the row from the table
        removeShortcut(item.name, item.link);
        tableRow.remove();
    });
    remove.appendChild(removeButton);
    tableRow.appendChild(name);
    tableRow.appendChild(link);
    tableRow.appendChild(remove);
    table.appendChild(tableRow);

    //add event listner on clickout of edit form
    name.addEventListener('blur', () => {
        editShortcut(name.textContent,link.textContent,item.name,item.link);
    });
    link.addEventListener('blur', () => {
        editShortcut(name.textContent, link.textContent, item.name, item.link);
    });
}




const addInputFields = () => {

    //add a row to shortCut table with input fields for name and link and a remove button

    console.log(document.getElementById("shortCuts"))
    const table = document.getElementById("shortCuts");
    const tableRow = document.createElement("tr");
    const name = document.createElement("td");
    const link = document.createElement("td");
    const remove = document.createElement("td");
    const removeButton = document.createElement("button");
    const saveButton = document.createElement("button");
    const nameInput = document.createElement("input");
    const linkInput = document.createElement("input");
    nameInput.type = "text";
    linkInput.type = "text";
    nameInput.placeholder = "Name";
    linkInput.placeholder = "Link";
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
        tableRow.remove();
    });
    saveButton.textContent = "Save";
    saveButton.addEventListener('click', () => {
        saveNewShortcut(nameInput.value,linkInput.value);


    });
    name.appendChild(nameInput);
    link.appendChild(linkInput);
    remove.appendChild(removeButton);
    remove.appendChild(saveButton);
    tableRow.appendChild(name);
    tableRow.appendChild(link);
    tableRow.appendChild(remove);
    table.appendChild(tableRow);

}


document.addEventListener('DOMContentLoaded', refreshShortcutsTable);
document.getElementById('addRow').addEventListener('click', addInputFields);
