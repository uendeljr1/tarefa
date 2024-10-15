import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, CheckCircle, ClipboardList } from 'lucide-react-native';
import { TaskContext } from './TaskContext'; // Ajuste o caminho do contexto de tarefas
import BottomNav from './BottomNav'; // Importa a barra inferior de navegação
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function HomeScreen() {
  const { tasks } = useContext(TaskContext); // Obtém as tarefas do contexto
  const navigation = useNavigation(); // Obtém o objeto de navegação para navegar entre telas

  // Filtra as tarefas do dia de hoje
  const todayTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.date === today);
  }, [tasks]);

  // Filtra as tarefas concluídas
  const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks]);

  // Estatísticas para exibir no topo da tela
  const stats = useMemo(() => [
    {
      id: 1,
      title: 'Hoje',
      count: todayTasks.length,
      icon: <Calendar size={24} color="#007AFF" />,
      onPress: () => navigation.navigate('Today'), // Navega para a tela de tarefas do dia
    },
    {
      id: 2,
      title: 'Agendados',
      count: tasks.length,
      icon: <Calendar size={24} color="#FF3B30" />,
      onPress: () => navigation.navigate('DailyTasks'), // Navega para a tela de tarefas diárias
    },
    {
      id: 3,
      title: 'Todos',
      count: tasks.length,
      icon: <ClipboardList size={24} color="#FF9500" />,
      onPress: () => {}, // Aqui você pode definir outra tela ou função
    },
    {
      id: 4,
      title: 'Concluídos',
      count: completedTasks.length,
      icon: <CheckCircle size={24} color="#4CD964" />,
      onPress: () => navigation.navigate('CompletedTasks'), // Navega para a tela de tarefas concluídas
    },
  ], [todayTasks, tasks, completedTasks, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Renderiza as estatísticas */}
        <View style={styles.statsContainer}>
          {stats.map(stat => (
            <TouchableOpacity key={stat.id} style={styles.statItem} onPress={stat.onPress}>
              {stat.icon}
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção de listas */}
        <View style={styles.listsSection}>
          <Text style={styles.listsTitle}>Listas</Text>
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('DailyTasks')}>
            <Text style={styles.listItemText}>Tarefas Diárias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Remédios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Trabalho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra inferior de navegação */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 24,
  },
  statItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statTitle: {
    color: '#8E8E93',
    marginTop: 4,
  },
  listsSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingBottom: 16,
  },
  listsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  listItemText: {
    fontSize: 16,
  },
});
