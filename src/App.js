import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //get today's date to set to initial photoDate state
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const [photoOfTheDay, setPhotoOfTheDay] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [photoDate, setPhotoDate] = useState(today);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&date=${photoDate}`
      )
      .then(res => {
        // console.log(res);
        setPhotoOfTheDay(res.data);
      })
      .catch(err => {
        // console.log(err);
        setErrMsg(`${err.response.status} ${err.response.statusText}`);
      });
  }, [photoDate, errMsg]);

  const handleChange = event => {
    console.log(event.target.value); // this is the value coming from the date picker input
    setPhotoDate(event.target.value);
  };

  let { date, explanation, title, url } = photoOfTheDay; // deconstruct photoOfTheDay state object
  if (errMsg !== "") return <h1 style={{ textAlign: "center" }}>{errMsg}</h1>;
  return (
    <div className="App">
      <input type="date" onChange={handleChange} />
      <p>{date}</p>
      <p>{title}</p>
      <img src={url} alt={title} />
      <p>{explanation}</p>
    </div>
  );
}

export default App;
