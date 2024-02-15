let tbody = document.querySelector('tbody')
let btn = document.querySelector('button')
let form = document.forms.form
let names = document.querySelector('#name')
let ages = document.querySelector('#age')
let dialog = document.querySelector('[data-modal]')
let modul = document.forms.change
let close = document.querySelector('#first')
let ids

let info = []

close.onclick = () => {
    dialog.close()
}

modul.onsubmit = (e) => {
    e.preventDefault()
    let data_name = new FormData(modul).get('change_name')
    let data_age = new FormData(modul).get('change_age')

    if(data_name.trim() !== '' && data_age.trim() !== ''){
    
        let finded = info.find(el => el.id === ids)
    
        finded.name = data_name
        finded.age = new Date().getFullYear() - data_age
    
        reload(info, tbody)
    }
}

///^[a-zA-Z ]+$/

btn.onclick = () => {
    
    if (names.value.trim() !== '' && ages.value.trim() !== '') {
        let value_time = {
            name: names.value.trim(),
            age: new Date().getFullYear() - ages.value.trim()
        }

        console.log(value_time);
        info.push(value_time)
        reload(info, tbody)
        names.value = ''
        ages.value = ''
    }else{
        alert('Вы должны заполнить все ячейки!')
    }
}


function reload(arr, place) {
    place.innerHTML =''

    for(let item of arr){
        let tr = document.createElement('tr')
        let no = document.createElement('td')
        let name = document.createElement('td')
        let age = document.createElement('td')
        let act = document.createElement('td')
        let inn = document.createElement('div')
        let btn_1 = document.createElement('button')
        let img_1 = document.createElement('img')
        let btn_2 = document.createElement('button')
        let img_2 = document.createElement('img')

        inn.classList.add('item')
        img_1.src = "./img/9043857_change_catalog_icon.png"
        img_2.src = "./img/8680041_delete_bin_line_icon.png"

        no.innerHTML = arr.indexOf(item) + 1
        name.innerHTML = item.name
        age.innerHTML = item.age

        place.append(tr)
        tr.append(no, name, age, act)
        act.append(inn)
        inn.append(btn_1, btn_2)
        btn_1.append(img_1)
        btn_2.append(img_2)

        btn_1.onclick = () => {
            dialog.showModal()
            ids = item.id
        }

        btn_2.onclick = () => {
            arr.splice(arr.indexOf(item), 1)

            tr.classList.add('animation')

            setTimeout(() => {
                tr.remove()
            }, 300)
        }
    }
}