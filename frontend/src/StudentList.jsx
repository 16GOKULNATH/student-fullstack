// import { useState, useEffect } from "react";
// import axios from "axios";

// function StudentList() {
//   const [students, setStudents] = useState();

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/students")
//       .then(res => setStudents(res.data));
//   });

//   return (
//     <ul>
//       {students.map(s => <li>{s.name}</li>)}
//     </ul>
//   );
// }

// export default StudentList;

//correct code Q3

import { useState, useEffect } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul>
      {students.map(s => <li key={s.id}>{s.name}</li>)}
    </ul>
  );
}

export default StudentList;