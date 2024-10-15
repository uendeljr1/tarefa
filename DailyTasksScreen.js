import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ArrowLeft, MoreVertical, ChevronDown } from 'lucide-react-native';
import { TaskContext } from './TaskContext';

export default function DailyTasksScreen({ navigation }) {
  const { tasks, completeTask, deleteTask } = useContext(TaskContext);
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.date === today;
  });

  const handleCompleteTask = (taskId) => {
    Alert.alert(
      'Confirmar',
      'Você tem certeza que deseja concluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Concluir',
          onPress: () => completeTask(taskId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert(
      'Confirmar',
      'Você tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteTask(taskId),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarefas Diárias</Text>
        <View style={styles.headerRight} />
      </View>
      <TouchableOpacity style={styles.categorySelector}>
        <Text style={styles.categoryText}>Tarefas Diárias</Text>
        <ChevronDown size={20} color="#000" />
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        {todayTasks.map(task => (
          <View key={task.id} style={[styles.taskItem, task.completed && styles.completedTask]}>
            <TouchableOpacity 
              style={styles.checkCircle} 
              onPress={() => handleCompleteTask(task.id)}
            />
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>{task.name}</Text>
              <Text style={styles.taskDate}>{task.time}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
              <MoreVertical size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  completedTask: {
    backgroundColor: '#D3E6D3', // Cor para indicar que a tarefa foi concluída
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8E8E93',
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
