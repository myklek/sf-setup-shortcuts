//select button by id
let buttonMeta = document.getElementById('metadata');
let buttonFlow = document.getElementById('flow');

let tab =await getCurrentTab();
let url = new URL(tab.url)

buttonMeta.addEventListener('click', async () => {
    await chrome.tabs.update(getCurrentTab.id, {
        url: url.origin+'/lightning/setup/CustomMetadata/home'
    });
});

buttonFlow.addEventListener('click', async () => {
    await chrome.tabs.update(getCurrentTab.id, {
        url: url.origin+'/lightning/setup/Flows/home'
    });
});



async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

