import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StudentForm.css';

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    totalMarks: 0,
    grades: '',
  });

  const calculateGrades = (marks) => {
    if (marks >= 90) return 'A';
    else if (marks >= 80) return 'B';
    else if (marks >= 70) return 'C';
    else if (marks >= 60) return 'D';
    else return 'F';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, totalMarks } = studentData;
      const grades = calculateGrades(totalMarks);
      const response = await axios.post('http://localhost:3001/students', {
        name,
        totalMarks,
        grades,
      });
      console.log(response.data);

      // Reset all input fields after successful submission
      setStudentData({
        name: '',
        totalMarks: 0,
        grades: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    // Reset all input fields when the reset button is clicked
    setStudentData({
      name: '',
      totalMarks: 0,
      grades: '',
    });
  };

const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
      grades: name === 'totalMarks' ? calculateGrades(value) : prevData.grades, // Recalculate grades on marks change
    }));
  };

  return (
    <div className="student-form-container">
      <h1>Student Information Form</h1>
      <form onSubmit={handleSubmit} className="form-table">
        <table>
          <tbody>
            <tr>
              <td> <label htmlFor='name'>Name:</label> </td>
              <td>
                <input type="text" name="name" id='name' onChange={handleChange} value={studentData.name} required autoComplete='off'/>
              </td>
            </tr>

            <tr>
              <td> <label htmlFor='marks'>Total Marks:</label> </td>
              <td>
                <input type="number" id='marks' name="totalMarks" value={studentData.totalMarks} onChange={handleChange} required autoComplete='off' />
              </td>
            </tr>

            <tr>
              <td> <label htmlFor='grades'>Grades:</label> </td>
              <td>
                 <input type="text" id='grades' name="grades" value={studentData.grades} readOnly />
              </td>
            </tr>

            <tr>
              <td colSpan="2" className="form-buttons">  
                    <button type="submit" style={{marginRight: '10px'}}>Submit</button> 
                    <button type="button" onClick={handleReset}>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default StudentForm;