import query from '../../app/actions/budget'
import * as Budgets from '../../app/actions/budgets'

describe('budget', () => {
  let fetchStub = sinon.stub(Budgets, 'fetch')
  function givenBudgets(budgets){
    fetchStub.yields(budgets)
  }
  it('no budget', () => {
    givenBudgets([])
    query('2018-05-01', '2018-05-31', result => result.should.be.eql(0))
  })
  it('query 1 month', () => {
    givenBudgets([{month: '2018-05', amount: 310}])
    query('2018-05-01', '2018-05-31', result => result.should.be.eql(310))
  })
  it('query 1 day in May', () => {
    givenBudgets([{month: '2018-05', amount: 310}])
    query('2018-05-03', '2018-05-03', result => result.should.be.eql(10))
  })
  it('query 1 day in Jun', () => {
    givenBudgets([{month: '2018-06', amount: 300}])
    query('2018-06-03', '2018-06-03', result => result.should.be.eql(10))
  })
  it('query 2 days', () => {
    givenBudgets([{month: '2018-05', amount: 310}])
    query('2018-05-03', '2018-05-04', result => result.should.be.eql(20))
  })
  it('query start before budget', () => {
    givenBudgets([{month: '2018-05', amount: 310}])
    query('2018-04-28', '2018-05-04', result => result.should.be.eql(40))
  })
  it('query end after budget', () => {
    givenBudgets([{month: '2018-05', amount: 310}])
    query('2018-05-20', '2018-06-04', result => result.should.be.eql(120))
  })
  it('query across budgets', () => {
    givenBudgets([{month: '2018-05', amount: 310}, {month: '2018-06', amount: 3000}])
    query('2018-05-20', '2018-06-04', result => result.should.be.eql(120+400))
  })
})
