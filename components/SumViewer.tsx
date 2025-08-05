// components/StudentViewer.tsx
import React,{useEffect} from 'react';
import { Text,View, FlatList, StyleSheet } from 'react-native';

type Student = {
  totalMarks: number;
  city: string;
};

type Props = {
  students: Student[];
};

const SumViewer: React.FC<Props> = ({ students }) => {
   useEffect(() => {
      console.log("dataum : "+JSON.stringify(students));
    }, [students]);

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => String(item.totalMarks)}
      renderItem={({ item }) => (
        <View style={styles.itemm}>
          <Text>{item.city} | {item.totalMarks.toString()}</Text>
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

export default SumViewer;
