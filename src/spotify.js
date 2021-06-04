// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// 1] when we click on login button we will send the request spotify using below link to
// authneticate the user

export const authEndpoint = "https://accounts.spotify.com/authorize";

//2] after getting authenticated we will redirected to the below url

const redirectUri = "http://localhost:3000/";

//3]below are the tasks a user is permitted to do once getting logged in

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

const clientId = "cff76213089a4e228206c8bf120d67cb";
//4 obtained from spotify for developer website

//5 combining the authendpoint,redirectUri and scopes into one uri to be given to login button's href

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

//6 for obtaining the authtoken once getting logged in
export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};
