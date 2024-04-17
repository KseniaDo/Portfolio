
let container = document.querySelector('.container')
/*Прослушиватели для ввода*/
let inps
checkInps(inps)

/*Регулярные выражения--------------------------------------------------*/

let patts = [
    "^[A-Za-zА-Яа-я]+\\s[A-Za-zА-Яа-я]+(\\s[A-Za-zА-Яа-я]+)?$",
    "^(\\+7|8)(\\([0-9]{3}\\)|[0-9]{3})[0-9]{3}(-)?[0-9]{2}(-)?[0-9]{2}$",
    "^[A-Za-z0-9_-]+?[\\@][A-Za-z]+?\\.(com|ru)$",
    "^[А-Яа-яA-Za-z0-9\\n_\\.\\?\\!-\\s]{1,400}$",
    "^[1|2][0-9]{3}-[1|2][0-9]{3}$"
]

let types = ["Name", "Phone", "Email", "InputLong", "Years"]

types.forEach(type =>{
    checkInput (type)
})

function checkInput (type){
    let patt
    let select
    switch (type){
        case "Name":
            patt = patts[0]
            select = ".mainname, .refname"
            break
        case "Phone":
            patt = patts[1]
            select = ".refphone, .perphone, .perhome"
            break
        case "Email":
            patt = patts[2]
            select = ".refemail, .peremail"
            break
        case "InputLong":
            patt = patts[3]
            select = "textarea"
            break
        case "Years":
            patt = patts[4]
            select = ".jobyear, .eduyear"
            break
    }
    let myReg = new RegExp(patt)

    let elements = document.querySelectorAll(select)

    elements.forEach(elem =>{
        elem.addEventListener('input', function (){
            if (myReg.test(elem.value)){
                elem.classList.add('styletrue')
                elem.classList.remove('stylefalse')
            } else {
                elem.classList.remove('styletrue')
                elem.classList.add('stylefalse')
            }
        })
    })
}
/*----------------------------------------------------------------------*/

/*Локальные сессии------------------------------------------------------*/
let bref = document.querySelector('#bref')
let bsave = document.querySelector('#bsave')
let bload = document.querySelector('#bload')

bref.addEventListener('click', function () {
    if (localStorage.getItem("default")) {
        container.innerHTML = localStorage.getItem("default")
    }
    checkInps(inps)
    types.forEach(type =>{
        checkInput (type)
    })
    percents = document.querySelectorAll(".percent")
    progs = document.querySelectorAll(".prog")
    setProg(percents, progs)
})

bsave.addEventListener('click', function () {
    checkInps(inps)
    let name = window.prompt("Введите ваше имя:")
    localStorage.setItem(name, container.innerHTML)
})

bload.addEventListener('click', function () {
    checkInps(inps)
    let name = window.prompt("Введите ваше имя:")
    if (localStorage.getItem(name)) {
        container.innerHTML = localStorage.getItem(name)
    }
    checkInps(inps)
    types.forEach(type =>{
        checkInput (type)
    })
    percents = document.querySelectorAll(".percent")
    progs = document.querySelectorAll(".prog")
    setProg(percents, progs)
})

function checkInps(inps) {
    inps = document.querySelectorAll("input, textarea")
    inps.forEach(inp => {
        inp.addEventListener('input', function () {
            if (inp["localName"] === "input") {
                inp.setAttribute("value", inp.value)
            } else {
                inp.innerHTML = inp.value
            }
            localStorage.setItem("default", container.innerHTML)
        })
    })
    return inps
}

function remUpdate(){
    localStorage.setItem("default", container.innerHTML)
}
/*------------------------------------------------------------------*/

/*Скиллбары---------------------------------------------------------*/

let percents = document.querySelectorAll(".percent")
let progs = document.querySelectorAll(".prog")
setProg(percents, progs)
setEvList(percents, progs)

function setProg(percents, progs){
    percents.forEach(function (percent){
        let ix = Array.prototype.indexOf.call(percents, percent)
        if (parseInt(percent.value) > 100) {
            progs[ix].style.width = "100%"
            percent.setAttribute("value", "100")
        } else if (parseInt(percent.value) < 0) {
            progs[ix].style.width = "0%"
            percent.setAttribute("value", "0")
        } else {
            progs[ix].style.width = percent.value + "%"
            percent.setAttribute("value", percent.value)
        }
    })
}

function setEvList(percents, progs) {
    percents.forEach(function (percent) {
        progs = document.querySelectorAll(".prog")
        percent.addEventListener("blur", function () {
            percent.setAttribute('value', percent.value)
            setProg(percents, progs)
        })
    })
}

/*----------------------------------------------------------------------*/

/*Добавление элементов---------------------------------------------------*/
function createNewJob() {
    let experience = document.querySelector('#experience')

    let element = document.createElement('div')
    element.setAttribute('class', 'job')
    experience.appendChild(element)

    for (let k of[
        ['div', 'jobcont'],
        ['img', 'icon', 'icon.png', 'Delete', 'this.parentElement.remove(); checkInps(inps)'],
    ]) {
        let elem = document.createElement(k[0])
        elem.setAttribute('class', k[1])
        if (k[0]==="img"){
            elem.setAttribute('src', k[2])
            elem.setAttribute('alt', k[3])
            elem.setAttribute('onclick', k[4])
        }
        else {
            for (let j of[
                ['div', 'nameyear'],
                ['input', 'jobprof', 'text', 'Senior Web Developer'],
                ['textarea', 'jobdescr', '5', 'Some text'],
            ]){
                let innerelem = document.createElement(j[0])
                innerelem.setAttribute('class', j[1])
                if (j[0]!=="div"){
                    innerelem.setAttribute('placeholder', j[3])
                    if (j[0]==="input"){
                        innerelem.setAttribute('type', j[2])
                    }
                    else {
                        innerelem.setAttribute('rows', j[2])
                    }
                } else {
                    for (let y of [
                        ['input', 'jobname', 'text', 'Creative Land'],
                        ['p', 'slash'],
                        ['input', 'jobyear', 'text', '2015-2018'],
                    ]){
                        let innerelem2 = document.createElement(y[0])
                        innerelem2.setAttribute('class', y[1])
                        if (y[0]!=="p"){
                            innerelem2.setAttribute('type', y[2])
                            innerelem2.setAttribute('placeholder', y[3])
                        } else {
                            innerelem2.innerHTML = "/"
                        }
                        innerelem.appendChild(innerelem2)
                    }
                }
                elem.appendChild(innerelem)
            }
        }
        element.appendChild(elem)
    }
    checkInps(inps)
}

function createNewEdu() {
    let education = document.querySelector('#education')
    let element = document.createElement('div')
    element.setAttribute('class', "edu")
    education.appendChild(element)

    for (let k of [
        ['div', 'educont'],
        ['img','icon', 'icon.png', 'Delete', 'this.parentElement.remove(); checkInps(inps)'],
    ]){
        let elem = document.createElement(k[0])
        elem.setAttribute('class',k[1])
        if (k[0]!=="div"){
            elem.setAttribute('src', k[2])
            elem.setAttribute('alt', k[3])
            elem.setAttribute('onclick', k[4])
        } else {
            for (let j of [
                ['div', 'nameyear'],
                ['input','eduuniv', 'text', 'Imperial University'],
                ['textarea','edudescr', '5', 'Some text'],
            ]){
                let innerelem = document.createElement(j[0])
                innerelem.setAttribute('class', j[1])
                if (j[0]!=="div"){
                    innerelem.setAttribute('placeholder', j[3])
                    if (j[0]==="input"){
                        innerelem.setAttribute('type',j[2])
                    }
                    else {
                        innerelem.setAttribute('rows', j[2])
                    }
                } else {
                    for (let y of [
                        ['input', 'eduname', 'text', 'Bachelors of arts'],
                        ['p', 'slash'],
                        ['input', 'edyyear', 'text', '2007-2009'],
                    ]){
                        let innerelem2 = document.createElement(y[0])
                        innerelem2.setAttribute('class', y[1])
                        if (y[0]!=="p"){
                            innerelem2.setAttribute('type', y[2])
                            innerelem2.setAttribute('placeholder', y[3])
                        } else {
                            innerelem2.innerHTML = "/"
                        }
                        innerelem.appendChild(innerelem2)
                    }
                }
                elem.appendChild(innerelem)
            }
        }
        element.appendChild(elem)
    }
    checkInps(inps)
}

function createNewSkill(num) {
    let skill = document.querySelector('#perskills')
    let element = document.createElement('div')
    element.setAttribute('class', 'skillitem')
    skill.appendChild(element)

    for (let k of [
        ['img', 'iconskill', 'icon.png', 'Delete', 'this.parentElement.remove(); checkInps(inps)'],
        ['input', 'skill', 'text', 'Wordpress'],
        ['div', 'skillbar'],
    ]){
        let elem = document.createElement(k[0])
        elem.setAttribute('class', k[1])
        if (k[0]!=="div"){
            if (k[0]==="img"){
                elem.setAttribute('src', k[2])
                elem.setAttribute('alt', k[3])
                elem.setAttribute('onclick', k[4])
            } else {
                elem.setAttribute('type', k[2])
                elem.setAttribute('placeholder', k[3])
            }
        } else {
            for (let l of [
                ['div', 'someclass'],
                ['div', 'max'],
            ]){
                let innerelem = document.createElement(l[0])
                innerelem.setAttribute('class', l[1])
                if (l[1]==="someclass"){
                    for (let j of [
                        ['input', 'percent', 'number','80', '100', '0', ''],
                        ['p', 'perc'],
                    ]){
                        let innerelem2 = document.createElement(j[0])
                        innerelem2.setAttribute('class', j[1])
                        if (j[0]!=="p"){
                            innerelem2.setAttribute('type', j[2])
                            innerelem2.setAttribute('placeholder', j[3])
                            innerelem2.setAttribute('max', j[4])
                            innerelem2.setAttribute('min', j[5])
                            innerelem2.setAttribute('value', j[6])
                        } else {
                            innerelem2.innerHTML = "%"
                        }
                        innerelem.appendChild(innerelem2)
                    }
                } else {
                    let innerelem2 = document.createElement('div')
                    innerelem2.setAttribute('class', 'prog')
                    innerelem.appendChild(innerelem2)
                }
                elem.appendChild(innerelem)
            }
        }
        element.appendChild(elem)
    }
    percents = document.querySelectorAll(".percent")
    progs = document.querySelectorAll(".prog")
    setEvList(percents, progs)
    checkInps(inps)
}
/*----------------------------------------------------------------------*/