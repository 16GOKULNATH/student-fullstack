//Q1 worng code
// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:8080/api/students/99")
//       .then(res => res.json())
//       .then(data => console.log(data.name))
//       .catch(err => console.log("Error: " + err.message));
//   }, []);

//   return (
//     <div>
//       <h1>Q1 - Fetch Error Handling</h1>
//       <p>Open the browser console to see the output.</p>
//     </div>
//   );
// }

// export default App;

//Q1 correct code

// import { useState } from "react";

// function App() {
//   const [result, setResult] = useState("Click the button to test Q1");

//   const checkStudent = () => {
//     fetch("http://localhost:8080/api/students/99")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Student not found with id 99");
//         }

//         return res.json();
//       })
//       .then((data) => {
//         console.log(data.name);
//         setResult(data.name);
//       })
//       .catch((err) => {
//         console.error("Error: " + err.message);
//         setResult("Error: " + err.message);
//       });
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "Arial" }}>
//       <h1>Q1 - Fetch Error Handling</h1>

//       <p>Check whether student ID 99 exists.</p>

//       <button onClick={checkStudent}>
//         Check Student
//       </button>

//       <h3>Result:</h3>

//       <p>{result}</p>
//     </div>
//   );
// }

// export default App;

//Q2 wrong code

// import { useState } from "react";

// function App() {
//   const [result, setResult] = useState("");

//   const addStudent = () => {
//     fetch("http://localhost:8080/api/students", {
//       method: "POST",
//       body: {
//         name: "Arun",
//         email: "arun@gmail.com",
//         department: "CSE",
//         marks: 85
//       }
//     })
//       .then(res => res.json())
//       .then(data => setResult(JSON.stringify(data)))
//       .catch(err => setResult(err.message));
//   };

//   return (
//     <div>
//       <h1>Q2 - Before Fix</h1>
//       <button onClick={addStudent}>Add Student</button>
//       <p>{result}</p>
//     </div>
//   );
// }

// export default App;

//Q2 correct code

// import { useState } from "react";

// function App() {
//   const [result, setResult] = useState("");

//   const addStudent = () => {
//     fetch("http://localhost:8080/api/students", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: "Arun",
//         email: "arun@gmail.com",
//         department: "CSE",
//         marks: 85
//       })
//     })
//       .then(res => res.json())
//       .then(data => setResult(JSON.stringify(data)))
//       .catch(err => setResult(err.message));
//   };

//   return (
//     <div>
//       <h1>Q2 - After Fix</h1>
//       <button onClick={addStudent}>Add Student</button>
//       <p>{result}</p>
//     </div>
//   );
// }

// export default App;

// import StudentList from "./StudentList";

// function App() {
//   return (
//     <div>
//       <h1>Q3 - Student List</h1>
//       <StudentList />
//     </div>
//   );
// }

// export default App;

//Q4
// import { useState } from "react";
// import loadStudents from "./loadStudents";

// function App() {
//   const [students, setStudents] = useState([]);

//   return (
//     <div>
//       <h1>Q4 - Load Students</h1>

//       <button onClick={() => loadStudents(setStudents)}>
//         Load Students
//       </button>

//       <ul>
//         {students.map(student => (
//           <li key={student.id}>{student.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

//Q7
// import { useState } from "react";

// function App() {
//   const [output, setOutput] = useState([]);

//   const runCode = () => {
//     setOutput([]);

//     console.log("A");
//     setOutput(prev => [...prev, "A"]);

//     fetch("http://localhost:8080/api/students")
//       .then(() => {
//         console.log("B");
//         setOutput(prev => [...prev, "B"]);
//       })
//       .catch(err => console.error(err));

//     setTimeout(() => {
//       console.log("C");
//       setOutput(prev => [...prev, "C"]);
//     }, 0);

//     Promise.resolve().then(() => {
//       console.log("D");
//       setOutput(prev => [...prev, "D"]);
//     });

//     console.log("E");
//     setOutput(prev => [...prev, "E"]);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Q7 - Predict the Output</h1>

//       <button onClick={runCode}>Run Code</button>

//       <h2>Output</h2>

//       {output.map((letter, index) => (
//         <p key={index}>{letter}</p>
//       ))}
//     </div>
//   );
// }

// export default App;

//Q8
// import { useState } from "react";

// function App() {
//   const [output, setOutput] = useState([]);

//   async function f(log) {
//     log("1");
//     await null;
//     log("2");
//   }

//   function runCode() {
//     setOutput([]);

//     const log = (value) => {
//       console.log(value);
//       setOutput((prev) => [...prev, value]);
//     };

//     log("3");
//     f(log);
//     log("4");
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Q8 - Predict the Output</h1>

//       <button onClick={runCode}>Run Code</button>

//       <h2>Output</h2>

//       {output.map((value, index) => (
//         <p key={index}>{value}</p>
//       ))}
//     </div>
//   );
// }

// export default App;

//Q9

// import axios from "axios";
// import { useState } from "react";

// function App() {
//   const [output, setOutput] = useState([]);

//   async function runCode() {
//     setOutput([]);

//     const log = (value) => {
//       console.log(value);
//       setOutput((prev) => [...prev, value]);
//     };

//     try {
//       await axios.get("http://localhost:8080/api/students/99");
//       log("OK");
//     } catch (err) {
//       log(err.response.status);
//       log(err.response.data.error);
//     }

//     log("Done");
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Q9 - Axios Error Handling</h1>
//       <button onClick={runCode}>Run Code</button>

//       <h2>Output</h2>
//       {output.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   );
// }

// export default App;

//Q10

// import { useState } from "react";

// function App() {
//   const [output, setOutput] = useState([]);

//   async function runCode() {
//     setOutput([]);

//     const log = (value) => {
//       console.log(value);
//       setOutput((prev) => [...prev, String(value)]);
//     };

//     try {
//       const res = await fetch(
//         "http://localhost:8080/api/students/99"
//       );

//       log(res.ok);
//       log(res.status);

//       const data = await res.json();
//       log(data.error);
//     } catch (err) {
//       log("Error: " + err.message);
//     }
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Q10 - Fetch Response</h1>
//       <button onClick={runCode}>Run Code</button>

//       <h2>Output</h2>
//       {output.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   );
// }

// export default App;

//Q11

// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   function add() {
//     setCount(count + 1);
//     setCount(count + 1);
//     setCount(c => c + 1);
//     console.log(count);
//   }

//   return (
//     <div>
//       <h1>Q11 - React useState</h1>
//       <h2>Count: {count}</h2>
//       <button onClick={add}>Add</button>
//     </div>
//   );
// }

// export default App;

//Q12

// function App() {
//   const s = {
//     name: "Arun",
//     marks: 85,
//     address: undefined,
//     tags: ["a", "b"]
//   };

//   function runCode() {
//     console.clear();

//     console.log(JSON.stringify(s));
//     console.log(JSON.parse('{"x":1,"y":[2,3]}').y.length);
//     console.log(typeof JSON.parse("42"));
//   }

//   return (
//     <div>
//       <h1>Q12 - JSON Output</h1>
//       <button onClick={runCode}>Run Code</button>
//     </div>
//   );
// }

// export default App;

//Q15

// import { useState } from "react";
// import { deleteStudent, getStudents } from "./api";

// function App() {
//   const [output, setOutput] = useState([]);

//   async function runTest() {
//     const result1 = await deleteStudent(99);
//     console.log(result1);
//     setOutput(prev => [...prev, String(result1)]);

//     const result2 = await getStudents();
//     console.log(result2);
//     setOutput(prev => [...prev, String(result2)]);
//   }

//   return (
//     <div>
//       <h1>Q15 - Axios Service Module</h1>
//       <button onClick={runTest}>Run Test</button>

//       {output.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   );
// }

// export default App;

//Q16

// import { useState } from "react";
// import { getStudent } from "./api";

// function App() {
//   const [output, setOutput] = useState("");

//   async function runTest() {
//     try {
//       const student = await getStudent(99);
//       setOutput(JSON.stringify(student));
//     } catch (e) {
//       console.log(e.message);
//       setOutput(e.message);
//     }
//   }

//   return (
//     <div>
//       <h1>Q16 - Fetch Wrapper</h1>
//       <button onClick={runTest}>Run Test</button>
//       <p>{output}</p>
//     </div>
//   );
// }

// export default App;

//Q17

import StudentPage from "./StudentPage";

function App() {
  return <StudentPage />;
}

export default App;