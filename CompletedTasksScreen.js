import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ArrowLeft, MoreVertical, ChevronDown } from 'lucide-react-native';
import { TaskContext } from './TaskContext';

export default function CompletedTasksScreen({ navigation }) {
  const { tasks, deleteTask } = useContext(TaskContext);

  // Filtra apenas as tarefas que foram concluídas
  const completedTasks = tasks.filter(task => task.completed);

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
        <Text style={styles.headerTitle}>Tarefas Concluídas</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Seletor de categoria logo abaixo do título */}
      <TouchableOpacity style={styles.categorySelector}>
        <Text style={styles.categoryText}>Tarefas Dia</Text>
        <ChevronDown size={20} color="#000" />
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        {completedTasks.length > 0 ? (
          completedTasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.name}</Text>
                <Text style={styles.taskDate}>{task.time}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                <MoreVertical size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>Nenhuma tarefa concluída.</Text>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
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
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    backgroundColor: '#D3E6D3', // Mantém a cor indicando que está concluída
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
  noTasksText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#8E8E93',
  },
});
