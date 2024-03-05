const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');

const app = express();
const port = 3123;

app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb+srv://insidepixce:12341234@cluster0.zu9s0b6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 오류:', err));

// 정적 파일 제공
app.use(express.static('public'));

// 1반 학생 목록 가져오기
app.get('/students/1', async (req, res) => {
  try {
    const students = await Student.find({ class: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 추가 페이지 라우트
app.get('/students/add', (req, res) => {
  res.render('add_student'); // add_student.ejs 파일을 렌더링하여 추가 페이지를 보여줌
});

// 루트 경로에 대한 GET 요청 처리
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/home.html');
});


  
// 학생 추가 엔드포인트
app.post('/students/add', async (req, res) => {
  const { name, grade, point, className, gender } = req.body; // 요청으로부터 학생 정보 추출
  try {
    const newStudent = new Student({ name, grade, point, className, gender }); // 새 학생 객체 생성
    await newStudent.save(); // MongoDB에 저장
    res.redirect('/students/1'); // 1반 학생 목록 페이지로 리다이렉트
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
  
// 학생 삭제 엔드포인트
app.post('/students/delete/:id', async (req, res) => {
  const id = req.params.id; // 요청으로부터 삭제할 학생의 ID 추출
  try {
    await Student.findByIdAndDelete(id); // MongoDB에서 해당 ID의 학생을 삭제
    res.redirect('/students/1'); // 1반 학생 목록 페이지로 리다이렉트
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
