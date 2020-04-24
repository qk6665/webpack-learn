import func from './test.js'
import img from './imgLoader'
import promise from 'es6-promise'
promise.polyfill()// 解决ie无法加载promise。如果需要使用更多es6api，使用babel/polyfill

require('../assert/css/sty.css')
require('../assert/css/sty2.sass')

console.log('hello world!')

// 测试js方式加载图片正确性
img.img()

// 对test中的7个测试函数进行测试
func.f1()
func.f2().then(r => console.log('异步加载成功：' + r.s1 + '  ' + r.s2))
func.f3()
func.f4()
func.f5()
func.f6()
func.f7()
