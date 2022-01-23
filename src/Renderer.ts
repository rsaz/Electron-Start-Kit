const dm = document.getElementById('toggle-dark-mode') as HTMLElement;
dm.addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    let ts = document.getElementById('theme-source') as HTMLElement;
    ts.innerHTML = isDarkMode ? 'Dark' : 'Light'
});

const lm = document.getElementById('reset-to-system') as HTMLElement;
lm.addEventListener('click', async () => {
    await window.darkMode.system()
    let ts = document.getElementById('theme-source') as HTMLElement;
    ts.innerHTML = 'System';
})