function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq < 128 ? 'white' : 'black';
}
function darkenColor(hexcolor, factor) {
    hexcolor = hexcolor.replace('#', '');
    let r = parseInt(hexcolor.substr(0, 2), 16);
    let g = parseInt(hexcolor.substr(2, 2), 16);
    let b = parseInt(hexcolor.substr(4, 2), 16);
    r = Math.max(0, Math.min(255, Math.round(r * factor)));
    g = Math.max(0, Math.min(255, Math.round(g * factor)));
    b = Math.max(0, Math.min(255, Math.round(b * factor)));
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    return "#" + rHex + gHex + bHex;
}
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url.includes("prototypestudios.neocities.org/creulette")) {
        document.body.innerHTML = "";
        document.body.style.width = "300px";

        let header = document.createElement("h1");
        header.innerHTML = "Creulette Tracker";
        document.body.appendChild(header);

        let modeSelection = document.createElement("select");
        document.body.appendChild(modeSelection);
        let mode1 = document.createElement("option");
        mode1.value = "stats";
        mode1.innerHTML = "Basic statistics";
        let mode2 = document.createElement("option");
        mode2.value = "rolls";
        mode2.innerHTML = "Latest rolls";
        let mode3 = document.createElement("option");
        mode3.value = "rollsBest";
        mode3.innerHTML = "Best rolls";
        let mode4 = document.createElement("option");
        mode4.value = "rollsWorst";
        mode4.innerHTML = "Worst rolls";
        let mode5 = document.createElement("option");
        mode5.value = "rollsBeauty";
        mode5.innerHTML = "Most beautiful colors";
        let mode6 = document.createElement("option");
        mode6.value = "rollsLight";
        mode6.innerHTML = "Brightest colors";
        let mode7 = document.createElement("option");
        mode7.value = "rollsDark";
        mode7.innerHTML = "Darkest colors";
        let mode8 = document.createElement("option");
        mode8.value = "rollsSaturated";
        mode8.innerHTML = "Most saturated colors";
        let mode10 = document.createElement("option");
        mode10.value = "rollsGrayscale";
        mode10.innerHTML = "Least saturated colors";
        let mode11 = document.createElement("option");
        mode11.value = "rollsUgly";
        mode11.innerHTML = "Least beautiful colors";
        modeSelection.appendChild(mode1);
        modeSelection.appendChild(mode2);
        modeSelection.appendChild(mode3);
        modeSelection.appendChild(mode4);
        modeSelection.appendChild(mode6);
        modeSelection.appendChild(mode7);
        modeSelection.appendChild(mode8);
        modeSelection.appendChild(mode10);
        modeSelection.appendChild(mode5);
        modeSelection.appendChild(mode11);
        
        //basic stats
        let stats = document.createElement("div");
        stats.id = "stats"
        document.body.appendChild(stats);

        let bestRollText = document.createElement("p");
        bestRollText.style.fontSize = "13px"
        bestRollText.style.fontWeight = "bold"
        stats.appendChild(bestRollText);

        let worstRollText = document.createElement("p");
        worstRollText.style.fontSize = "13px"
        worstRollText.style.fontWeight = "bold"
        stats.appendChild(worstRollText);

        let rollCounter = document.createElement("p");
        stats.appendChild(rollCounter);

        let rollTierCounter = document.createElement("p");
        stats.appendChild(rollTierCounter);

        //latest rolls
        let rolls = document.createElement("div");
        rolls.id= "rolls"
        rolls.style.display = "none";
        document.body.appendChild(rolls)

        let latestRolls = document.createElement("p");
        latestRolls.innerHTML = "Last 20 rolls: ";
        latestRolls.style.fontSize = "13px"
        latestRolls.style.fontWeight = "bold"
        rolls.appendChild(latestRolls);

        let latestRollContainer = document.createElement("div");
        latestRollContainer.style.fontSize = "13px"
        latestRollContainer.style.fontWeight = "bold"
        rolls.appendChild(latestRollContainer);

        //best rolls
        let rollsBest = document.createElement("div");
        rollsBest.id= "rollsBest"
        rollsBest.style.display = "none";
        document.body.appendChild(rollsBest)

        let bestRolls = document.createElement("p");
        bestRolls.innerHTML = "Top 20 rolls: ";
        bestRolls.style.fontSize = "13px"
        bestRolls.style.fontWeight = "bold"
        rollsBest.appendChild(bestRolls);

        let bestRollContainer = document.createElement("div");
        bestRollContainer.style.fontSize = "13px"
        bestRollContainer.style.fontWeight = "bold"
        rollsBest.appendChild(bestRollContainer);

        //worst rolls
        let rollsWorst = document.createElement("div");
        rollsWorst.id= "rollsWorst"
        rollsWorst.style.display = "none";
        document.body.appendChild(rollsWorst)

        let worstRolls = document.createElement("p");
        worstRolls.innerHTML = "Bottom 20 rolls: ";
        worstRolls.style.fontSize = "13px"
        worstRolls.style.fontWeight = "bold"
        rollsWorst.appendChild(worstRolls);

        let worstRollContainer = document.createElement("div");
        worstRollContainer.style.fontSize = "13px"
        worstRollContainer.style.fontWeight = "bold"
        rollsWorst.appendChild(worstRollContainer);

        //brightest rolls
        let rollsLight = document.createElement("div");
        rollsLight.id= "rollsLight"
        rollsLight.style.display = "none";
        document.body.appendChild(rollsLight)

        let brightestRolls = document.createElement("p");
        brightestRolls.innerHTML = "Brightest 20 colors: ";
        brightestRolls.style.fontSize = "13px"
        brightestRolls.style.fontWeight = "bold"
        rollsLight.appendChild(brightestRolls);

        let brightestRollContainer = document.createElement("div");
        brightestRollContainer.style.fontSize = "13px"
        brightestRollContainer.style.fontWeight = "bold"
        rollsLight.appendChild(brightestRollContainer);

        //darkest rolls
        let rollsDark = document.createElement("div");
        rollsDark.id= "rollsDark"
        rollsDark.style.display = "none";
        document.body.appendChild(rollsDark)

        let darkestRolls = document.createElement("p");
        darkestRolls.innerHTML = "Darkest 20 colors: ";
        darkestRolls.style.fontSize = "13px"
        darkestRolls.style.fontWeight = "bold"
        rollsDark.appendChild(darkestRolls);

        let darkestRollContainer = document.createElement("div");
        darkestRollContainer.style.fontSize = "13px"
        darkestRollContainer.style.fontWeight = "bold"
        rollsDark.appendChild(darkestRollContainer);

        //saturated rolls
        let rollsSaturated = document.createElement("div");
        rollsSaturated.id= "rollsSaturated"
        rollsSaturated.style.display = "none";
        document.body.appendChild(rollsSaturated)

        let saturatedRolls = document.createElement("p");
        saturatedRolls.innerHTML = "Most saturated 20 colors: ";
        saturatedRolls.style.fontSize = "13px"
        saturatedRolls.style.fontWeight = "bold"
        rollsSaturated.appendChild(saturatedRolls);

        let saturatedRollContainer = document.createElement("div");
        saturatedRollContainer.style.fontSize = "13px"
        saturatedRollContainer.style.fontWeight = "bold"
        rollsSaturated.appendChild(saturatedRollContainer);

        //desaturated rolls
        let rollsGrayscale = document.createElement("div");
        rollsGrayscale.id= "rollsGrayscale"
        rollsGrayscale.style.display = "none";
        document.body.appendChild(rollsGrayscale)

        let unsaturatedRolls = document.createElement("p");
        unsaturatedRolls.innerHTML = "Least saturated 20 colors: ";
        unsaturatedRolls.style.fontSize = "13px"
        unsaturatedRolls.style.fontWeight = "bold"
        rollsGrayscale.appendChild(unsaturatedRolls);

        let unsaturatedRollContainer = document.createElement("div");
        unsaturatedRollContainer.style.fontSize = "13px"
        unsaturatedRollContainer.style.fontWeight = "bold"
        rollsGrayscale.appendChild(unsaturatedRollContainer);

        //beautiful rolls
        let rollsBeauty = document.createElement("div");
        rollsBeauty.id= "rollsBeauty"
        rollsBeauty.style.display = "none";
        document.body.appendChild(rollsBeauty)

        let beautyRolls = document.createElement("p");
        beautyRolls.innerHTML = "Most beautiful 20 colors: ";
        beautyRolls.style.fontSize = "13px"
        beautyRolls.style.fontWeight = "bold"
        rollsBeauty.appendChild(beautyRolls);

        let beautyRollContainer = document.createElement("div");
        beautyRollContainer.style.fontSize = "13px"
        beautyRollContainer.style.fontWeight = "bold"
        rollsBeauty.appendChild(beautyRollContainer);

        //ugly rolls
        let rollsUgly = document.createElement("div");
        rollsUgly.id= "rollsUgly"
        rollsUgly.style.display = "none";
        document.body.appendChild(rollsUgly)

        let uglyRolls = document.createElement("p");
        uglyRolls.innerHTML = "Least beautiful 20 colors: ";
        uglyRolls.style.fontSize = "13px"
        uglyRolls.style.fontWeight = "bold"
        rollsUgly.appendChild(uglyRolls);

        let uglyRollContainer = document.createElement("div");
        uglyRollContainer.style.fontSize = "13px"
        uglyRollContainer.style.fontWeight = "bold"
        rollsUgly.appendChild(uglyRollContainer);

        modeSelection.onchange = () => {
            for(const x of document.body.children){
                if(x.tagName != "DIV"){continue}
                if(x.id == modeSelection.value){
                    x.style.display = "inline";
                }
                else{
                    x.style.display = "none";
                }
            }
        }

        chrome.storage.local.get({ totalRolls: 0, rollsPerTier: [0,0,0,0,0,0,0,0,0,0,0], bestRoll: "", bestChroma: 0, worstRoll: "", worstChroma: 0}, function(data) {
            rollCounter.innerHTML = `Total rolls: ${data.totalRolls}`;
            let rollsPerTier = data.rollsPerTier;
            rollTierCounter.innerHTML = `
                <span style=\"color: saddlebrown;\">Shit: ${rollsPerTier[0]}</span><br>
                <span style=\"color: peru;\">Trash: ${rollsPerTier[1]}</span><br>
                <span style=\"color: bisque;\">Garbage: ${rollsPerTier[2]}</span><br>
                <span style=\"color: silver;\">Uninteresting: ${rollsPerTier[3]}</span><br>
                <span style=\"color: white;\">Common: ${rollsPerTier[4]}</span><br>
                <span style=\"color: lime;\">Uncommon: ${rollsPerTier[5]}</span><br>
                <span style=\"color: #0080ff;\">Rare: ${rollsPerTier[6]}</span><br>
                <span style=\"color: magenta; font-size: 13px;\">Epic: ${rollsPerTier[7]}</span><br>
                <span style=\"color: yellow; font-size: 15px;\">Legendary: ${rollsPerTier[8]}</span><br>
                <span style=\"color: red; font-size: 18px;\">Mythic: ${rollsPerTier[9]}</span><br>
                <span style=\"color: cyan; font-size: 20px;\">UNHEARD: ${rollsPerTier[10]}</span><br>
            `
            if(data.bestRoll.length > 0){
                bestRollText.innerHTML = `Best roll: ${data.bestRoll} (${data.bestChroma} Chroma)`
            }
            if(data.worstRoll.length > 0){
                worstRollText.innerHTML = `Worst roll: ${data.worstRoll} (${data.worstChroma} Chroma)`
            }
        });
        chrome.storage.local.get({latestLb: []}, function(data){
            let latestLb = data.latestLb;
            for(x of latestLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = x.chroma + " Chroma"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                latestRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({highLb: []}, function(data){
            let highLb = data.highLb;
            for(x of highLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = x.chroma + " Chroma"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                bestRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({lowLb: []}, function(data){
            let lowLb = data.lowLb;
            for(x of lowLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = x.chroma + " Chroma"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                worstRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({lightLb: []}, function(data){
            let lightLb = data.lightLb;
            for(x of lightLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = x.bp + " bp"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                brightestRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({darkLb: []}, function(data){
            let darkLb = data.darkLb;
            for(x of darkLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = x.bp + " bp"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                darkestRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({satLb: []}, function(data){
            let satLb = data.satLb;
            for(x of satLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = Number(x.sp).toFixed(3) + " sp"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                saturatedRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({unsatLb: []}, function(data){
            let unsatLb = data.unsatLb;
            for(x of unsatLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = Number(x.sp).toFixed(3) + " sp"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                unsaturatedRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({beautyLb: []}, function(data){
            let beautyLb = data.beautyLb;
            for(x of beautyLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = Number(x.ap).toFixed(3) + " ap"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                beautyRollContainer.appendChild(lbElement);
            }
        })
        chrome.storage.local.get({uglyLb: []}, function(data){
            let uglyLb = data.uglyLb;
            for(x of uglyLb){
                let lbElement = document.createElement("div");
                lbElement.style.display = "flex";
                let colorLabel = document.createElement("span");
                colorLabel.innerHTML = x.color;
                colorLabel.style.backgroundColor = x.color;
                colorLabel.style.color = getContrastYIQ(x.color);
                colorLabel.style.margin = "1px 10px";
                colorLabel.style.border = `2px solid ${darkenColor(x.color, 0.4)}`
                colorLabel.style.borderRadius = "6px"
                colorLabel.style.width = "50%"
                let chromaLabel = document.createElement("span");
                chromaLabel.innerHTML = Number(x.ap).toFixed(3) + " ap"
                chromaLabel.style.alignContent = "center"
                lbElement.appendChild(colorLabel);
                lbElement.appendChild(chromaLabel);
                uglyRollContainer.appendChild(lbElement);
            }
        })
    }
});