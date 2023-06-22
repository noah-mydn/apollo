import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientID = "fbd4af310c2e46f49f1a70f2f091c261";
const clientSecret = "8e1b1679532140988c052592bd8a46ad";
const redirectUri = "https://apollo-noah.netlify.app";
//const redirectUri = "http://localhost:3000";
const scopes = [
  "user-library-read",
  "playlist-read-private",
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-top-read",
  "user-read-recently-played",
  "user-read-currently-playing",
];

export const loginEndpoint = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient;
