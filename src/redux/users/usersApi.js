import api from '../../api'

export function fetchUsers() {
    return new Promise((resolve, reject) =>
      api.get('/')
      .then((response) => {
        resolve({data: response.data}) 
      })
      .catch((error) => {
        reject()
      })
    );
  }