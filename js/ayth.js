const email = document.querySelector('.email')
const password = document.querySelector('.password')
const submit = document.querySelector('.submit')


submit.addEventListener('click' , e =>{
    e.preventDefault();

    if(email.value == '' && password.value == ''){
        alert('Fill the area!')
    }

    if(email.value === 'admin' && password.value === 'admin'){
        localStorage.setItem('isAuth' , 'true')
        window.open('index.html' , '_self')
    }else{
        localStorage.setItem('isAuth' , 'false')
        email.value = ''
        password.value = ''
    }
})



window.addEventListener('load' , () =>{
    if(localStorage.getItem('isAuth') === 'true'){
        window.open('index.html' , '_self')
    }else{
        return
    }
})