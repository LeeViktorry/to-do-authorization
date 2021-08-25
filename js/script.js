const show = document.querySelector('.show')
const side = document.querySelector('.sidebar')

show.addEventListener('click' , e =>{
    e.preventDefault()

    side.classList.toggle('active')

    show.classList.toggle('rotateBurger')
})


const card_wrapper = document.querySelector('.card_wrapper')

const names = document.querySelector('.names')
const image = document.querySelector('.image')
const submit = document.querySelector('.submit')
const age = document.querySelector('.age')
const country = document.querySelector('.country')
const status = document.querySelector('.status')
const signout = document.querySelector('.signout')

window.addEventListener('load', () =>{
    if (!localStorage.getItem('workers')){
        localStorage.setItem('workers' , JSON.stringify([]))
    }else{
        const base = JSON.parse(localStorage.getItem('workers'));
        console.log(base);
        const newBasewithid = base.map((item, index) => {
            return{
                ...item, id:index
            }
        })
        console.log(newBasewithid);
        localStorage.setItem('workers', JSON.stringify([...newBasewithid]))
        const data = JSON.parse(localStorage.getItem('workers'))
        console.log(data);

        const temp = data.reverse().reduce((total, item) =>{
            return total += card(item)
        } , '')

        card_wrapper.innerHTML = temp
    }
})


submit.addEventListener('click', () => {
    if(names.value === '' || image.value === '' || age.value === '' || country.value === '' || status.value === ''){
        alert('Fill the inputs')
    }else{
        const base = JSON.parse(localStorage.getItem('workers'))
        localStorage.setItem('workers' , JSON.stringify([...base, {name:names.value ,image:image.value, age:age.value, country:country.value, status:status.value}]))
        window.location.reload()
        names.value = ' '
        image.value = ' '
        age.value = ' '
        country.value = ' '
        status.value = ' '
    }
})

function card({name , age ,  image , country , status , id }){
    return `
        <div class='card-person'>
            <div class="center-card">
                <img src="${image}" alt=""
                <i>${name}</i>
                <div class="info">
                    <ul>
                        <li>Age: ${age}</li>
                        <li>Status: ${status}</li>
                        <li>Country: ${country}</li>
                    </ul>
                </div>
                <div class="tools">
                <i class="fas fa-user-edit" data-id="${id}" onclick="Edit(${id})"></i>
                    <i class="fas fa-trash" data-id="${id}" onclick="Delete(${id})"></i>
                    <i class="fas fa-caret-square-down" onclick="Info()"></i>
                </div>
            </div>
            
        </div>

    `
}

function Info(){
    const infoBlock = document.querySelector('.info')
    infoBlock.classList.toggle('activeInfo')
}

function Delete(id){
    const askDelete = confirm('Are u sure ?')
    if(!askDelete) return
    const base = JSON.parse(localStorage.getItem('workers'))
    const deleteBase = base.filter(item => item.id !== id)
    localStorage.setItem('workers' , JSON.stringify(deleteBase))
    window.location.reload()
}

function Edit(id){
    const base = JSON.parse(localStorage.getItem('workers'))
    const changedBase = base.map(item => {
        if(item.id === id){
            return{
                ...item,
                name: prompt('New Name' , item.name),
                age: prompt('New Age' , item.age),
                image: prompt('New Image' , item.image),
                country: prompt('New Country' , item.country),
                status: prompt('New Status' , item.status)
            }
        }else{
            return item
        }
    })
    localStorage.setItem('workers' , JSON.stringify(changedBase))
    window.location.reload()
}


window.addEventListener('load' , () =>{
    localStorage.setItem('isAuth' , 'false')
})


signout.addEventListener('click' , e =>{
    e.preventDefault();

    if(localStorage.getItem('isAuth') === 'false'){
        window.open('auth.html' , '_self')
    }

})
