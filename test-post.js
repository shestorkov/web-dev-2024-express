const axios = require('axios');
const { error } = require('console');


async function testPostSubject1Request() {
  try {
    const response = await axios.post('http://localhost:3000/subject', {
      name: 'Subject 1',
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testPostSubject2Request() {
  try {
    const response = await axios.post('http://localhost:3000/subject', {
      name: 'Subject 2',
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}


async function testPostUniversityRequest() {
  try {
    const response = await axios.post('http://localhost:3000/university', {
      name: 'TU Sofia',
      town: 'Sofia'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}


async function testPostUserRequest() {
  try {
    const response = await axios.post('http://localhost:3000/user', {
      name: 'John Doe',
      email: 'johndoe@example.com',
      universityId: 1,
      subjectId: 1
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

//PUT
async function testPutUserRequest(){
  try{
    const userId = 1;
    const subjectId = 2;

    const response = await axios.put(`http://localhost:3000/user/subject`,{
      subjectId: subjectId,
      userId: userId
    });

    console.log('Response data:' , response.data);
  }catch{error}{
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}




(async () => {
  //await testPostUniversityRequest();
  //аwait testPostSubject1Request();
  //await testPostSubject2Request();
  //await testPostUserRequest();
  await testPutUserRequest();
})()