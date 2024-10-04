const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path'); 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
// const Teacher = require('./models/Teacher');
// const Student = require('./models/Student');
// const Class = require('./models/Class');
// const User = require('./models/User');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers',  teacherRoutes);
app.use('/api/classes', classRoutes);

const PORT = process.env.PORT || 5000;


// const insertDummyData = async () => {
//   try {
//     const existingAdmins = await User.find({ role: 'admin' });

//     if (existingAdmins.length === 0) {
//       const admins = [
//         { name: 'Admin One', email: 'admin1@example.com', password: 'admin123', role: 'admin' },
//         { name: 'Admin Two', email: 'admin2@example.com', password: 'admin123', role: 'admin' },
//       ];

//       for (const admin of admins) {
//         const hashedPassword = await bcrypt.hash(admin.password, 10);
//         await User.create({ ...admin, password: hashedPassword });
//       }
//     }
//     for (let i = 1; i <= 2; i++) {
//       const existingClass = await Class.findOne({ classCode: `CLS${i}` });
//       if (!existingClass) {
//         const classData = new Class({
//           className: `Class ${i}`,
//           classCode: `CLS${i}`,
//           year: 2024,
//         });
//         await classData.save();
//         const teacher = await Teacher.findOne({ email: `teacher${i}@school.com` });
//         let teacherId;
//         if (!teacher) {
//           const newTeacher = new Teacher({
//             name: `Teacher ${i}`,
//             email: `teacher${i}@school.com`,
//             password: 'password123',
//             role: 'teacher',
//             assignedClass: classData._id,
//             salary: 50000 + i * 1000,
//             contact: `98765432${i}`,
//             dob: new Date(1985, i % 12, 15),
//             gender: i % 2 === 0 ? 'male' : 'female',
//           });
//           teacherId = await newTeacher.save();
//         } else {
//           teacherId = teacher._id;
//         }
//         await Class.findByIdAndUpdate(classData._id, { teacher: teacherId });
//         const studentIds = [];
//         for (let j = 1; j <= 9; j++) {
//           const existingStudent = await Student.findOne({ email: `student${j}_class${i}@school.com` });
//           if (!existingStudent) {
//             const student = new Student({
//               name: `Student ${j} Class ${i}`,
//               email: `student${j}_class${i}@school.com`,
//               password: 'password123',
//               role: 'student',
//               assignedClass: classData._id,
//               feesPaid: 10000,
//               remainingFees: 5000,
//               contact: `98765432${j}`,
//               dob: new Date(2005, j % 12, 15),
//               gender: j % 2 === 0 ? 'female' : 'male',
//               feesStructure: {
//                 totalFees: 15000,
//                 dueDate: new Date(2024, 5, 15),
//               },
//             });
//             const savedStudent = await student.save();
//             studentIds.push(savedStudent._id); 
//           } else {
//             studentIds.push(existingStudent._id);
//           }
//         }
//         await Class.findByIdAndUpdate(classData._id, { students: studentIds });
//         console.log(`Class ${i}, Teacher, and 9 students added!`);
//       }
//     }
//   } catch (error) {
//     console.error('Error inserting dummy data:', error);
//   }
// };

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // await insertDummyData();
});


