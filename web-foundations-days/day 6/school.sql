-- =====================================
-- CREATE TABLES
-- =====================================

CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),

    UNIQUE(student_id, course_id)
);

-- =====================================
-- SAMPLE DATA
-- =====================================

INSERT INTO students (name, email)
VALUES
('Alice Johnson', 'alice@example.com'),
('Brian Smith', 'brian@example.com'),
('Carol Davis', 'carol@example.com');

INSERT INTO courses (name)
VALUES
('Web Development'),
('Database Systems'),
('Programming Fundamentals');

INSERT INTO enrolments (student_id, course_id, grade)
VALUES
(1, 1, 'A'),
(1, 2, 'B+'),
(2, 1, 'B'),
(2, 3, 'A'),
(3, 2, 'A-');

-- =====================================
-- QUERY 1
-- All courses for one student (Alice Johnson)
-- =====================================

SELECT courses.name
FROM students
JOIN enrolments
ON students.id = enrolments.student_id
JOIN courses
ON courses.id = enrolments.course_id
WHERE students.name = 'Alice Johnson';

-- =====================================
-- QUERY 2
-- All students on one course
-- =====================================

SELECT students.name
FROM students
JOIN enrolments
ON students.id = enrolments.student_id
JOIN courses
ON courses.id = enrolments.course_id
WHERE courses.name = 'Web Development';

-- =====================================
-- QUERY 3
-- Number of students per course
-- =====================================

SELECT
courses.name,
COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments
ON courses.id = enrolments.course_id
GROUP BY courses.id;

-- =====================================
-- QUERY 4
-- Students with no enrolments
-- =====================================

SELECT students.name
FROM students
LEFT JOIN enrolments
ON students.id = enrolments.student_id
WHERE enrolments.student_id IS NULL;

-- =====================================
-- QUERY 5
-- Update one enrolment grade
-- =====================================

UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 2
AND course_id = 3;

