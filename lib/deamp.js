
// de-amp url
let getOg = (b) => b.match('<link(?: rel="canonical"| href=")+(.*?)"')[1]
let isAmp = (b) => RegExp("<html (amp|⚡)",'i').test(b)

module.exports.deAmp = async (u) => {
  let nu = await fetch(u).then((res) => res.url)
  let b = await fetch(nu).then((r) => r.text())
  return (isAmp(b) ? getOg(b) : nu)
}
