importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js')

// Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyC0YKUY66D6LnWSEJiFdD3lXEgUg1XHEgg',
  authDomain: 'astaria-9df52.firebaseapp.com',
  projectId: 'astaria-9df52',
  storageBucket: 'astaria-9df52.appspot.com',
  messagingSenderId: '537133691930',
  appId: '1:537133691930:web:41bf063be702f550de4da3',
})

const messaging = firebase.messaging()

// IndexedDB
const DB_NAME = 'WALLET_CONNECT_V2_INDEXED_DB'
const OBJECT_STORE_NAME = 'keyvaluestorage'
const OBJECT_KEY = 'wc@2:core:0.3:w3i-core:keychain'

const getKey = async (topic) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME)

    request.onerror = (_event) => {
      reject(`Failed to open ${DB_NAME}`)
    }

    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([OBJECT_STORE_NAME], 'readonly')
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
      const getRequest = objectStore.get(OBJECT_KEY)

      getRequest.onerror = (_event) => {
        reject(`Failed to retrieve ${OBJECT_KEY}`)
      }

      getRequest.onsuccess = (_event) => {
        try {
          resolve(JSON.parse(getRequest.result)[topic])
        } catch (error) {
          reject(error)
        }
      }
    }
  })
}

const displayNotification = async (payload) => {
  let notificationTitle
  let notificationOptions

  try {
    const symKey = await getKey(payload.data.topic)

    const responseData = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encoded: payload.data.blob,
        symKey: symKey,
      }),
    }).then(async (response) => {
      const data = await response.json()
      return data
    })

    notificationTitle = responseData.data.title
    notificationOptions = {
      body: responseData.data.body,
      icon: responseData.data.icon || '',
    }
  } catch (_error) {
    notificationTitle = 'Notification'
    notificationOptions = {
      body: 'You have a new notification.',
      icon: 'https://astaria.xyz/assets/images/apple-touch-icon.png',
    }
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
}

messaging.onMessage(displayNotification)
messaging.onBackgroundMessage(displayNotification)
