const express = require('express');
const Joi = require('joi');
const app = express();
const PORT = 8080;

const courses = [{
    id: 1,
    name: 'course1'
    },
    {
        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3"
    }]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

// Retrive all courses
app.get('/api/courses/', (req, res) => {
    res.send(courses);
})

// Retrive a particular course
app.get('/api/courses/:id/', (req, res) => {

    if (req.body.id != req.params.id) {
        return res.send("Invalid course id")
    } else {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course) {
            return res.staus(404).send("Course not found")
        } else {
            const {
                error
            } = validateCourse(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message)
            } else {
                res.send(course);
            }
        }

    }
})

// Create a new course
app.post('/api/courses/', (req, res) => {

    const {
        error
    } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }

        courses.push(course);
        res.send(course)
    }
})

//Update a course
app.put('/api/courses/:id', (req, res) => {

    if (req.body.id != req.params.id) {
        return res.send("Invalid course id")
    } else {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course) {
            return res.staus(404).send("Course not found")
        } else {
            const {
                error
            } = validateCourse(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message)
            } else {
                course.name = req.body.name;
                let response = {
                    course: course,
                    courses: courses
                }
                res.json(response);
            }
        }

    }
})

// Delete a course
app.delete("/api/courses/:id", (req, res) => {
    if (req.body.id != req.params.id) {
        return res.send("Invalid course id")
    } else {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (!course) {
            return res.status(404).send("Course not found");
        } else {
            const {
                error
            } = validateCourse(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            } else {
                const index = courses.indexOf(course);
                courses.splice(index, 1);
                res.send(course);
            }
        }
    }
})

// Function for validating a course with Joi
function validateCourse(course) {

    const joiSchema = {
        id: Joi.number().integer(). optional(),
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,
        joiSchema)
}

app.listen(PORT, () => console.log(
    `Listening on Port ${PORT}...`));