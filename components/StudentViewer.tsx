// components/StudentViewer.tsx
import React,{useEffect} from 'react';
import { Text,View, FlatList, Button, StyleSheet } from 'react-native';

type Student = {
  _id: string;
  stu_name: string;
  city: string;
};

type Props = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
};

const StudentViewer: React.FC<Props> = ({ students, onEdit, onDelete }) => {
   useEffect(() => {
      console.log("dataum : "+JSON.stringify(students));
    }, [students]);

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => (
        <View style={styles.itemm}>
          <Text>{item.stu_name} | {item.city}</Text>
          <View style={styles.btnGroup}>
            <Button title="Edit" onPress={() => onEdit(item)} />
            <Button title="Delete" onPress={() => onDelete(item._id)} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemm: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default StudentViewer;
