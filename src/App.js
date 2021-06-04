import React, { useEffect } from "react";
import "./App.css";

import Player from "./components/Player";
import Login from "./components/Login";

import { useStateValue } from "./components/StateProvider";

import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromResponse } from "./spotify";

const s = new SpotifyWebApi(); // creating an instance of spotifywebApi

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse(); //gets the hash string
    window.location.hash = ""; // for security reasons we clear the search bar of the browser
    let _token = hash.access_token; //extracts the user token from the hash object

    if (_token) {
      s.setAccessToken(_token); //connect to spotify api if token is present

      // sets the token in the context api
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      //37i9dQZEVXcJZyENOWUFo7
      // getting the playlist from spotify and updating our react context api
      s.getPlaylist("2JWk0zHiOtRSw0vWOWOirQ").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      // getting the Top artist data from spotify and updating our react context api
      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      //sets the spotifyWebApi object in the react context
      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      //gets the current user who is logged in  and updates our react context api
      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      //gets the users current playlist and updates our react context api
      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={s} />}
    </div>
  );
}

export default App;
