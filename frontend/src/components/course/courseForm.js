
import { useState } from 'react'

const CourseForm = () => {

    const [courseDetails, setCourseDetails] = useState(
        {
            title: "",
            description: "",
            instructor: "",
            duration: 0,
            availableSlots: 0
        }
    )

    //handles the details of the course form when user wanted to add a course
    const handleChange = (e) => {

        const { name, value } = e.target;

        setCourseDetails((currentDetails) => ({
            ...currentDetails,
            [name]: value,
        }));

    };

    //handles when user clicks the submit button
    const handleSubmit = async (e) => {

        //prevents website from refreshing
        e.preventDefault();

        try {
            const token = await localStorage.getItem("token")
            const response = await fetch('api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(courseDetails)
            })

            if (response.ok) {
                const data = await response.json()
                console.log("Course Added successfully")
                setCourseDetails({
                    title: "",
                    description: "",
                    instructor: "",
                    duration: 0,
                    availableSlots: 0
                })
            }
            else {
                throw new Error("Error Adding Course")
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h2>Create a new Course</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder='Course Title'
                    value={courseDetails.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name='description'
                    placeholder='Course Description'
                    value={courseDetails.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name='instructor'
                    placeholder='Althani Leonida'
                    value={courseDetails.instructor}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name='duration'
                    placeholder='0'
                    value={courseDetails.duration}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name='availableSlots'
                    placeholder='0'
                    value={courseDetails.availableSlots}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CourseForm