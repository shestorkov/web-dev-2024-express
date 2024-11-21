const axios = require('axios');

async function testPostSubjectRequest() {
    try {
      const response = await axios.post(`http://localhost:3000/subject`, {
        name: 'Mathematics',
      });
      console.log('Subject POST response:', response.data);
    } catch (error) {
      console.error('Subject POST error:', error.response ? error.response.data : error.message);
    }
  }
  
  async function testPutUserSubjectsRequest() {
    try {
      const response = await axios.put(`http://localhost:3000/user/subjects`, {
        userId: 1, // Assuming User with ID 1 exists
        subjects: [2], // Assuming Subject with ID 1 exists
      });
      console.log('User Subjects PUT response:', response.data);
    } catch (error) {
      console.error('User Subjects PUT error:', error.response ? error.response.data : error.message);
    }
  }
  
  async function testGetUsersRequest() {
    try {
      const response = await axios.get(`http://localhost:3000/user`);
      console.log('Users GET response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Users GET error:', error.response ? error.response.data : error.message);
    }
}

(async () => {
  console.log('Testing POST /subject...');
  await testPostSubjectRequest();

  console.log('Testing PUT /user/subjects...');
  await testPutUserSubjectsRequest();

  console.log('Testing GET /user...');
  await testGetUsersRequest();
})()