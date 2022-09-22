TRUNCATE authors, books RESTART IDENTITY;

INSERT INTO habits(habit_name, date_complete, period, frequency, frequency_done)
VALUES
    ('drink water', '{20220101, 20220102, 20220103}', 1, 5, 0, 4),
    ('gym', '{20220105, 20220107, 20220108}', 1, 3, 0, 3),
    ('basketball', '{20220211, 20220312, 20220320}', 2, 2, 0, 3),
    ('football', '{20190511, 20191203, 20200120}', 1, 3, 0, 1),
    ('swimming', '{20180529, 20191020, 20211225}', 1, 3, 0, 1),
    ('golf', '{20180529, 20191020, 20211225}', 4, 1, 0, 2);

TRUNCATE habits, users RESTART IDENTITY;

INSERT INTO users(user_name)
VALUES
    ('test user1', 'bradley@example.com', 'abcabc'),
    ('test user2', 'liam@example.com', 'jkljkl'),
    ('test user3', 'cami@example.com', 'asdasd');
