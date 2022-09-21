INSERT INTO habits(habit_name, date_complete, period, frequency, frequency_done, user_id)
VALUES
    ('drink water', '{20220101, 20220102, 20220103}', 1, 5, 0, 4),
    ('gym', '{20220105, 20220107, 20220108}', 1, 3, 0, 3),
    ('basketball', '{20220211, 20220312, 20220320}', 2, 2, 0, 3),
    ('football', '{20190511, 20191203, 20200120}', 1, 3, 0, 1),
    ('swimming', '{20180529, 20191020, 20211225}', 1, 3, 0, 1),
    ('golf', '{20180529, 20191020, 20211225}', 4, 1, 0, 2);


INSERT INTO users(user_name, email,password_digest)
VALUES
    ('Matthew', 'matthew@example.com', '123123'),
    ('Bradley', 'bradley@example.com', 'abcabc'),
    ('Liam', 'liam@example.com', 'jkljkl'),
    ('Cami', 'cami@example.com', 'asdasd');
