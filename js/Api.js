const addToDo = () => {
  const db = firebase.firestore();
  const todo = document.getElementById("todo").value;
  const getSubject = document.getElementById("kamoku");
  const subjectIndex = getSubject.selectedIndex;
  const subject = getSubject[subjectIndex].text;
  const docid = db.collection('todo').doc().id
  console.log('docment id', docid)
  const date = parseInt(
    document.getElementById("date").value.replace(/-/g, "")
  );
  db.collection("todo").doc(docid)
    .set({
      subject: subject,
      date: date,
      todo: todo,
      docid: docid,
    })
    .then((doc) => {
      console.log(`追加に成功しました (${doc.id})`);
    })
    .catch((error) => {
      console.log(`追加に失敗しました (${error})`);
    });

  db.collection("todo")
    .get()
    .then((query) => {
      const buff = [];
      query.forEach((doc) => {
        const data = doc.data();
        buff.push([data.date, data.subject, data.todo, data.docid]);
      });
      console.log("AddToDo" + buff);
      const todoList = document.getElementById("todoList");
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
      makeList(buff);
    })
    .catch((error) => {
      console.log(`データの取得に失敗しました (${error})`);
    });
};

const firebaseConfig = {
  apiKey: "AIzaSyClrcWOdj0dY_354wAPoPAYEKzir9rAKTk",
  authDomain: "kaiso-73df5.firebaseapp.com",
  projectId: "kaiso-73df5",
  storageBucket: "kaiso-73df5.appspot.com",
  messagingSenderId: "969941095477",
  appId: "1:969941095477:web:cfd2b1b10e14d881b78d7c",
  measurementId: "G-C7K65SSJCD",
};

firebase.initializeApp(firebaseConfig)

const todoByClose = () => {
  const db = firebase.firestore();
  db.collection("todo")
    .orderBy("date")
    .get()
    .then((query) => {
      const buff = [];
      query.forEach((doc) => {
        const data = doc.data();
        buff.push([data.date, data.subject, data.todo, data.docid]);
      });
      console.log("ByClose" + buff);
      const tl = document.getElementById("todoList");
      while (tl.firstChild) {
        tl.removeChild(tl.firstChild);
      }
      makeList(buff);
    })
    .catch((error) => {
      console.log(`todoByCloseのデータの取得に失敗しました (${error})`);
    });
};

const deleteToDo = (docid) => {
  console.log('id', docid)
  const db = firebase.firestore();
  db.collection("todo")
    .doc(docid)
    .delete()
    .then(() => {
      console.log("削除しました");
      db.collection("todo")
        .get()
        .then((query) => {
          const buff = [];
          query.forEach((doc) => {
            const data = doc.data();
            buff.push([data.date, data.subject, data.todo, data.docid]);
          });
          console.log("deleteToDo" + buff);
          const todoList = document.getElementById("todoList");
          while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
          }
          makeList(buff);
        })
        .catch((error) => {
          console.log(`データの取得に失敗しました (${error})`);
        });
    })
    .catch((error) => {
      console.log(`削除に失敗しました (${error})`);
    });
};

const makeList = (buff) => {
  const todoList = document.getElementById("todoList");

  buff.map((value) => {
    const date = String(value[0]);
    const year = date.substr(0, 4);
    const manth = date.substr(4, 2);
    const day = date.substr(6, 2);
    console.log(
      `makalist##期限:${year}年${manth}月${day}日  科目:${value[1]}  課題:${value[2]}  id:${value[3]}`
    );

    todoList.insertAdjacentHTML(
      "beforeend",
      `<li>期限:${year}年${manth}月${day}日  科目:${value[1]}  課題:${
        value[2]
      }<button id=${value[3]}>削除</button></li>`
    );

    const deleteButton = document.getElementById(value[3])
    deleteButton.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()
        deleteToDo(value[3])
    }, false)
  });

};

window.onload = todoByClose();
