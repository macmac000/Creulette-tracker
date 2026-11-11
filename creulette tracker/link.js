document.getElementById('creuletteLink').addEventListener('click', function(event) {
  event.preventDefault(); 
  chrome.tabs.create({ url: 'https://prototypestudios.neocities.org/creulette' });
});