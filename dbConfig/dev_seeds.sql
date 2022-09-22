INSERT INTO habits(habit_name, date_complete, period, frequency, frequency_done, streak, user_id)
VALUES
    ('drink water', '1998-04-16', 1, 5, 2, NULL , 4),
    ('gym', '1998-04-16', 1, 3, 1 ,NULL , 3),
    ('basketball', '1998-04-16', 2, 2, 2, NULL , 3),
    ('football', '2022-09-22', 1, 3, 3,NULL , 1),
    ('swimming', '1998-04-16', 1, 3, 0,NULL , 1),
    ('golf', '1998-04-16', 4, 1, 0,NULL , 2);



INSERT INTO users(user_name, email,password_digest)
VALUES
    ('Matthew', 'matthew@example.com', '123123'),
    ('Bradley', 'bradley@example.com', 'abcabc'),
    ('Liam', 'liam@example.com', 'jkljkl'),
    ('Cami', 'cami@example.com', 'asdasd');
