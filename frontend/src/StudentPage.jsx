// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = `${import.meta.env.VITE_API_URL}/api/students`;

// function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     department: "",
//     marks: ""
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     let cancelled = false;

//     setLoading(true);
//     setError("");

//     const timer = setTimeout(async () => {
//       try {
//         const url = search.trim()
//           ? `${API}/search?name=${encodeURIComponent(search.trim())}`
//           : API;

//         const response = await axios.get(url);

//         if (!cancelled) {
//           setStudents(response.data);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err.response?.data?.error ||
//             err.message ||
//             "Unable to load students"
//           );
//           setStudents([]);
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     }, 300);

//     return () => {
//       cancelled = true;
//       clearTimeout(timer);
//     };
//   }, [search]);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   }

//   async function handleAdd(e) {
//     e.preventDefault();
//     setErrors({});
//     setError("");

//     try {
//       await axios.post(API, {
//         ...form,
//         marks: Number(form.marks)
//       });

//       setForm({
//         name: "",
//         email: "",
//         department: "",
//         marks: ""
//       });

//       setSearch("");
//       setLoading(true);

//       const response = await axios.get(API);
//       setStudents(response.data);
//       setError("");
//     } catch (err) {
//       if (err.response?.status === 400) {
//         setErrors(err.response.data);
//       } else {
//         setError(
//           err.response?.data?.error ||
//           err.message ||
//           "Unable to add student"
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Are you sure you want to delete this student?")) {
//       return;
//     }

//     try {
//       await axios.delete(`${API}/${id}`);
//       setStudents(previous => previous.filter(student => student.id !== id));
//       setError("");
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//         err.message ||
//         "Unable to delete student"
//       );
//     }
//   }

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Q17 - Student Management</h1>

//       <h2>Add Student</h2>

//       <form onSubmit={handleAdd}>
//         {["name", "email", "department", "marks"].map(field => (
//           <div key={field} style={{ marginBottom: "12px" }}>
//             <input
//               name={field}
//               type={field === "marks" ? "number" : "text"}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={form[field]}
//               onChange={handleChange}
//               style={{ padding: "8px", width: "250px" }}
//             />

//             {errors[field] && (
//               <div style={{ color: "red" }}>{errors[field]}</div>
//             )}
//           </div>
//         ))}

//         <button type="submit">Add Student</button>
//       </form>

//       <h2>Search Students</h2>

//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//         style={{ padding: "8px", width: "250px" }}
//       />

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <h2>Student List</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : !error && students.length === 0 ? (
//         <p>No students found</p>
//       ) : (
//         !error && (
//           <table
//             border="1"
//             cellPadding="8"
//             style={{ marginTop: "15px", borderCollapse: "collapse" }}
//           >
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Department</th>
//                 <th>Marks</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map(student => (
//                 <tr key={student.id}>
//                   <td>{student.id}</td>
//                   <td>{student.name}</td>
//                   <td>{student.email}</td>
//                   <td>{student.department}</td>
//                   <td>{student.marks}</td>
//                   <td>
//                     <button onClick={() => handleDelete(student.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )
//       )}
//     </div>
//   );
// }

// export default StudentPage;

//Q18

import { useEffect, useState } from "react";
import axios from "axios";

const API = "/api/students";

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    marks: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    const timer = setTimeout(async () => {
      try {
        const url = search.trim()
          ? `${API}/search?name=${encodeURIComponent(search.trim())}`
          : API;

        const response = await axios.get(url);

        if (!cancelled) {
          setStudents(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              err.message ||
              "Unable to load students"
          );
          setStudents([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleAdd(e) {
    e.preventDefault();
    setErrors({});
    setError("");

    try {
      await axios.post(API, {
        ...form,
        marks: Number(form.marks)
      });

      setForm({
        name: "",
        email: "",
        department: "",
        marks: ""
      });

      setSearch("");
      setLoading(true);

      const response = await axios.get(API);
      setStudents(response.data);
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      } else {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Unable to add student"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      setStudents(previous =>
        previous.filter(student => student.id !== id)
      );
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Unable to delete student"
      );
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Q18 - CORS Configuration</h1>

      <h2>Add Student</h2>

      <form onSubmit={handleAdd}>
        {["name", "email", "department", "marks"].map(field => (
          <div key={field} style={{ marginBottom: "12px" }}>
            <input
              name={field}
              type={field === "marks" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              style={{ padding: "8px", width: "250px" }}
            />

            {errors[field] && (
              <p style={{ color: "red", margin: "4px 0" }}>
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        <button type="submit">Add Student</button>
      </form>

      <h2>Search Students</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Student List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? null : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", marginTop: "15px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.marks}</td>
                <td>
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentPage;