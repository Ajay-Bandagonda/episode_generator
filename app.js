async function pickSeason() {
    var url = "https://www.omdbapi.com/?t=The+Office&Season="
    var apiKey = "&apikey=thewdb";
    var seasonNum = Math.floor(Math.random() * 9) + 1; 

    let response = await fetch(url + seasonNum + apiKey);
    let data = await response.json()

    return data;
}

document.querySelector("button").addEventListener("click", async function() {

    var data = await pickSeason();
    var episodes = data['Episodes'];
    var numEpisodes = episodes.length;
    
    var season = data["Season"]
    var pickedEpisode = episodes[Math.floor(Math.random() * numEpisodes)]; 

    document.querySelector("#cardBody").classList.remove("d-none")

    document.querySelector("#seasonNum").textContent = `${season}`;
    document.querySelector("#episodeNum").textContent = `${pickedEpisode['Episode']}`;
    document.querySelector("#episodeName").textContent = `${pickedEpisode['Title']}`;  
})