import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let id = new Date().getTime()
    let task = {
      id,
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTasks => [...oldTasks, task])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.filter(
      task => {
        if (task.id === id) {
          if (task.done) {
            task.done = false
            return task
          }
          else {
            task.done = true
            return task
          }
        }
        else {
          return task
        }
      }
    ))
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})