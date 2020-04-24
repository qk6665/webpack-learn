import img from '../assert/img/banner.jpg'

const banner = new Image()
banner.src = img
const output = () => document.body.appendChild(banner)
console.log('13311')
export default {
  img: output
}
