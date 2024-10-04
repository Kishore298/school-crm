import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const Analytics = () => {
  const [studentData, setStudentData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [genderData, setGenderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [students, teachers, classes, gender] = await Promise.all([
          axios.get('https://school-crm-kxq5.onrender.com/api/students/analytics'),
          axios.get('https://school-crm-kxq5.onrender.com/api/teachers/analytics'),
          axios.get('https://school-crm-kxq5.onrender.com/api/classes/analytics'),
          axios.get('https://school-crm-kxq5.onrender.com/api/students/gender-analytics'),
        ]);

        setStudentData(students.data);
        setTeacherData(teachers.data);
        setClassData(classes.data);
        setGenderData(gender.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const overallData = {
    labels: [
      'Total Paid (Students)',
      'Remaining Fees (Students)',
      'Total Salary (Teachers)'
    ],
    datasets: [
      {
        label: 'Overall Analytics Data',
        backgroundColor: ['#3498db', '#9b59b6', '#2ecc71'],
        data: [
          studentData?.totalPaid || 0,
          studentData?.remainingFees || 0,
          teacherData?.totalSalary || 0,
        ],
      },
    ],
  };

  const genderChartData = {
    labels: ['Male Students', 'Female Students', 'Total Classes'],
    datasets: [
      {
        label: 'Gender and Class Analytics',
        backgroundColor: ['#3498db', '#e74c3c', '#f39c12'], 
        data: [
          genderData?.male || 0,
          genderData?.female || 0,
          classData?.totalClasses || 0, 
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 mt-[150px]">
      <h2 className="text-3xl font-bold text-center mb-4 ">Analytics</h2>
      {loading ? (
        <p>Loading analytics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center space-x-4 ">
            <div className="chart-container" style={{ flex: '1 1 500px', maxWidth: '500px' }}>
              <Bar
                data={overallData}
                options={{
                  scales: {
                    x: { type: 'category' },
                    y: { beginAtZero: true },
                  },
                }}
                width={500} 
                height={300}
              />
            </div>
            <div className="chart-container" style={{ flex: '1 1 500px', maxWidth: '500px' }}>
              <Bar
                data={genderChartData}
                options={{
                  scales: {
                    x: { type: 'category' },
                    y: { beginAtZero: true },
                  },
                }}
                width={500} 
                height={300}
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-center mt-8">Gender Distribution & Class Data</h3>
        </>
      )}
    </div>
  );    
};

export default Analytics;


