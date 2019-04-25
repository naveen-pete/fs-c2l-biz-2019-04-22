// function getUser(id) {
//     return {
//       id: id,
//       name: 'Hari'
//     };
// }

// function getUser(id) {
//   setTimeout(() => {
//     return {
//       id: id,
//       name: 'Hari'
//     };
//   }, 3000);
// }

function getUser(id, callback) {
  console.log('getUser() begin')

  if (isNaN(id)) {
    callback('User Id should be a number');
    return;
  }

  setTimeout(() => {

    console.log('getUser() end');
    callback(null, {
      id: id,
      name: 'Hari'
    });

  }, 3000);
}

function getTasks(userId, callback) {
  console.log('getTasks() begin')

  if (isNaN(userId)) {
    callback('User Id should be a number');
    return;
  }

  setTimeout(() => {

    console.log('getTasks() end');
    callback(null, [
      { id: 1, task: 'Get veggies' },
      { id: 2, task: 'Service car' },
      { id: 3, task: 'Go to bank' },
    ]);

  }, 2000);
}
