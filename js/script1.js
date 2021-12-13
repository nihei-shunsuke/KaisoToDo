// 要素を取得する
const addBtn = document.getElementById('add')

// 作成ボタンのクリックイベントの登録
addBtn.addEventListener('click', () => addNewNote())
function addNewNote(text = '') {
    // div要素を作成
    const note = document.createElement('div')
    // noteクラスを追加
    note.classList.add('note')
    // メモ帳を追加
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
    // 操作に必要な要素を取得
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

     // 削除のクリックイベントの登録
    deleteBtn.addEventListener('click', () => {
        deleteNote(note)
    })
    // bodyの子要素として追加
    document.body.appendChild(note)
}

// メモ帳削除
function deleteNote(note) {
    // ノートを削除
    note.remove()
   
    // ローカルストレージの更新
    updateLS()
}
   
function updateLS() {
    // 後で実装

    // bodyの子要素として追加
    document.body.appendChild(note)
}