const User = require('./user.model')

let user = {}
const genUser = function () {
  user = new User({ name: 'Fake User' })

  return user
}

describe('User Model', function () {
  before(function () {
    // Clear users before testing
    return User.remove()
  })

  beforeEach(function () {
    genUser()
  })

  afterEach(function () {
    return User.remove()
  })

  it('should begin with no users', function () {
    return expect(User.find({}).exec()).to.eventually.have.length(0)
  })

  it('should fail when saving a duplicate user', function () {
    return expect(
      user.save().then(function () {
        const userDup = genUser()
        return userDup.save()
      })
    ).to.be.rejected
  })

  describe('#name', function () {
    it('should fail when saving with a blank name', function () {
      user.name = ''
      return expect(user.save()).to.be.rejected
    })

    it('should fail when saving with a null name', function () {
      user.name = null
      return expect(user.save()).to.be.rejected
    })

    it('should fail when saving without an name', function () {
      user.name = undefined
      return expect(user.save()).to.be.rejected
    })
  })
})
