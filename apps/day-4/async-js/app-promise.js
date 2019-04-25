
console.log('Begin');

getUser(1)
  .then((user) => {
    console.log('user:', user);
    return getTasks(user.id);
  })
  .then((tasks) => {
    console.log('tasks:', tasks);
  })
  .catch((error) => {
    console.log('Error:', error);
  });

console.log('End');
