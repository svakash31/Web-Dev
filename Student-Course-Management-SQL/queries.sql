-- 1. Show all students and their courses
SELECT s.name, c.course_name, e.grade
FROM Students s
JOIN Enrollment e ON s.student_id = e.student_id
JOIN Courses c ON e.course_id = c.course_id;

-- 2. List courses with number of enrolled students
SELECT c.course_name, COUNT(e.student_id) AS total_enrolled
FROM Courses c
LEFT JOIN Enrollment e ON c.course_id = e.course_id
GROUP BY c.course_name;

-- 3. Students with Grade A
SELECT s.name, c.course_name
FROM Students s
JOIN Enrollment e ON s.student_id = e.student_id
JOIN Courses c ON c.course_id = e.course_id
WHERE grade = 'A';
