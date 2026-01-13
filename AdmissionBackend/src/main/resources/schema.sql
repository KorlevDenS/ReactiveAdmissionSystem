CREATE TABLE IF NOT EXISTS programs (
                                        id BIGSERIAL PRIMARY KEY,
                                        title VARCHAR(255) NOT NULL,
                                        description TEXT,
                                        education_level VARCHAR(50) NOT NULL,
                                        budget_places_number INT NOT NULL,
                                        contract_places_number INT NOT NULL,
                                        contract_cost INT NOT NULL,
                                        minimum_passing_score INT NOT NULL
);
CREATE TABLE IF NOT EXISTS applicants (
                                          id BIGSERIAL PRIMARY KEY,
                                          first_name VARCHAR(255) NOT NULL,
                                          last_name VARCHAR(255) NOT NULL,
                                          email VARCHAR(255) NOT NULL,
                                          phone_number VARCHAR(50),
                                          address VARCHAR(255),
                                          points_number INT,
                                          previous_education_average_score DOUBLE PRECISION,
                                          entrance_test VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS applicant_programs (
                                                  id BIGSERIAL PRIMARY KEY,
                                                  applicant_id BIGINT NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
                                                  program_id BIGINT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
                                                  UNIQUE (applicant_id, program_id)
);
