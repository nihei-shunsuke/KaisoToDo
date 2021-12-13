const addToDo = () => {
    var db = firebase.firestore();
    const todo = document.getElementById('todo').value;
    const getSubject = document.getElementById('kamoku');
    const subjectIndex = getSubject.selectedIndex;
    const subject = getSubject[subjectIndex].text;
    const ref = db.collection('todo').doc();
    const id = ref.id;
    const date = parseInt(document.getElementById('date').value.replace(/-/g, ''));
         db.collection("todo").add({
        subject: subject,
        date: date,
        todo: todo,
        docid: id,
    })
    .then((doc) => {
        console.log(`追加に成功しました (${doc.id})`);
    })
    .catch((error) => {
        console.log(`追加に失敗しました (${error})`);
    });

    db.collection("todo").get().then((query) => {
        var buff = [];
        query.forEach((doc) => {
        var data = doc.data();
        buff.push([data.date, data.subject, data.todo, data.docid]);
        });
        console.log(buff);
        var todoList = document.getElementById('todoList');
        while(todoList.firstChild){
            todoList.removeChild(todoList.firstChild);
          }
        makeList(buff);
    })
    .catch((error)=>{   
        console.log(`データの取得に失敗しました (${error})`);
    });
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClrcWOdj0dY_354wAPoPAYEKzir9rAKTk",
    authDomain: "kaiso-73df5.firebaseapp.com",
    projectId: "kaiso-73df5",
    storageBucket: "kaiso-73df5.appspot.com",
    messagingSenderId: "969941095477",
    appId: "1:969941095477:web:cfd2b1b10e14d881b78d7c",
    measurementId: "G-C7K65SSJCD"
};

firebase.initializeApp(firebaseConfig);

const todoBySubject = () =>{ 
    var db = firebase.firestore(); 
    db.collection("todo").orderBy('subject').get().then((query) => {
        var buff = [];
        query.forEach((doc) => {
        var data = doc.data();
        buff.push([data.date, data.subject, data.todo, data.docid]);
        });
        var todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        console.log(buff);
        var todoList = document.getElementById('todoList');
        while(todoList.firstChild){
            todoList.removeChild(todoList.firstChild);
        }
        makeList(buff);
    })
    .catch((error)=>{
        console.log(`データの取得に失敗しました (${error})`);
    });
}

const todoByClose = () =>{ 
    var db = firebase.firestore(); 
    db.collection("todo").orderBy('date').get().then((query) => {
        var buff = [];
        query.forEach((doc) => {
        var data = doc.data();
        buff.push([data.date, data.subject, data.todo, data.docid]);
        });
        console.log(buff);
        var todoList = document.getElementById('todoList');
        while(todoList.firstChild){
            todoList.removeChild(todoList.firstChild);
        }
        makeList(buff);
    })
    .catch((error)=>{
        console.log(`データの取得に失敗しました (${error})`);
    });
}

const todoByDistance = () =>{ 
    var db = firebase.firestore(); 
    db.collection("todo").orderBy('date', 'desc').get().then((query) => {
        var buff = [];
        query.forEach((doc) => {
            var data = doc.data();
            buff.push([data.date, data.subject, data.todo, data.docid]);
        });
        console.log(buff);
        var todoList = document.getElementById('todoList');
        while(todoList.firstChild){
            todoList.removeChild(todoList.firstChild);
        }
        makeList(buff);
    })
    .catch((error)=>{
        console.log(`データの取得に失敗しました (${error})`);
    });
}

const makeList = (buff) => {
    const mapBuff = buff.map(value => {
        const date = String(value[0]);
        const year = date.substr(0, 4);
        const manth = date.substr(4, 2);
        const day = date.substr(6, 2);
        console.log(`期限:${year}年${manth}月${day}日  科目:${value[1]}  課題:${value[2]}  id:${value[3]}`);
        todoList.insertAdjacentHTML('beforeend', `<li>期限:${year}年${manth}月${day}日  科目:${value[1]}  課題:${value[2]}<button onclick='deleteToDo(${value[3]})'>aaa`);
    })
}

const deleteToDo = (docid) => {
    var db = firebase.firestore(); 
    db.collection("todo").doc(docid).delete().then(() => {
        console.log("削除しました");
        db.collection("todo").get().then((query) => {
            var buff = [];
            query.forEach((doc) => {
                var data = doc.data();
                buff.push([data.date, data.subject, data.todo, data.docid]);
            });
            console.log(buff);
            var todoList = document.getElementById('todoList');
            while(todoList.firstChild){
                todoList.removeChild(todoList.firstChild);
            }
            makeList(buff);
        })
        .catch((error)=>{   
            console.log(`データの取得に失敗しました (${error})`);
        });
    })
    .catch((error) => {
        console.log(`削除に失敗しました (${error})`);
    });
}
window.onload = todoByClose();