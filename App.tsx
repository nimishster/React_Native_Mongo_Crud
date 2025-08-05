import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert,Text } from 'react-native';
import StudentViewer from './components/StudentViewer';
import StudentForm from './components/StudentForm';
import SumViewer from './components/SumViewer';
import { API_BASE_URL } from '@env'


export default function App() {
  const [students, setStudents] = useState([]);
  const [aggr, setAggr] = useState([]);
  const [stu_name, setStuName] = useState('');
  const [city, setCity] = useState('');
  const [marks, setMarks] = useState(0);
  const [count, setCount] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setStudents(data.students);
      
    } catch {
      Alert.alert('Error', 'Unable to fetch students');
    }
  };

  const countStudents = async () => {
    try {
      const res = await fetch(API_BASE_URL+"/count");
      const data = await res.json();
      setCount(data.count); 
    } catch {
      Alert.alert('Error', 'Unable to fetch students count');
    }
  };


  const getAggr = async () => {
    try {
      const res = await fetch(API_BASE_URL+"/aggr");
      const data = await res.json();
      setAggr(data.result); 
    } catch {
      Alert.alert('Error', 'Unable to fetch students count');
    }
  };

  useEffect(() => {
    loadStudents();
    countStudents();
    getAggr();
  }, []);

  const handleSubmit = async () => {
    if (!stu_name || !city ||!marks) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    const payload = { stu_name, city, marks };
console.log(editingId+" - "+JSON.stringify(payload))
    try {
      if (editingId) {
        await fetch(`${API_BASE_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setEditingId(null);
      } else {
        await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        await loadStudents();
      }

      setStuName('');
      setCity('');
      setMarks(0);
      loadStudents();
    } catch {
      Alert.alert('Error', 'Operation failed');
    }
  };

  const handleEdit = (student) => {
    setStuName(student.stu_name);
    setCity(student.city);
    setMarks(student.marks.toString());
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      loadStudents();
    } catch {
      Alert.alert('Error', 'Failed to delete');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Manager ({count})</Text>
      <StudentForm
        stu_name={stu_name}
        city={city}
        marks={marks}
        setStuName={setStuName}
        setCity={setCity}
        setMarks={setMarks}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />
      <View style={{ flex: 1, maxHeight:400 }}>
      <StudentViewer
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <SumViewer students={aggr}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
