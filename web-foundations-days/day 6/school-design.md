# School Database Design

## Tables

### Students

Stores information about each student, including their name and unique email address.

### Courses

Stores the courses offered by the school.

### Enrolments

Stores which students are enrolled in which courses, together with the student's grade.

---

# Relationships

A student can have many enrolments, so the relationship between **Students** and **Enrolments** is **one-to-many**.

A course can have many enrolments, so the relationship between **Courses** and **Enrolments** is also **one-to-many**.

Students and courses have a **many-to-many** relationship because one student can study many courses and one course can have many students. The **Enrolments** table acts as the join table that connects them.

---

# Index

I would add an index on the `student_id` column in the enrolments table because it would make searching for all courses taken by a student much faster.

---

# SQL or NoSQL?

For this system, I would choose **SQL** because the data is highly structured and contains clear relationships between students, courses and enrolments. SQL databases enforce constraints such as primary keys, foreign keys and unique values, helping maintain data integrity and making complex queries using JOINs efficient.