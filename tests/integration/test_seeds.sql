TRUNCATE habits RESTART IDENTITY;

INSERT INTO habits(habit_name, date_complete, period, frequency, frequency_done)
VALUES
    ('Habit 1',
    '{20220101, 20220102, 20220103}',
     1, 
     5, 
     0),
    ('Habit 2', 
    '{20220105, 20220107, 20220108}',
     1, 
     3, 
     0),
    ('Habit 3', 
    '{20220211, 20220312, 20220320}', 
    2, 
    2, 
    0);

-- INSERT INTO users(user_name, email,password_digest)
-- VALUES
--     ('Matthew', 
--     'matthew@example.com', 
--     '123123'),
--     ('Bradley', 
--     'bradley@example.com', 
--     'abcabc'),
--     ('Liam', 
--     'liam@example.com', 
--     'jkljkl'),
--     ('Cami', 
--     'cami@example.com', 
--     'asdasd');
