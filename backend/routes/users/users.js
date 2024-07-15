const express = require("express")

const router = express()

const userCtrls = require("../../controllers/users/users")

const protect = require("../../middlewares/authUser")

router.get('/me', protect, userCtrls.getMe)
router.put('/update-avatar', userCtrls.updateAvatar)
router.get('/search-houses', userCtrls.searchHouses)
router.post('/book-house', userCtrls.bookHouse)
router.get('/notifications', userCtrls.notifications)
router.get('/finance', userCtrls.finance)
router.get('/my-tickets', userCtrls.myTickets)
router.post('/create-ticket', userCtrls.createTicket)
router.post('/add-favourite', userCtrls.addFavourite)
router.get('/my-favourites', userCtrls.myFavourites)
router.get('/my-bookings', userCtrls.myBookings)

router.get('/houses', userCtrls.getHouses)
router.get('/houses/:houseId', userCtrls.getHouse)

module.exports = router