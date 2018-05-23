import {getNowString} from '../app/GetString'

describe('Get string', () => {
  it('test get string', () => {
    getNowString().should.be.eql("2018/0523 14:27:10.567");
  })
})
