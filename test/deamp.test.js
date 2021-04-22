const assert = require('assert')
const rinse = require('../lib/deamp.js')

const vergeAmp = {
  platform: "https://www.theverge.com/platform/amp/2019/4/16/18311894/logitech-express-alexa-remote-control-announced-features-pricing",
  google: "https://www.google.com/amp/s/www.theverge.com/platform/amp/2019/4/16/18311894/logitech-express-alexa-remote-control-announced-features-pricing",
  clean: "https://www.theverge.com/2019/4/16/18311894/logitech-express-alexa-remote-control-announced-features-pricing"
}

describe('theverge.com deamp', () => {
  it('clean /platform/amp', async () => {
    const res = await rinse.deAmp(vergeAmp.platform)
    assert.equal(res, vergeAmp.clean)
  })
  it('clean google AMP', async () => {
    const res = await rinse.deAmp(vergeAmp.google)
    assert.equal(res, vergeAmp.clean)
  })
  it('leave non-AMP link', async () => {
    const res = await rinse.deAmp(vergeAmp.clean)
    assert.equal(res, vergeAmp.clean)
  })
})

const huffPostAmp = {
  google: "https://www.google.com/amp/s/m.huffpost.com/us/entry/171234/amp",
  slash: "https://m.huffpost.com/us/entry/us_171234/amp",
  mobile: "https://m.huffpost.com/us/entry/us_171234",
  clean: "https://www.huffpost.com/entry/cia-realizes-its-been-usi_n_171234"
}

describe('huffpost.com deamp', () => {
  it('clean /amp', async () => {
    const res = await rinse.deAmp(huffPostAmp.slash)
    assert.equal(res, huffPostAmp.clean)
  })
  it('clean google AMP', async () => {
    const res = await rinse.deAmp(huffPostAmp.google)
    assert.equal(res, huffPostAmp.clean)
  })
  it('redirect mobile link', async () => {
    const res = await rinse.deAmp(huffPostAmp.mobile)
    assert.equal(res, huffPostAmp.clean)
  })
  it('leave non-AMP link', async () => {
    const res = await rinse.deAmp(huffPostAmp.clean)
    assert.equal(res, huffPostAmp.clean)
  })
})