console.log('Begin');

function showUser(error, user) {
  if (error) {
    console.log('Error:', error);
    return;
  }

  console.log('user:', user);
  getTasks(user.id, showTasks);
}

function showTasks(error, tasks) {
  if (error) {
    console.log('Error:', error);
    return;
  }

  console.log('tasks:', tasks);
}

// callback hell
// getUser(1, (error, user) => {
//   if (error) {
//     console.log('Error:', error);
//     return;
//   }

//   console.log('user:', user);
//   getTasks(user.id, (error, tasks) => {
//     if (error) {
//       console.log('Error:', error);
//       return;
//     }

//     console.log('tasks:', tasks);
//   });
// });

getUser(1, showUser);
// getUser('a', showUser);

// get a product

console.log('End');

