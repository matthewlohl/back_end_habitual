const Habit = require('../../../models/Habit');

jest.mock('../../../models/Habit');

const pg = require ('pg')
jest.mock('pg')
