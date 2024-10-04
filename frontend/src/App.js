import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Classes from './components/Classes';
import ClassDetail from './components/ClassDetail';
import StudentDetail from './components/StudentDetail';
import TeacherDetail from './components/TeacherDetail';
import Analytics from './components/Analytics';
import Login from './components/Login';
import AddTeacher from './components/AddTeacher';
import AddClass from './components/AddClass';
import AddStudent from './components/AddStudent';

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  console.log('User Data:', user);
  console.log('Is Authenticated:', isAuthenticated); 

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route path="/classes/:id" element={<ClassDetail />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
            <Route path="/add-class" element={<AddClass />} />
            <Route path="/add-student" element={<AddStudent />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;









