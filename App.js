import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
} from "react-native";
import Task from "./components/Task";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Keyboard } from "react-native";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      {/* TODAYS TASKS */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Bugünki Görevlerim</Text>

        <View style={styles.items}>
          {/* TASKS START */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* WRITE A TASK */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Buraya yaz lan!"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#097605",
    borderWidth: 1,
    width: 270,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#A7ECA4",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0A8B05",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#097605",
    marginTop: -3,
  },
});
