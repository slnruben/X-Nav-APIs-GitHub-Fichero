// JavaScript for github-api.html (GitHub git API)

var repoHTML = "<input type='text' name='user' value='slnruben' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='X-Nav-APIs-GitHub-Fichero' " +
    "id='repo' size='10' />" +
    "<button type='button'>Grab repo data</button>" +
    "<div id='repodata'/>";

var fileHTML = "File name: <input type='text' value='file.txt' " +
    "id='nameFile' size='10' />" +
    "Text File: <input id='textFile' type='text' value='Esto es una prueba' " +
    "id='repo' size='10' />" +
    "<button id='buttonFile' type='button'>Write file</button>" +
    "<div id='file'/>";

var github;

function getToken() {
    var token = $("#token").val();
    github = new Github({
	token: token,
	auth: "oauth"
    });

    $("#repoform").html(repoHTML);
    $("#file").html(fileHTML);
    $("div#form button").click(getRepo);
    $("#buttonFile").click(writeFile);
};

function writeFile() {
	var name = $("#nameFile").val();
	var text = $("#textFile").val();
	
	repo.write('master', name, text, 'init commit', function(err) {});
}

function getRepo() {
    var user = $("#user").val();
    var reponame = $("#repo").val();
    repo = github.getRepo(user, reponame);
    repo.show(showRepo);
};

function showRepo(error, repo) {
    var repodata = $("#repodata");
    if (error) {
	repodata.html("<p>Error code: " + error.error + "</p>");
    } else {
	repodata.html("<p>Repo data:</p>" +
		      "<ul><li>Full name: " + repo.full_name + "</li>" +
		      "<li>Description: " + repo.description + "</li>" +
		      "<li>Created at: " + repo.created_at + "</li>" +
		      "</ul>")
    }
};

$(document).ready(function() {
    $("div#form button").click(getToken);
});