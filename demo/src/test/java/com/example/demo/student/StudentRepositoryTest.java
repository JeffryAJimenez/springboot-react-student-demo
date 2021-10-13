package com.example.demo.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfStudentExistsEmail() {

        //given
        String email = "john@mail.com";
        Student student = new Student(
                "John",
                email,
                Gender.MALE
        );


        underTest.save(student);

        //when

        boolean exists = underTest.selectExistsEmail(email);

        //then

        assertThat(exists).isTrue();

    }

    @Test
    void itShouldCheckIfStudentEmailDoesNotExist() {

        //given
        String email = "john@mail.com";

        //when

        boolean exists = underTest.selectExistsEmail(email);

        //then

        assertThat(exists).isFalse();

    }
}