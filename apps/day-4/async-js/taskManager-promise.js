function getUser(id) {
  return new Promise((resolve, reject) => {
    console.log('getUser() begin')

    if (isNaN(id)) {
      reject('User Id should be a number');
      return;
    }

    setTimeout(() => {

      console.log('getUser() end');
      resolve({
        id: id,
        name: 'Hari'
      });

    }, 3000);

  });
}

function getTasks(userId) {
  return new Promise((resolve, reject) => {
    console.log('getTasks() begin')

    if (isNaN(userId)) {
      reject('User Id should be a number');
      return;
    }

    setTimeout(() => {

      console.log('getTasks() end');
      resolve([
        { id: 1, task: 'Get veggies' },
        { id: 2, task: 'Service car' },
        { id: 3, task: 'Go to bank' },
      ]);

    }, 2000);

  });
}
