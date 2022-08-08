import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Login from "./components/Login";
import Register from "./components/Register";

import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const myStorage = window.localStorage;

  const [viewport, setViewport] = useState({
    latitude: 48,
    longitude: 2,
    zoom: 4,
  });

  const adminUser = "Kaustubh";

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  // An array for storing pins
  const [pins, setPins] = useState([]);

  // Keeps note of current selected ID
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  // New place to add on Double click
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  // Values set to true when Corresponding buttons are pressed
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // By using this useEffect Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.

  // Axios, which is a popular library is mainly used to send asynchronous HTTP requests to REST endpoints. This library is very useful to perform CRUD operations. This popular library is used to communicate with the backend.

  React.useEffect(() => {
    const getPins = async () => {
      try {
        // We can use path to pins directly coz we specified it in proxy on package.json
        const res = await axios.get("/pins");
        console.log(res);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    //console.log(e.lngLat.lat);

    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };

  const handleSubmit = async (e) => {
    // To stop from refreshing
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const newPin = {
      _id: currentPlaceId,
    };

    try {
      axios.post("/pins/delete", newPin);
      const newArr = pins.filter((item) => {
        return item._id != currentPlaceId;
      });
      setPins(newArr);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Using map component
    <div>
      <Map
        initialViewState={{ ...viewport }}
        style={{ width: "100vw", height: "100vh" }}
        // Created own map and using it through URL
        mapStyle="mapbox://styles/zapdos/cl1hom06y000m14o3g1lwwzqo"
        // Token for API request
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={handleAddClick}
      >
        {/* Use map to iterate through pins array */}
        {pins.map((pin) => (
          <>
            {/* Use of marker component from react-map-gl*/}
            <Marker longitude={pin.long} latitude={pin.lat}>
              <Room
                style={{
                  fontsize: viewport.zoom * 7,
                  color: pin.username === currentUser ? "green" : "red",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
              />
            </Marker>
            {/* Use of Popup component */}

            {pin._id === currentPlaceId && (
              <Popup
                longitude={pin.long}
                latitude={pin.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card flex-container">
                  <label> Place </label>
                  <h4 className="place">{pin.title}</h4>
                  <label> Review </label>
                  <p className="desc" style={{ wordBreak: "break-all" }}>
                    {" "}
                    {pin.desc}{" "}
                  </p>
                  <label> Rating </label>

                  <div className="stars">
                    {Array(pin.rating).fill(<Star className="star" />)}
                  </div>

                  <label> Information </label>
                  <span className="username">
                    {" "}
                    Created by <b>{pin.username}</b>
                  </span>
                  <span className="date">{format(pin.createdAt)}</span>

                  {(pin.username === currentUser || currentUser === adminUser) && (
                    <button
                      type="submit"
                      className="deleteButton"
                      onClick={handleDelete}
                    >
                      {" "}
                      Delete
                    </button>
                  )}
                </div>
              </Popup>
            )}
          </>
        ))}

        {/* If new place is not null */}

        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit} className="inputContainer">
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add pin
                </button>
              </form>
            </div>
          </Popup>
        )}

        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out   🚧
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in 💁
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register 🙋‍♂️
            </button>
          </div>
        )}

        {showRegister && <Register setShowRegister={setShowRegister} />}

        {/* Sending setShowLogin to change it to false once closed, my storage for local storage and current user to set logged user as current */}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
