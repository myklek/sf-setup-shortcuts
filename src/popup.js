const restoreShortcuts = async () => {

    let tab = await getCurrentTab();
    let url = new URL(tab.url)


    let tabOrigin = getCurrentTab.id;
    chrome.storage.sync.get(['shortCuts'], (items) => {
        console.log(items);
        if (items) {
            items.shortCuts.forEach((shortcut) => {
                let button = document.createElement("button");
                button.innerHTML = shortcut.name;
                button.addEventListener("click", () => {
                    chrome.tabs.update(tabOrigin, {
                        url: url.origin+shortcut.link
                    });
                });
                document.body.appendChild(button);

            });
        }
    });
}


async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
document.addEventListener('DOMContentLoaded', restoreShortcuts);
