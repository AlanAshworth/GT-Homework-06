$(document).ready(function() {
// TODO: Add search icon to search button
// TODO: remove hardcoded list, add generated list for searches

var apikey = "54a9099a651206645d31affb6bbd4e54";
var location = "Georgia";
var queryUrl = toString("https://openweathermap.org/data/2.5/weather?q=" + location + ",us&appid=" + apikey);
console.log(queryUrl);
});
