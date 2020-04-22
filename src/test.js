const f = () => console.log('es6')

class Ball {
  constructor () {
    this.name = 'football'
  }
}
const football = new Ball()
const f1 = () => console.log(football.name)

const f2 = async function () {
  const s1 = await (4 + 6)
  const s2 = await (14 + 6)
  console.log(s1.toString())
  console.log(s2.toString())
}

const f3 = function () {
  const arr = [1, 2, 3, 4]
  const i = arr.includes(1)
  console.log(i.toString())
}

const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
  return promise
}

const f4 = function () {
  getJSON('/getHomeResources').then(function (json) {
    console.log('Contents: ' + json.data.weekendList[0].title)
  }, function (error) {
    console.error('出错了', error)
  })
}

const f5 = function () {
  console.log('当前环境为：' + process.env.NODE_ENV)
}

export default {
  f,
  f1,
  f2,
  f3,
  f4,
  f5
}
