import func from './test.js'
import img from './imgLoader'
import promise from 'es6-promise'
promise.polyfill()// 解决ie无法加载promise。如果需要使用更多es6api，使用babel/polyfill

require('../assert/sty.css')
require('../assert/sty2.less')

img.img()

console.log('hello world')
func.f()
func.f1()
func.f2().then(r => console.log('async success'))
// func.f3()
func.f4()
func.f5()
