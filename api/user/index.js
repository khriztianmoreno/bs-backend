/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const Router = require('express').Router

const controller = require('./user.controller')
const { validateParamId } = require('../../middlewares')

const router = new Router()

router.get('/', controller.index)
router.delete('/:id', validateParamId, controller.destroy)
router.get('/:id', validateParamId, controller.show)
router.post('/', controller.create)
router.put('/:id', validateParamId, controller.update)

module.exports = router
