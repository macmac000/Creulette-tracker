let lastRoll = "";
function stdev(array) {
      const n = array.length;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}
async function checkRoll(){
    if(!document.getElementById("protons") || !document.getElementById("color2")){
        return;
    }
    if(document.getElementById("color2").innerHTML == lastRoll){
        return;
    }
    lastRoll = document.getElementById("color2").innerHTML;
    let lastChroma = Number(document.getElementById("chroma").innerHTML.split(" ")[0]);
    let r = parseInt(lastRoll.substring(1,3),16)
    let g = parseInt(lastRoll.substring(3,5),16)
    let b = parseInt(lastRoll.substring(5,7),16)
    let brightness = r+g+b;
    let saturation = stdev([r,g,b]);
    let sorted = [r,g,b].sort();
    let redbeauty = 1.5*r*(1/(1+Math.pow((g+7)/(r**4/16581375), 3)))*Math.pow(1+b/(r+7), 2.5);
    let greenbeauty = 1.3333*g*(1/(1+Math.pow((r+7)/(g/1.4), 3)))*Math.pow(g/125+b/(g+7), 1.5);
    let bluebeauty = 100*Math.cbrt(b/100)*Math.pow(0.8+b/(g+25), 2.5);
    let sbeauty = (r+g+b)*(110+Math.abs(sorted[1]-sorted[2]))/365;
    let beauty = Math.min([redbeauty, greenbeauty, bluebeauty, sbeauty].reduce((a, b) => a + b) / 5, 30000); //Milo what were you on when you were writing this

    chrome.storage.local.get({totalRolls: 0}, function(data) {
        let rollCount = data.totalRolls || 0;
        chrome.storage.local.set({ totalRolls: rollCount + 1 });
    });
    chrome.storage.local.get({rollsPerTier: [0,0,0,0,0,0,0,0,0,0,0]}, function(data){
        let rollsPerTier = data.rollsPerTier;
        let tier = 0;
        let rollThresholds = [180,230,300,600,1400,4000,14000,40000,400000,4000000];
        for(const x of rollThresholds){
            if(lastChroma >= x){tier++}
        }
        rollsPerTier[tier]++;
        chrome.storage.local.set({ rollsPerTier: rollsPerTier });
    })
    chrome.storage.local.get({bestRoll: "", bestChroma: 0, worstRoll: "", worstChroma: 0}, function(data){
        let bestChroma = data.bestChroma;
        let worstChroma = data.worstChroma;
        if(lastChroma > bestChroma){
            chrome.storage.local.set({bestRoll: lastRoll, bestChroma: lastChroma})
        }
        if(lastChroma < worstChroma || worstChroma == 0){
            chrome.storage.local.set({worstRoll: lastRoll, worstChroma: lastChroma})
        }
    })
    //update latest rolls tab
    chrome.storage.local.get({latestLb:  []}, function(data){
        let latestLb = data.latestLb;
        latestLb.unshift({ color: lastRoll, chroma: lastChroma });
        if(data.latestLb.length > 20){
            data.latestLb.pop()
        }
        chrome.storage.local.set({ latestLb: latestLb });
    })
    //update high and lowderboard
    chrome.storage.local.get({highLb:  [], lowLb: []}, function(data){
        let highLb = data.highLb;
        let lowLb = data.lowLb;
        if(highLb.length < 20 || lastChroma > highLb.at(-1).chroma){
            highLb.push({color: lastRoll, chroma: lastChroma});
        }
        highLb.sort((a,b) => b.chroma - a.chroma)
        if(lowLb.length < 20 || lastChroma < lowLb.at(-1).chroma){
            lowLb.push({color: lastRoll, chroma: lastChroma});
        }
        lowLb.sort((a,b) => a.chroma - b.chroma)
        if(highLb.length > 20){highLb.pop()}
        if(lowLb.length > 20){lowLb.pop()}
        chrome.storage.local.set({ highLb: highLb, lowLb: lowLb });
    })
    //update light and darkerboard
    chrome.storage.local.get({lightLb:  [], darkLb: []}, function(data){
        let lightLb = data.lightLb;
        let darkLb = data.darkLb;
        if(lightLb.length < 20 || brightness > lightLb.at(-1).bp){
            lightLb.push({color: lastRoll, bp: brightness});
        }
        lightLb.sort((a,b) => b.bp - a.bp)
        if(darkLb.length < 20 || brightness < darkLb.at(-1).bp){
            darkLb.push({color: lastRoll, bp: brightness});
        }
        darkLb.sort((a,b) => a.bp - b.bp)
        if(lightLb.length > 20){lightLb.pop()}
        if(darkLb.length > 20){darkLb.pop()}
        chrome.storage.local.set({ lightLb: lightLb, darkLb: darkLb});
    })
    //update sat and unsaterboard
    chrome.storage.local.get({satLb:  [], unsatLb: []}, function(data){
        let satLb = data.satLb;
        let unsatLb = data.unsatLb;
        if(satLb.length < 20 || saturation > satLb.at(-1).sp){
            satLb.push({color: lastRoll, sp: saturation});
        }
        satLb.sort((a,b) => b.sp - a.sp)
        if(unsatLb.length < 20 || saturation < unsatLb.at(-1).sp){
            unsatLb.push({color: lastRoll, sp: saturation});
        }
        unsatLb.sort((a,b) => a.sp - b.sp)
        if(satLb.length > 20){satLb.pop()}
        if(unsatLb.length > 20){unsatLb.pop()}
        chrome.storage.local.set({ satLb: satLb, unsatLb: unsatLb });
    })
    //update beauty and uglyboard
    chrome.storage.local.get({beautyLb:  [], uglyLb: []}, function(data){
        let beautyLb = data.beautyLb;
        let uglyLb = data.uglyLb;
        if(beautyLb.length < 20 || beauty > beautyLb.at(-1).ap){
            beautyLb.push({color: lastRoll, ap: beauty});
        }
        beautyLb.sort((a,b) => b.ap - a.ap)
        if(uglyLb.length < 20 || beauty < uglyLb.at(-1).ap){
            uglyLb.push({color: lastRoll, ap: beauty});
        }
        uglyLb.sort((a,b) => a.ap - b.ap)
        if(beautyLb.length > 20){beautyLb.pop()}
        if(uglyLb.length > 20){uglyLb.pop()}
        chrome.storage.local.set({ beautyLb: beautyLb, beautyLb: beautyLb });
    })
}
setInterval(() => {checkRoll()},250); //Imagine Milo adds a super fast way to roll and this just stops working if you click quickly enough