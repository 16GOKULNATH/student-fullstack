import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export async function getStudents() {
  try {
    const res = await api.get("/api/students");
    return res.data;
  } catch (err) {
    if (!err.response) return "Server is not reachable";
    if (err.response.status === 400) return err.response.data;
    if (err.response.status === 404) return err.response.data.error;
    return err.response.data;
  }
}

export async function addStudent(student) {
  try {
    const res = await api.post("/api/students", student);
    return res.data;
  } catch (err) {
    if (!err.response) return "Server is not reachable";
    if (err.response.status === 400) return err.response.data;
    if (err.response.status === 404) return err.response.data.error;
    return err.response.data;
  }
}

export async function deleteStudent(id) {
  try {
    await api.delete(`/api/students/${id}`);
    return "Student deleted successfully";
  } catch (err) {
    if (!err.response) return "Server is not reachable";
    if (err.response.status === 400) return err.response.data;
    if (err.response.status === 404) return err.response.data.error;
    return err.response.data;
  }
}

export async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    let message = response.statusText;

    try {
      const data = await response.json();
      message = data.error || data.message || message;
    } catch {
      try {
        message = await response.text() || message;
      } catch {}
    }

    throw new Error(`HTTP ${response.status}: ${message}`);
  }

  return response.json();
}

export async function getStudent(id) {
  return getJson(`${import.meta.env.VITE_API_URL}/api/students/${id}`);
}