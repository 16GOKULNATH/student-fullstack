package com.testware.student_api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.testware.student_api.Student;
import com.testware.student_api.StudentRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {

        return studentRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Student not found with id " + id);

                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(error);
                });
    }

    @GetMapping("/search")
    public List<Student> searchStudents(
            @RequestParam String name) {

        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    @PostMapping
    public ResponseEntity<?> addStudent(
            @Valid @RequestBody Student student) {

        if (student.getName() == null || student.getName().isBlank()
                || student.getEmail() == null
                || !student.getEmail().matches(
                        "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {

            Map<String, String> errors = new HashMap<>();

            if (student.getName() == null
                    || student.getName().isBlank()) {
                errors.put("name", "Name is required");
            }

            if (student.getEmail() == null
                    || !student.getEmail().matches(
                            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
                errors.put("email", "Invalid email");
            }

            return ResponseEntity.badRequest().body(errors);
        }

        Student savedStudent = studentRepository.save(student);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedStudent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        return studentRepository.findById(id)
                .<ResponseEntity<?>>map(existingStudent -> {

                    existingStudent.setName(student.getName());
                    existingStudent.setEmail(student.getEmail());
                    existingStudent.setDepartment(
                            student.getDepartment());
                    existingStudent.setMarks(student.getMarks());

                    Student updatedStudent =
                            studentRepository.save(existingStudent);

                    return ResponseEntity.ok(updatedStudent);
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Student not found with id " + id);

                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(error);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {

        if (!studentRepository.existsById(id)) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Student not found with id " + id);

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(error);
        }

        studentRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}