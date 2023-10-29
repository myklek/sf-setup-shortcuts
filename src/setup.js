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
