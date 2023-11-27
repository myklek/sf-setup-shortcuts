const contextItemId = 'addShortcut';
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
                () => {}
            );


        }
    );
};
chrome.runtime.onInstalled.addListener((details) => {

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        setDefaultShortcuts();

    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        setDefaultShortcuts();

        // When extension is updated
    } else if (details.reason === chrome.runtime.OnInstalledReason.CHROME_UPDATE) {
        // When browser is updated
    } else if (details.reason === chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE) {
        // When a shared module is updated
    }
});

function setDefaultShortcuts() {

    let defaults =
        [{name: 'Object Manager', link: '/lightning/setup/ObjectManager/home'},
        {name: 'Data Import Wizard 🧙', link: '/lightning/setup/DataManagementDataImporter/home'},
        {name: 'Users', link: '/lightning/setup/ManageUsers/home'},
        {name: 'Permission Sets', link: '/lightning/setup/PermSets/home'}];


    chrome.storage.sync.get(
        ['shortCuts'],
        (items) => {
            if (items.shortCuts == null) {
                items.shortCuts = [];
            }
            if (items.shortCuts.length === 0) {
                chrome.storage.sync.set(
                    {shortCuts: defaults},
                    () => {
                        console.log('Default shortcuts set');
                    }
                );
            }
        });
}

chrome.contextMenus.create({
    id: contextItemId,
    title: 'Add current tab as Shortcut 💾',
    contexts: ['action']
})

async function contextClick(info, tab) {
    const {menuItemId} = info

    if (menuItemId === contextItemId) {
        let queryOptions = {active: true, lastFocusedWindow: true};
        let [tab] = await chrome.tabs.query(queryOptions);
        let url = new URL(tab.url)
        let name = tab.title;
        let link = url.pathname;
        saveNewShortcut(name, link);
    }
}

chrome.contextMenus.onClicked.addListener(contextClick)
