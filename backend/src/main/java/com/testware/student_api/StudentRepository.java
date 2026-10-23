package com.testware.student_api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    List<Student> findByNameContainingIgnoreCase(String name);
}