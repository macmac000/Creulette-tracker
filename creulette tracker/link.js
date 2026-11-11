document.getElementById('creuletteLink').addEventListener('click', function(event) {
  event.preventDefault(); 
  chrome.tabs.create({ url: 'https://prototypestudios.neocities.org/creulette' });
}); //Why is there a separate file for this? I don't know. Don't ask me.