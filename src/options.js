
function saveOptionsLabel() {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
        status.textContent = '';
    }, 750);
}


const restoreOptions = () => {
    chrome.storage.sync.get(
        ['shortCuts'],
        (items) => {
            createTableRow(items);
        }
    );
};

const saveRow = (name,link) => {
    console.log('save row')

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

                    saveOptionsLabel();
                }
            );


        }
    );


};


const removeRow = (name,link) => {

    //remove row from chrome storage
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
                        saveOptionsLabel();
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



const createTableRow = (items) => {
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
    removeHeader.textContent = "Remove";
    tableHeader.appendChild(nameHeader);
    tableHeader.appendChild(linkHeader);
    tableHeader.appendChild(removeHeader);
    table.appendChild(tableHeader);
    const currentDiv = document.getElementById("addRow");
    document.body.insertBefore(table, currentDiv);
    items.shortCuts.forEach((item) => {
        const tableRow = document.createElement("tr");
        const name = document.createElement("td");
        const link = document.createElement("td");
        const remove = document.createElement("td");
        const removeButton = document.createElement("button");
        name.textContent = item.name;
        link.textContent = item.link;
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', () => {
            //remove the row from the table
            console.log('click remove');
            removeRow(item.name,item.link);
            tableRow.remove();
        });
        remove.appendChild(removeButton);
        tableRow.appendChild(name);
        tableRow.appendChild(link);
        tableRow.appendChild(remove);
        table.appendChild(tableRow);
    });




}


const addShortcutInputFields = () => {

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
        //save the row to the table
        name.textContent = nameInput.value;
        link.textContent = linkInput.value;
        saveRow(nameInput.value,linkInput.value);
        removeButton.remove();
        saveButton.remove();
        remove.appendChild(removeButton);

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




document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('addRow').addEventListener('click', addShortcutInputFields);
