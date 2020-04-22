import img from '../assert/img/banner.jpg'

const banner = new Image()
banner.src = img
const output = () => document.body.appendChild(banner)

export default {
  img: output
}
