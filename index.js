const { time } = require('console')
const { json } = require('express')
//const axios = require('axios')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(express.json({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    const { name } = req.query
    let data = readFile()
    let arr = JSON.parse(data)
    if (name && name != "") {
        const newArr = arr.filter(({ name: nameRequest }) => nameRequest.includes(name.toLowerCase()))
        return res.json(recoveryTime(newArr))
    }
    else {
        return res.json(recoveryTime(arr))
    }

})

app.post('/', (req, res) => {
    const { name, author, time, img } = req.body
    data = readFile()
    let arr = JSON.parse(data)
    if (name, author, time) {
        if (img == "") {
            let img = "imgs/black-white.png"
            arr.push({ name, author, time, img })
            convertTime(arr)
            return res.json('Successfully wrote file')
        }
        else {
            arr.push({ name, author, time, img })
            convertTime(arr)
            return res.json('Successfully wrote file')
        }
    }
    else {
        return res.json("Campos Obrigatorios!")
    }
})
app.delete('/', (req, res) => {
    const { name } = req.query
    let data = readFile()
    let jsondata = JSON.parse(data)
    let mscindex;
    if (name && name != "") {
        for (let index = 0; index < jsondata.length; index++) {
            console.log(index)
            if (jsondata[index]["name"] == name) {
                console.log('igual')
                mscindex = index
            } else {
                console.log('diferente')
            }
        }
        jsondata.splice(mscindex, 1)
        writeFile(jsondata)
    }
})

app.listen(25565, () => {
    console.log("Hosting in localhost:25565")
})

function readFile() {
    let data = fs.readFileSync('data.json', 'utf8')
    return data
}
function writeFile(arr) {
    const stringarr = JSON.stringify(arr)
    fs.writeFileSync('data.json', stringarr)
}
function recoveryTime(arr) {
    for (let index = 0; index < arr.length; index++) {
        let milisegundos = arr[index]["time"]
        minutos = Math.floor(milisegundos / 60000)
        segundos = ((milisegundos % 60000) / 1000).toFixed(0)
        let time = minutos + ":" + (segundos < 10 ? '0' : '') + segundos
        arr[index]["time"] = time
    }
    return arr
}
function convertTime(arr) {
    let index = arr.length - 1
    let time = arr[index]["time"]
    let minSec = time.split(":")
    let min = minSec[0]
    let sec = Number((min * 60) + Number(minSec[1]))
    let milliseconds = sec * 1000
    arr[index]["time"] = milliseconds
    writeFile(arr)
}