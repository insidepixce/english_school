document.addEventListener('DOMContentLoaded', () => {
    const studentsDiv = document.getElementById('students');
  
    // Fetch students data from server
    const fetchStudents = async () => {
      try {
        const response = await fetch('/students');
        const students = await response.json();
        displayStudents(students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
  
    // Display students data
    const displayStudents = (students) => {
      studentsDiv.innerHTML = '';
      students.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.innerHTML = `
          <p>${student.name}</p>
          <button class="plus" data-id="${student._id}">+</button>
          <button class="minus" data-id="${student._id}">-</button>
          <p>현재 포인트: ${student.point}</p>
        `;
        studentsDiv.appendChild(studentDiv);
      });
  
      // Add event listeners for plus and minus buttons
      const plusButtons = document.querySelectorAll('.plus');
      const minusButtons = document.querySelectorAll('.minus');
  
      plusButtons.forEach(button => {
        button.addEventListener('click', () => {
          const studentId = button.getAttribute('data-id');
          updatePoint(studentId, 'increase');
        });
      });
  
      minusButtons.forEach(button => {
        button.addEventListener('click', () => {
          const studentId = button.getAttribute('data-id');
          updatePoint(studentId, 'decrease');
        });
      });
    };
  
    // Update student's point
    const updatePoint = async (id, action) => {
      try {
        const response = await fetch(`/students/${id}/${action}`, { method: 'PATCH' });
        const data = await response.json();
        console.log(data.message);
        fetchStudents(); // Refresh student data after updating point
      } catch (error) {
        console.error('Error updating point:', error);
      }
    };
  
    // Fetch students data on page load
    fetchStudents();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const studentsDiv = document.getElementById('students');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
  
    btn1.addEventListener('click', () => {
      window.location.href = '/1';
    });
  
    btn2.addEventListener('click', () => {
      window.location.href = '/2';
    });
  
    // 이하 생략...
  });
  
  