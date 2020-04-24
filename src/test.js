// 测试es6关于类的语法转译正确性
class Ball {
  constructor () {
    this.name = 'football'
  }
}
const football = new Ball()
const f1 = () => console.log(football.name)

// 测试Promise语法转译正确性
const f2 = async function () {
  const s1 = await (4 + 6)
  const s2 = await (14 + 6)
  console.log(s1.toString())
  console.log(s2.toString())
  return { s1, s2 }
}

// 测试Array.includes是否可以正确转移(IE11报错，因为webpack未加载相应转译类库)
const f3 = function () {
  const arr = [1, 2, 3, 4]
  const i = arr.includes(1)
  console.log(i.toString())
}

// 测试dev的proxy配置正确性
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

// 测试环境变量设置正确性
const f5 = function () {
  console.log('当前环境为：' + process.env.NODE_ENV)
}

// 测试热更新是否刷新页面
const f6 = function () {
  const btn = document.createElement('button')
  btn.innerText = 'true'
  btn.onclick = change
  document.body.appendChild(btn)
  function change () {
    const btn = document.getElementsByTagName('button')[0]
    if (btn.innerText === 'true') {
      btn.innerText = 'false'
    } else {
      btn.innerText = 'true'
    }
  }
}

// 测试懒加载配置是否正确
const f7 = function () {
  const btn = document.createElement('button')
  btn.innerText = '懒加载'
  btn.addEventListener('click', e => {
    import('./test2.js').then((data) => {
      data.default.ff()
    })
  })
  document.body.appendChild(btn)
}

export default {
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7
}
