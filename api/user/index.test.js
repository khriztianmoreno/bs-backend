const proxyquire = require('proxyquire').noPreserveCache()
const sinon = require('sinon')

const userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  show: 'userCtrl.show',
  create: 'userCtrl.create',
}

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy(),
}

// require the index with our stubbed out modules
const userIndex = proxyquire('./index', {
  express: {
    Router: () => {
      return routerStub
    },
  },
  './user.controller': userCtrlStub,
})

describe('User API Router:', function () {
  it('should return an express router instance', function () {
    expect(userIndex).to.equal(routerStub)
  })

  describe('GET /api/users', function () {
    it('should route to user.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'userCtrl.index')).to.have.been
        .calledOnce
    })
  })

  describe('DELETE /api/users/:id', function () {
    it('should route to user.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'userCtrl.destroy')).to.have
        .been.calledOnce
    })
  })

  describe('GET /api/users/:id', function () {
    it('should route to user.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'userCtrl.show')).to.have.been
        .calledOnce
    })
  })

  describe('POST /api/users', function () {
    it('should route to user.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'userCtrl.create')).to.have.been
        .calledOnce
    })
  })
})
