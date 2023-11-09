import { useState } from "react";

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseID, setCourseID] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSearch = () => {
    try {
      fetch(`/api/courses/${courseID}`)
        .then((response) => {
          if (response.ok) {
            console.log("Course existing");
            return response.json();
          }
          setCourseDetails(null);
        })
        .then((data) => {
          setCourseDetails(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    console.log(courseDetails);
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/courses/${courseID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseDetails),
      });

      if (response.ok) {
        await response.json();
        console.log("Course updated successfully");
      } else {
        throw new Error("Error updating Course");
      }
    } catch (error) {
      console.log(error);
    }

    setEditMode(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/courses/${courseID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        console.log("Course deleted successfully");
      } else {
        throw new Error("Error deleting Course");
      }

    } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
      <h2> Course Details </h2>
      <input
        type="text"
        name="id"
        placeholder="Course ID"
        value={courseID}
        onChange={(e) => setCourseID(e.target.value)}
      />
      <button onClick={handleSearch}> Search </button>
      {courseDetails ? (
        <div>
          {editMode ? (
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  value={courseDetails.title}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="description"
                  value={courseDetails.description}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="instructor"
                  value={courseDetails.instructor}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="duration"
                  value={courseDetails.duration}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="availableSlots"
                  value={courseDetails.availableSlots}
                  onChange={handleChange}
                />
                <button> Submit </button>
              </form>
            </div>
          ) : (
            <div>
              <p>Title: {courseDetails.title}</p>
              <p>Description: {courseDetails.description}</p>
              <p>Instructor: {courseDetails.instructor}</p>
              <p>Duration: {courseDetails.duration}</p>
              <p>Available Slots: {courseDetails.availableSlots}</p>
              <button onClick={handleEdit}> Edit Mode </button>
            </div>
          )}
          <button onClick={handleDelete}> Delete </button>
        </div>
      ) : <div> No course found </div>}
    </div>
  );
};

export default CourseDetails;
