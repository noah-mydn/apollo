import React from "react";
import { Playlists } from "../components/playlists/playlist";
import apiClient from "../spotify api/spotify";
import { Alert, AlertTitle } from "@mui/material";

export const Library = () => {
  const [playlists, setPlaylists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  async function getPlaylists() {
    setLoading(true);
    apiClient
      .get("me/playlists")
      .then((response) => setPlaylists(response.data.items))
      .catch((error) => setError(error));
    setLoading(false);
  }

  React.useEffect(() => {
    getPlaylists();
  }, []);

  //console.log(playlists);
  return (
    <div className="screen-container">
      {error ? (
        <div className="error-box">
          <Alert severity="error" variant="filled" sx={{ padding: "1em 2em" }}>
            <AlertTitle>
              <strong>{error?.message}</strong>
            </AlertTitle>
            {error?.response.data}
            {error?.response.status === 403} &&
            <br />
            <small>
              In order to view the live version, please go to this{" "}
              <a
                href="VIEW_YOUTUBE_DEMO"
                style={{ textDecoration: "none", color: "cyan" }}
              >
                link
              </a>{" "}
              or you can leave your spotify username and email in the contact
              form of my{" "}
              <a
                href="mayyadanar.netlify.app"
                style={{ textDecoration: "none", color: "cyan" }}
              >
                portfolio
              </a>
            </small>
          </Alert>
        </div>
      ) : (
        <>
          <h1
            style={{
              color: "#fff",
              padding: "1em 0 0 3em",
            }}
          >
            Playlists
          </h1>

          <Playlists playlists={playlists} loading={loading} />
        </>
      )}
    </div>
  );
};
