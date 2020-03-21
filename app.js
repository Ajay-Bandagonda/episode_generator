async function pickSeason() {
    var url = "https://www.omdbapi.com/?t=The+Office&Season="
    var apiKey = "&apikey=thewdb";
    var seasonNum = Math.floor(Math.random() * 9) + 1; 

    let response = await fetch(url + seasonNum + apiKey);
    let data = await response.json()

    return data;
}

$("button").click(async function() {

    var data = await pickSeason();
    var episodes = data['Episodes'];
    var numEpisodes = episodes.length;
    
    var season = data["Season"]
    var pickedEpisode = episodes[Math.floor(Math.random() * numEpisodes)]; 

    $("#cardBody").removeClass("d-none")

    $("#seasonNum").text(season);
    $("#episodeNum").text(pickedEpisode['Episode']);
    $("#episodeName").text(`"${pickedEpisode['Title']}"`);

    $.getJSON("70136120.json", function(json) {
        var seasons = json['video']['seasons']
        var seasonEpisodes = seasons[Number(season) - 1]['episodes']
        
        var episodeID = seasonEpisodes[Number(pickedEpisode['Episode']) - 1]['episodeId']
        var netflixURL = `https://www.netflix.com/watch/${episodeID}`

        $("#episodeUrl").attr("href", netflixURL);
        $("#episodeUrl").text("Click here to go to Netflix!");
    })
    
})