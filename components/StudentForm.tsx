import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

type Props = {
  stu_name: string;
  city: string;
  marks: number;
  setStuName: (text: string) => void;
  setCity: (text: string) => void;
  setMarks: (text: number) => void;
  handleSubmit: () => void;
  editingId: string | null;
};

const StudentForm: React.FC<Props> = ({
  stu_name, city, marks, setStuName, setCity, setMarks, handleSubmit, editingId,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={stu_name}
        onChangeText={setStuName}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Marks"
        value={marks.toString()}
        onChangeText={(text) => setMarks(Number(text))}
      />
      <Button title={editingId ? 'Update' : 'Add'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5,
  },
});

export default StudentForm;
