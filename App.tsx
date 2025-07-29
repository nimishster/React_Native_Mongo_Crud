import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert,Text } from 'react-native';
import StudentViewer from './components/StudentViewer';
import StudentForm from './components/StudentForm';
import { API_BASE_URL } from '@env'


export default function App() {
  const [students, setStudents] = useState([]);
  const [stu_name, setStuName] = useState('');
  const [city, setCity] = useState('');
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

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async () => {
    if (!stu_name || !city) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    const payload = { stu_name, city };
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
      loadStudents();
    } catch {
      Alert.alert('Error', 'Operation failed');
    }
  };

  const handleEdit = (student) => {
    setStuName(student.stu_name);
    setCity(student.city);
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
      <Text style={styles.header}>Student Manager</Text>
      <StudentForm
        stu_name={stu_name}
        city={city}
        setStuName={setStuName}
        setCity={setCity}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />
      <View style={{ flex: 1, maxHeight:400 }}>
      <StudentViewer
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
