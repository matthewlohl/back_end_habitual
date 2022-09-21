TRUNCATE authors, books RESTART IDENTITY;

INSERT INTO habits(habit_name, date_complete, period, frequency, frequency_done)
VALUES
    ('drink water', '{20220101, 20220102, 20220103}', 1, 5, 0),
    ('gym', '{20220105, 20220107, 20220108}', 1, 3, 0),
    ('basketball', '{20220211, 20220312, 20220320}', 2, 2, 0);
