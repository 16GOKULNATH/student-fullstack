// import axios from "axios";

// async function loadStudents() {
//   try {
//     const res = await axios.get("/api/students");
//     setStudents(res.data);
//   } catch (err) {
//     console.log(err.response.status);
//   }
// }

// export default loadStudents;

// correct code 

import axios from "axios";

async function loadStudents(setStudents) {
  try {
    const res = await axios.get("http://localhost:8080/api/students");
    setStudents(res.data);
  } catch (err) {
    console.log(err.response?.status ?? err.message);
  }
}

export default loadStudents;