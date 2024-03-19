import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

function LandingScreen() {
  const [exercise, setExercise] = useState([]);
  const [search, setSearch] = useState("");
  const [noOfExercise, setNoOfExercise] = useState(10);

  useEffect(() => {
    async function getData() {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back",
        params: { limit: noOfExercise },
        headers: {
          "X-RapidAPI-Key":
            "d3ca8691b5mshdf20109d6f12293p1f90b5jsnc64cef66f8f5",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setExercise(response.data)
        console.log(exercise);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
}, [noOfExercise],[]);

function loadMOre() {
    setNoOfExercise((preExercise) => preExercise + 10);
}

function searchExercise(e) {
    setSearch(e.target.value);
}

  const filteredData = exercise.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Nav></Nav>

      <div>
        <input
          type="text"
          placeholder="Search exercise"
          value={search}
          onChange={searchExercise}
          className="border-2 rounded-md px-5 py-1 my-10"
        />
      </div>
      <div className="flex flex-wrap gap-10 justify-center">
        {filteredData.map((exercise) => {
          return(
            <div key={exercise.id} className="border border-black rounded-xl p-5 bg-white">
            <div>
             <div className="flex justify-between my-3">
             <span>{exercise.bodyPart.charAt(0).toUpperCase()+exercise.bodyPart.slice(1)}</span>
              <span>{exercise.equipment.charAt(0).toUpperCase()+exercise.equipment.slice(1)}</span>
             </div>
              <h1 className="text-2xl font-semibold text-gray-600 py-3">{exercise.name.charAt(0).toUpperCase()+exercise.name.slice(1)}</h1>
            </div>
            <div>
              <img src={exercise.gifUrl} alt="" />
            </div>
          </div>
          )
        })}
      </div>

      <div>
        <button onClick={loadMOre} className="border rounded-md px-5 py-1 bg-green-500 hover:bg-green-600 text-white my-10">Load More</button>
      </div>
    </div>
  );
}

export default LandingScreen;
