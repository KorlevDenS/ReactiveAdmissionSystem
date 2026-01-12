-- ============================
-- EDUCATIONAL PROGRAMS
-- ============================
INSERT INTO programs (
    id,
    title,
    description,
    education_level,
    budget_places_number,
    contract_places_number,
    contract_cost,
    minimum_passing_score
)
VALUES
    (1, 'Computer Science', 'Study of algorithms, data structures, and software engineering.', 'BACHELOR', 50, 20, 120000, 70),
    (2, 'Applied Mathematics', 'Advanced math, modeling, and analytics.', 'BACHELOR', 30, 10, 110000, 65),
    (3, 'Software Engineering', 'Focus on large-scale software systems.', 'MASTER', 15, 5, 150000, 75)
ON CONFLICT (id) DO NOTHING;
SELECT setval('programs_id_seq', (SELECT MAX(id) FROM programs));


-- ============================
-- APPLICANTS
-- ============================
INSERT INTO applicants (
    id,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    points_number,
    previous_education_average_score,
    entrance_test
)
VALUES
    (1, 'Ivan', 'Petrov', 'ivan.petrov@example.com', '+79991234567', 'Moscow', 85, 4.5, 'ENTRANCE_EXAM'),
    (2, 'Anna', 'Sidorova', 'anna.sidorova@example.com', '+79997654321', 'Saint Petersburg', 90, 4.7, 'OLYMPIAD'),
    (3, 'Dmitry', 'Kuznetsov', 'd.kuz@example.com', '+79995556677', 'Kazan', 78, 4.2, 'STATE_EXAM')
ON CONFLICT (id) DO NOTHING;
SELECT setval('applicants_id_seq', (SELECT MAX(id) FROM applicants));



-- ============================
-- MANY-TO-MANY LINKS
-- applicant_programs
-- ============================
INSERT INTO applicant_programs (applicant_id, program_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (3, 2),
    (3, 3)
ON CONFLICT DO NOTHING;
